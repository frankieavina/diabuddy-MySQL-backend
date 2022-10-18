//************ return basal testing content *************/
const db = require('../models');
const BasalTest = db.basalTesting;
const User = db.users;

//////// add/create users test //////////////
exports.addTest = (req, res) => {
    const {numTest, glucose, date, userId} = req.body;

    return BasalTest.create({
        numberOfTest: numTest,
        glucose: glucose,
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
        return res.status(500).send('Error white create basal test:',err);
        })
    
  };
/////// get user's tests depending on userId ///////////
exports.getTestById = (req, res) => {
    const {userId} = req.body;

    return User.findByPk(userId, {include: ['tests'] })
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
//////// delete all of user's tests ///////////
exports.deleteTest = (req, res) => {
    const {userId} = req.body;

    return BasalTest.destroy( {where:{ userId: userId}} )
        .then((data) =>{
            return res.status(200).send({
                result: data,
                success: true
            })
        })
        .catch((err) =>{
            return res.status(400).send('Invalid Delete Test Route request:',err)
        })


  };