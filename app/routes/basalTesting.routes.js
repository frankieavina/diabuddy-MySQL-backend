//******************GET, POST & protected resources*************/
const { authJwt } = require('../middleware');
const controller = require('../controllers/basalTesting.controller');
let router = require('express').Router();

module.exports = app => {
    //router.get('/get',[authJwt.verifyToken], controller.getTest);
    //router.delete('/delete-test', [authJwt.verifyToken], controller.deleteTest);
    //router.post('/add-test',[authJwt.verifyToken],controller.addTest);
    router.get('/get-test', controller.getTestById);
    router.delete('/delete-test', controller.deleteTest);
    router.post('/add-test',controller.addTest);
    app.use('/api/basal',router)
}