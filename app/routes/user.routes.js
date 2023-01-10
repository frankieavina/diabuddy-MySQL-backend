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
    router.get('/admin/getAll', controller.adminGetAll)
    router.get('/admin/get/:id', controller.adminGet)
    router.get('/admin/update', controller.adminUpdate)
    router.get('/admin/delete/:id', controller.adminDelete)
    router.get('/admin/getBasal/:id', controller.adminGetBasal)
    app.use('/api/users', router)
};