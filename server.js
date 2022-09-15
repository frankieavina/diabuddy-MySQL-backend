const express = require("express");
const app = express();
const cors = require('cors');
const db = require('./app/models');

require('dotenv').config();

// middleware 
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true,}));

db.sequelize.sync()
  .then(() => { console.log("Synced to MySQL DB from Railway.")} )
  .catch((err) => { console.log('Failed to sync to db:'+ err.message)} );

// ***************** routes ***********************
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to frankie's application." });
});
require('./app/routes/user.routes')(app);

// setting ports and listening for requests
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
