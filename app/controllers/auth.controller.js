//**************handle signup & signin actions ***********/
const db = require("../models");
// sign the jwt || create jwt
const config = require('../config/auth.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = db.users;
const Role = db.role;
const Op = db.Sequelize.Op;



///////////////////////// Create and Save a new Users ///////////////////////////////
exports.signup = async (req, res) => {
    //validate request
    if(!req.body.name){
      res.status(400).send({
          message: 'Content can not be empty!'
      });
      return;
    }
  
    // create user
    const hashedPass = await bcrypt.hash(req.body.password,10);
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
      role: 1
    };
  
    // creating jwt token
    const access_token = createJWT(user.email, '1h');
  
    // save user in the database
    User.create(user)
      .then(data => {
          res.send({
            success: true,
            result: data,
            token: access_token
          });
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while creating the User."
          });
      });
  
  };
  
  ///////////////////////// Log in with existing user ///////////////////////////////
  exports.signin = async (req, res) => {
    //validate request
    if(!req.body.email){
      res.status(400).send({
          message: 'Content can not be empty!'
      });
      return;
    }
  
    try {
      // get user email and password
      const {email, password} = req.body; 
  
      //get user information
      const user = await User.findOne({ where: { email } });
      if(!user){res.json('Email Not Found!')}
  
      //compare password
      const userPassword = `${user.password}`;
      const isAuthenticated = await bcrypt.compare(req.body.password, userPassword);
  
      // if authenticated then create jwt and return user info
      if(isAuthenticated){
        // creating jwt token
        const access_token = createJWT(user.email, '1h');
        res.json({
            success: true,
            result: user,
            token: access_token
          });
      }else{
        res.json('Invalid Password or Password not found')
      }
  
    } catch (err) {
      return res.status(400).send('invalid username or password');
    }
  
  };
  