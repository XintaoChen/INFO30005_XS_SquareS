const express = require('express')
const clinicianController = require('../controllers/clinicianController')

const clinicianRouter = express.Router()
clinicianRouter.get('/:id', clinicianController.getClinicianInfo)
// clinicianDashboardRouter.get('/:id', clinicianDashboardController.getTodayDate)



module.exports = clinicianRouter