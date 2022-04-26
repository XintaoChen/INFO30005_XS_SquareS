const express = require('express')
const patientDashboardController = require('../controllers/patientDashboardController')

const patientDashboardRouter = express.Router()
patientDashboardRouter.get('/get', patientDashboardController.getTodayData)

module.exports = {
    patientDashboardRouter,
}
