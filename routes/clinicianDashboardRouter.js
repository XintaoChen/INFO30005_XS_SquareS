const express = require('express')

const clinicianController = require('../controllers/clinicianDashboardController')

const clinicianRouter = express.Router()

clinicianRouter.get('/:id', clinicianController.getTodayDataClinician)

module.exports = clinicianRouter
