const db = require('../models');
const Reminder = db.reminders;
const User = db.users;

///////////////////////// create reminder //////////////
exports.addReminder = (req, res)=>{
    const {name, dateTime, userId} = req.body;

    console.log('Date Time:', dateTime)

    return Reminder.create({
        name,
        time: dateTime,
        userId
    })
        .then((data) => {
            return res.status(200).send({
                result: data,
                success: true
            })
        })
        .catch((err) => {
            return res.status(400).send('Invalid Add Bolus Route request.')
        })

};

///////////////////////// delete reminder //////////////
exports.deleteReminder = (req, res)=>{
    const { id } = req.body;

    Reminder.destroy({
        where: { id: id }
      })
        .then((data) => {
            return res.status(200).send({
                result: data,
                success: true
            })
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete Tutorial with id=" + id
          });
        });

};

///////////////////////// get all of user's reminders //////////////
exports.getAll = (req, res)=>{
    const { userId } = req.body;

    return User.findByPk(userId, {include: ['reminders'] })
        .then((data) =>{
            return res.status(200).send({
                result: data,
                success: true
            }) 
        })
        .catch((err) => {
            return res.status(400).send('Invalid Add Test Route request:',err)
        })

};