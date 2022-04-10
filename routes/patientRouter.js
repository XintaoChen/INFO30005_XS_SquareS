const express = require('express')

const patientController = require('../controllers/patientController')

const patientRouter = express.Router()

patientRouter.get('/:id', patientController.getPatientInfo)

module.exports = patientRouter