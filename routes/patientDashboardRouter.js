const express = require('express')
const patientDashboardController = require('../controllers/patientDashboardController')
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

patientDashboardRouter.post('/add', isAuthenticated, function (req, res) {
    patientDashboardController.postTodayDataPatient(req.body)
    console.log(req.body)
    // res.redirect('/today/' + req.body.patientId.toString())
    res.redirect('/today/')
})
module.exports = {
    patientDashboardRouter,
}
