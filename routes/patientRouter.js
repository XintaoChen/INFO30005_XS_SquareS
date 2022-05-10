// add router
const express = require('express')
const patientRouter = express.Router()

// connect to controller
const patientController = require('../controllers/patientController')

// process routes by calling controller functions
patientRouter.get('/:id', patientController.getPatientInfo)
//patientRouter.get('/:id', (req, res) => patientController.getPatientNote(req,res))

// export router
module.exports = patientRouter
