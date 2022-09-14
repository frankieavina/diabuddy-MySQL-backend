const express = require("express");
const app = express();

require('dotenv').config();

const port = process.env.PORT; 

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
