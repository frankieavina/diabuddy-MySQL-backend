//******************GET, POST & protected resources*************/
const { authJwt } = require('../middleware');
const controller = require('../controllers/bolus.controller');
let router = require('express').Router();

module.exports = app => {
    //router.post('/add-test',[authJwt.verifyToken],controller.addTest);
    router.post('/add-bolus',controller.addBolus);
    // edit and delete bolus but only admin can do that 
    app.use('/api/bolus',router)
}