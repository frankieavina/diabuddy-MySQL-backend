//*************** check duplicate name or Email ***************/
const db = require('../models');
const ROLES = db.ROLES;
const User = db.users;

checkDupNameEmail = (req, res, next) => {
    // check if name is already in use 
    User.fineOne({
        where:{
            name: req.body.name
        }
    }).then(user => {
        if(user){
            res.status(400).send({ message:'Failed! Name is already in use!'});
            return;
        }
        // now check if email is already in use
        User.fineOne({
            where:{
                email: req.body.email
            }
        }).then(user => {
            if(user){
                res.status(400).send({ message:'Failed! Email is already in use!'});
                return;
            }
        next();
        });// end of second then
    });// end of first then
};

// NOTE: might not need this
// check if user already has and assigned role and if that role exist
checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
            res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.roles[i]
          });
          return;
        }
      }
    }
    next();
  };

  const verifySignUp = {
    checkDupNameEmail: checkDupNameEmail,
    checkRolesExisted: checkRolesExisted
  };
  module.exports = verifySignUp;