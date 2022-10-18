const db = require('../models');
const Bolus = db.bolus;
const User = db.users;

///////////////////////// create new bolus row //////////////
exports.addBolus = (req, res)=>{
    const {carbs, glucose, date, bolus, userId} = req.body;

    return Bolus.create({
        carbs: carbs,
        glucose: glucose,
        bolus: bolus,
        time: date,
        userId: userId
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