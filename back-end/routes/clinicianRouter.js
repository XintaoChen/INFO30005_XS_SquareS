const express = require("express");
const clinicianRouter = express.Router();
const clinicianController = require("../controllers/clinicianController");


clinicianRouter.get("/getClinicianInfo", (req, res) => {
  clinicianController.getClinicianInfo(req, res);
});

module.exports = clinicianRouter;