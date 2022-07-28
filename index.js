const express = require("express");
const cors = require("cors");
const axios = require("axios");
const port = process.env.PORT || 3001;
const oAuth = require("./middleware/oAuth");
const app = express();

const tasksAPIEndpoint = "http://localhost:8080/tasks";

app.use(cors({ origin: "http://localhost:3000" }));

app.use(oAuth);

app.get("/login", async (req, res) => {
  try {
    const { access_token = undefined } = req;

    res.json({ msg: "Login successful", token: access_token });
  } catch (error) {
    console.error(error);

    if (error.response.status === 401) {
      res.status(401).json("Unauthorized to access data");
    } else if (error.response.status === 403) {
      res.status(403).json("Permission denied");
    } else {
      res.status(500).json("Whoops, something went wrong");
    }
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const { access_token = undefined } = req;

    // if (req.headers.authorization) {
    //   console.log(req.headers.authorization);
    //   return;
    // }

    const response = await axios({
      method: "get",
      url: tasksAPIEndpoint,
      headers: { Authorization: `Bearer ${access_token}` },
    });
    res.json({
      response: response.data,
    });
  } catch (error) {
    console.error(error);

    if (error.response.status === 401) {
      res.status(401).json("Unauthorized to access data");
    } else if (error.response.status === 403) {
      res.status(403).json("Permission denied");
    } else {
      res.status(500).json("Whoops, something went wrong");
    }
  }
});

app.listen(port, () => console.log(`Backend listen on port ${port} `));
