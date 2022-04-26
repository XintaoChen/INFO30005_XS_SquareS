const express = require("express");
const healthDataRouter = express.Router();
const healthDataController = require("../controllers/healthDataController");


healthDataRouter.get("/getHealthDataList", (req, res) => {
  healthDataController.getHealthDataList(req, res);
});

module.exports = healthDataRouter;