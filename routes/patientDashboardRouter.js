const express = require('express')
const patientDashboardController = require('../controllers/patientDashboardController')
const leaderBoardController = require('../controllers/leaderBoardController')
const patientProfileController = require('../controllers/patientProfileController')
const clinicianProfileController = require('../controllers/clinicianProfileController')

const patientDashboardRouter = express.Router()

const isAuthenticated = (req, res, next) => {
    // If user is not authenticated via passport, redirect to login page 
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    // Otherwise, proceed to next middleware function
    return next()
    }

patientDashboardRouter.get(
    '/today', isAuthenticated,
    patientDashboardController.getTodayDataPatient
)

patientDashboardRouter.get(
    '/pda', isAuthenticated,
    patientDashboardController.getDataAnalysis
)

patientDashboardRouter.post(
    '/today/add', isAuthenticated,
    patientDashboardController.postTodayDataPatient
)

patientDashboardRouter.get('/:d/leaderBoard', leaderBoardController.updateLeaderBoard)

patientDashboardRouter.get(
    '/profile', isAuthenticated,
    patientProfileController.getPatientProfile
)
patientDashboardRouter.post(
    '/profile/edit', isAuthenticated,
    patientProfileController.updatePatientProfile
)
patientDashboardRouter.get(
    '/clinician', isAuthenticated,
    clinicianProfileController.getClinicianInfo
)

module.exports = {
    patientDashboardRouter,
}
