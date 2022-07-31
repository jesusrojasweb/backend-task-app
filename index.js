const express = require("express");
const cors = require("cors");
const axios = require("axios");
const oAuth = require("./middleware/oAuth");
const jwt_decode = require("jwt-decode");
const app = express();
const bodyParser = require("body-parser");

const { NODE_ENV } = process.env;
const port = NODE_ENV === "test" ? 3002 : 3001;

const tasksAPIEndpoint = "http://localhost:8080/tasks";

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(oAuth);

app.use(require("./src/routes"));

const server = app.listen(port, () =>
  console.log("Express listen on port " + port)
);

module.exports = { app, server };
