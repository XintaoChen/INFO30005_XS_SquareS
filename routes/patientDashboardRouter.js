const express = require('express')
const patientDashboardController = require('../controllers/patientDashboardController')
const leaderBoardController = require('../controllers/leaderBoardController')

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
    '/', isAuthenticated,
    patientDashboardController.getTodayDataPatient
)

patientDashboardRouter.get(
    '/pda', isAuthenticated,
    patientDashboardController.getDataAnalysis
)

patientDashboardRouter.post(
    '/add', isAuthenticated,
    patientDashboardController.postTodayDataPatient
)

patientDashboardRouter.get('/:d/leaderBoard', leaderBoardController.updateLeaderBoard)

module.exports = {
    patientDashboardRouter,
}
