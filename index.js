const express = require("express");
const bodyParser = require("body-parser");
const Authenticate = require("./MiddleWare/Authenticate");
const Authorise = require("./MiddleWare/Authorise");
var base64 = require("base-64");
const login = require("./MiddleWare/Routes/API/login");
const { Sequelize } = require("sequelize");

const app = express();
const port = 3000;

// Database Connection
const sequelize = new Sequelize("local", "root", "root", {
  host: "localhost",
  port: 10012,
  dialect: "mysql",
});
// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.get("/", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.post("/auhtorise", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});
app.post("/authenticate", Authenticate, (req, res) => {
  res.json({ message: "success" });
});

app.post("/login", login);

// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
