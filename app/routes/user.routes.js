//*********************** GET public & protected resources *************/
// verifies auth token 
const { authJwt } = require("../middleware");
// other routes that can be accessed once user is authenticated
const controller = require("../controllers/user.controller");
let router = require("express").Router();

module.exports = app => {
    // Retrieve all users but auth is required
    router.get("/getAll",[authJwt.verifyToken], controller.findAll);
    // Delete a User with id
    router.delete("/delete", controller.delete);
    //router.get('/admin',[authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
    app.use('/api/users', router)
};