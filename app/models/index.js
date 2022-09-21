const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');

require('dotenv').config();

//configuring DB you can also do this in the 
// db.config.js file  
const uri = process.env.DB_URL; 
const sequelize = new Sequelize(uri);

// testing connection to database
const testConnect = async () =>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnect(); 

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;

// models for users roles and basalTesting
db.users = require('./user.model')(sequelize,DataTypes);
db.role = require('../models/role.model')(sequelize,DataTypes);
db.basalTesting = require('../models/basalTesting.model')(sequelize,DataTypes);

// Associations between users and roles
// MANY-TO-MANY RELATIONSHIP
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.users.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

// Associations between user and basalTesting
// ONE-TO-ONE RELATIONSHIP
// you can add {foreignKey: namedesired} and change the value 
// of basalTestingId
db.users.hasOne(db.basalTesting);
db.basalTesting.belongsTo(db.users);


db.ROLES = ["user","admin","doctor"]

module.exports = db;