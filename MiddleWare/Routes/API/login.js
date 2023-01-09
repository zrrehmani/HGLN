const jwt = require("jsonwebtoken");

function Login(req, res, next) {
  const username = req.body.user;
  const password = req.body.password;
  Body = req.body;
  jwt.sign(req.body, "secret key", (err, token) => {
    res.json({
      token,
      Body,
    });
  });
}

module.exports = Login;
