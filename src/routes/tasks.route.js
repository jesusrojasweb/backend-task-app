const router = require("express").Router();
const axios = require("axios");
const jwt_decode = require("jwt-decode");

const tasksAPIEndpoint = "http://localhost:8080/api/tasks";

router.get("/", async (req, res) => {
  try {
    const { access_token = undefined } = req;

    const response = await axios({
      method: "get",
      url: tasksAPIEndpoint,
      headers: { Authorization: `Bearer ${access_token}` },
    });
    res.json({
      tasks: response.data,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { access_token = undefined } = req;

    const userId = jwt_decode(access_token).sub;
    const data = { ...req.body, userId };

    const response = await axios({
      method: "post",
      url: tasksAPIEndpoint,
      headers: { Authorization: `Bearer ${access_token}` },
      data,
    });
    res.json({
      msg: "Task Uploaded",
      task: response.data,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:taskId", async (req, res) => {
  try {
    const { access_token = undefined } = req;

    const { taskId } = req.params;

    const response = await axios({
      method: "put",
      url: `${tasksAPIEndpoint}/${taskId}`,
      headers: { Authorization: `Bearer ${access_token}` },
      data: req.body,
    });
    res.json({
      msg: "Task Updated",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:taskId", async (req, res) => {
  try {
    const { access_token = undefined } = req;

    const { taskId } = req.params;

    const response = await axios({
      method: "delete",
      url: `${tasksAPIEndpoint}/${taskId}`,
      headers: { Authorization: `Bearer ${access_token}` },
    });
    res.json({
      msg: "Task Deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
