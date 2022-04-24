const express = require('express')
const patientDashboardController = require('../controllers/patientDashboardController')

const patientDashboardRouter = express.Router()
patientDashboardRouter.get('/:id', patientDashboardController.getTodayDataPatient)

module.exports = {
    patientDashboardRouter,
}
