//*************** return public & protected content **********/
const db = require("../models");
const User = db.users;


///////////////////////// Retrieve all Users from the database. ////////////////////
exports.findAll = (req, res) => {
  
  return User.findAll()
    .then((data) => {
      return res.status(200).send({
        result: data,
        success: true
    })
  })
  .catch((err) => {
    res.status(500).send({
      message: "Could retrieve users"
    })
  });
};

///////////////////////////// Find a single Users with an id ///////////////////////
exports.findOne = (req, res) => {
  res.status(200).send("User Content.");
};

////////////////////// Delete a Users with the specified id in the request if you are admin ////////
exports.delete = (req, res) => {
  const { userId } = req.body;

  User.destroy({
    where: { id: userId }
  })
    .then((data) => {
      res.status(200).send({
        success: true,
        result: data
      });
    })
    .catch(err => {
      res.status(400).send({
        message: "Could not delete user with id=" + userId
      });
    });
};

////////////////////////// Testing Admin Route /////////////////
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
