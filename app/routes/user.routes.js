//*********************** GET public & protected resources *************/
// verifies auth token 
const { authJwt } = require("../middleware");
// other routes that can be accessed once user is authenticated
const controller = require("../controllers/user.controller");
let router = require("express").Router();

module.exports = app => {
    // Retrieve all users without auth
    router.get("/all", controller.findAll);
    // Retrieve all users but auth is required
    router.get("/getAll",[authJwt.verifyToken], controller.findOne);
    // Delete a User with id
    router.delete("/:id", controller.delete);
    router.get('/admin',[authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
    app.use('/api/test', router)
};