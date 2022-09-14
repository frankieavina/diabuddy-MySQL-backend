const express = require("express");
const app = express();
const mysql = require('mysql2/promise');

require('dotenv').config();

const port = process.env.PORT;
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})


app.use(async function mysqlConnection(req, res, next) {
    try {
      req.db = await pool.getConnection();
      req.db.connection.config.namedPlaceholders = true;
  
      await next();
  
      req.db.release();
    } catch (err) {
      console.log(err)
      if (req.db) req.db.release();
      throw err;
    }
});

app.use(express.json());
app.use(express.urlencoded({extended: true,}));

app.get("/", async (req, res) => {
  try{
    const [users] = await req.db.query(`SELECT * FROM users`);
    res.json(users);
  }catch(err){
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
