const db = require('../models');
const { Op } = require('sequelize');
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
            return res.status(400).send('Invalid Add Bolus Route request:',err)
        })
};

exports.getDayLog = async (req, res)=>{
    const {date, userId} = req.body;

    return Bolus.findAll({
        where:{
            time:{
                [Op.between]: [`${date}T00:00:00.000Z`,`${date}T23:59:59.007Z`]
            },
            userId: userId
        }
    })
        // .then((data) => {
        //     return [...data].filter((boluses) => boluses.userId === userId);
        // })
        .then((data) => {
            if(data.length > 0){
                return res.status(200).send({
                    result: data,
                    success: true
                }) 
             }else{
                 return res.status(200).send({
                     result: 'No info found for this date.',
                     success: false
                 })
             } 
            
        })
        .catch((err) => {
            return res.status(400).send('Invalid Add Bolus Route request:',err)
        });
};