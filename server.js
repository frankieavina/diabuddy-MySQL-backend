const express = require("express");
const app = express();
const cors = require('cors');
const db = require('./app/models');
const bodyParser = require('body-parser');

require('dotenv').config();

// middleware 
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true,}));
app.use(bodyParser.json());

// database roles
const Role = db.role;

db.sequelize.sync()
  .then(() => { 
    console.log("Synced to MySQL DB from Railway.");
  })
  .catch((err) => { console.log('Failed to sync to db:'+ err.message)} );

// ***************** routes **********************************************/
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to frankie's application." });
});
// rest of routes
require('./app/routes/user.routes')(app);
require('./app/routes/auth.routes')(app);
//************************************************************************/

// setting ports and listening for requests
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

// delete on uncomment this and {force: true} after first run
// or manually add table in mySql
// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });
//   Role.create({
//     id: 2,
//     name: "admin"
//   });
//   Role.create({
//     id: 3,
//     name: "doctor"
//   })
// }
