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
        return res.status(500).send('Error while create basal test:',err);
        })
    
  };
/////// get user's tests depending on userId ///////////
exports.getTestById = (req, res) => {
    const {userId} = req.body;

    console.log(userId);

    return User.findByPk(userId, {include: ['tests'] })
        .then((data) =>{
            return res.status(200).send({
                result: data,
                success: true
            }) 
        })
        .catch((err) => {
            return res.status(400).send('Invalid Get Basal Test Route request:',err)
        })

  };
////////  edit user's tests ///////////
exports.editTest = (req, res) => {
    const {numTest , glucose, date, userId, id} = req.body;

    return BasalTest.update({where:{id: id}})
        .then((data) => {
            return res.status(200).send({
                result: data,
                success: true
            }) 
        })
        .catch((err) => {
            return res.status(400).send('Invalid Edit Basal Test Route request:',err)
        })
}
//////// delete all of user's tests ///////////
exports.deleteTest = (req, res) => {
    const {testId} = req.body;

    return BasalTest.destroy( {where:{ id: testId}} )
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