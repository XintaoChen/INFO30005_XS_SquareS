const express = require("express");

const patientRouter = express.Router();
const isAuthenticated = (req, res, next) => {
    // If user is not authenticated via passport, redirect to login page 
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    // Otherwise, proceed to next middleware function
    return next()
    }

const patientController = require("../controllers/patientController");

const clinicianProfileController = require('../controllers/clinicianProfileController')
const patientProfileController = require('../controllers/patientProfileController')


patientRouter.get("/", isAuthenticated, patientController.getPatientInfo);

patientRouter.post("/add", isAuthenticated, patientController.postNewPatient);

patientRouter.get("/clinician", isAuthenticated, clinicianProfileController.getClinicianInfo);
patientRouter.get("/profile", isAuthenticated, patientProfileController.getPatientProfile);

patientRouter.post('/profile/edit', function (req, res) {
    patientProfileController.updatePatientProfile(req)
})

module.exports = patientRouter;
