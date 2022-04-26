const express = require('express')

const clinicianController = require('../controllers/clinicianDashboardController.js')

const clinicianRouter = express.Router()

clinicianRouter.get('/:id', clinicianController.getTodayDataClinician)

module.exports = clinicianRouter
