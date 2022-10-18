//***************** verify Token, check User roles in database *************/
// middleware/authjwt.js

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

// function that verifies token
verifyToken = (req, res, next) => {
  const [scheme, token] = req.headers.authorization.split(' ');

  //verify we have the right scheme
  if (scheme !== 'Bearer') {
    throw(401, 'Invalid authorization. Wrong scheme');
  }

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  // verify we have the right token 
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

// verify you are Administrator 
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin
};

module.exports = authJwt;