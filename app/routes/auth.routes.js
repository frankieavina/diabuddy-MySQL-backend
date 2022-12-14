//************************POST signup & sign in **************/
// checks duplicates 
const { verifySignUp } = require('../middleware');
// login and register
const controller = require('../controllers/auth.controller');
let router = require("express").Router();

// AUTHENTICATION 
module.exports = (app) => {
    router.post("/signup",[verifySignUp.checkDupNameEmail],controller.signup);
    router.post("/signin", controller.signin);
    app.use('/api/auth', router)
}
