const express = require('express')
const clinicianDashboardController = require('../controllers/clinicianDashboardController')
const clinicianDashboardRouter = express.Router()

const isAuthenticated = (req, res, next) => {
// If user is not authenticated via passport, redirect to login page 
if (!req.isAuthenticated()) {
    return res.redirect('/login')
}
// Otherwise, proceed to next middleware function
return next()
}
clinicianDashboardRouter.get('/', isAuthenticated, clinicianDashboardController.getTodayDataClinician)



module.exports = clinicianDashboardRouter
