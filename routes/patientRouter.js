const express = require("express");
const patientRouter = express.Router();
const patientController = require("../controllers/patientController");

// get required datas of single patient
patientRouter.get("/getDataTypes", (req, res) => {
  patientController.getDataTypesByPatientId(req, res);
});

// get list of patient
patientRouter.get("/getlist", (req, res) => {
  patientController.getPatientList(req, res);
});

// get patient information
patientRouter.get("/getPatientInfo", (req, res) => {
  patientController.getPatientInfo(req, res);
});

module.exports = patientRouter;
