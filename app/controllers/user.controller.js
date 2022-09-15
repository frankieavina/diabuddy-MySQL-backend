const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

///////////////////////// Create and Save a new Users ///////////////////////////////
exports.create = async (req, res) => {
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
    password: hashedPass
  };

  // save user in the database
  User.create(user)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });

};

///////////////////////// Retrieve all Users from the database. ////////////////////
exports.findAll = (req, res) => {
  
};

///////////////////////////// Find a single Users with an id ///////////////////////
exports.findOne = (req, res) => {
  
};

////////////////////////// Update a Users by the id in the request /////////////////
exports.update = (req, res) => {
  
};

////////////////////// Delete a Users with the specified id in the request ////////
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};
