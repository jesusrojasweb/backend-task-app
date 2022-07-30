const router = require("express").Router();

router.get("/login", async (req, res) => {
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

router.use("/tasks", require("./tasks.route"));

module.exports = router;
