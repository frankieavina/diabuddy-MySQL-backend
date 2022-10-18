//*************** return public & protected content **********/
const db = require("../models");
const User = db.users;


///////////////////////// Retrieve all Users from the database. ////////////////////
exports.findAll = (req, res) => {
  res.status(200).send("Public Content.");
};

///////////////////////////// Find a single Users with an id ///////////////////////
exports.findOne = (req, res) => {
  res.status(200).send("User Content.");
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

////////////////////////// Testing Admin Route /////////////////
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
