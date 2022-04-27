const express = require('express')
const clinicianDashboardController = require('../controllers/clinicianDashboardController')

const clinicianDashboardRouter = express.Router()
clinicianDashboardRouter.get('/:id', clinicianDashboardController.getTodayDataClinician)



module.exports = clinicianDashboardRouter
