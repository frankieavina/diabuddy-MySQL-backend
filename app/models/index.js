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


// Associations between user and role - One to Many Associations
// primary key from parent table(roles) may appear in foreign 
// key column on child table (users) more than once
// we will use a combination of hasMany() and belongsTo()
db.role.hasMany(db.users);
db.users.belongsTo(db.role);

db.ROLES = ["user","admin","doctor"]

module.exports = db;