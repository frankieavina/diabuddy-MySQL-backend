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

////////////////////////// Admin Routes /////////////////
exports.adminGetAll = (req, res) => {
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

exports.adminGet = (req, res) => {
  const userID = req.params.id;

  return User.findByPk(userID)
    .then((data) => {
      return res.status(200).send({
        result: data,
        success: true
      })
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could retrieve single user."
      })
    });
};

exports.adminUpdate = (req, res) => {
  const {user, payload} = req.body;
  const id = user;
  const {name, email, roleId} = payload;

  return User.update(
      {
        name,
        email,
        roleId
      },
      {
        where:{id: id}
      }
    )
    .then((data) => {
      return res.status(200).send({
        result: data,
        success: true
      })
    })
    .catch((err) =>{
      return res.status(400).send('Invalid Delete Test Route request:',err)
    })

};

exports.adminDelete = (req, res) => {
  const userID = req.params.id;

  return User.destroy({where:{id: userID}})
    .then((data) =>{
      return res.status(200).send({
        result: data,
        success: true
      })
    })
    .catch((err) =>{
      return res.status(400).send('Invalid Delete Test Route request:',err);
    })
};
