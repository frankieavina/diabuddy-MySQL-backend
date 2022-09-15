const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');

require('dotenv').config();

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT
// })

//initializing/connecting to database 
const uri = process.env.DB_URL; 
const sequelize = new Sequelize(uri);

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   dialect: 'mysql'
// });

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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./user.model')(sequelize,DataTypes);

module.exports = db;