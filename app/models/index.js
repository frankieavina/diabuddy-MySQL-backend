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
// db.sequelize = sequelize;

// models for users roles and basalTesting
db.users = require('./user.model')(sequelize,DataTypes);
db.role = require('./role.model')(sequelize,DataTypes);
db.basalTesting = require('./basalTesting.model')(sequelize,DataTypes);

// Associations between users and roles
// MANY-TO-MANY RELATIONSHIP
// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId"
// });
// db.users.hasOne(db.role);

// Associations between user and role
// sequalize will create a foreign key for users called role_id
// that will connect/associate users to role
// ONE-TO-ONE RELATIONSHIP
db.users.hasOne(role);


db.ROLES = ["user","admin","doctor"]

module.exports = db;