//******************GET, POST & protected resources*************/
const { authJwt } = require('../middleware');
const controller = require('../controllers/reminder.controller');
let router = require('express').Router();

module.exports = app => {
    //router.post('/add-test',[authJwt.verifyToken],controller.addTest);
    router.post('/add-reminder',controller.addReminder);
    router.post('/get-reminders', controller.getAll);
    router.post('/delete-reminder', controller.deleteReminder);
    app.use('/api/reminder',router)
}