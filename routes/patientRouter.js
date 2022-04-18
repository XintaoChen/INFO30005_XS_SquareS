const express = require("express");

const patientRouter = express.Router();
const patientController = require("../controllers/patientController");

// get required datas of single patient
patientRouter.get("/getDataTypes", (req, res) => {
  patientController.getDataTypesByPatientId(req, res);
});

module.exports = patientRouter;
