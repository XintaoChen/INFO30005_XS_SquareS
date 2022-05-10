const express = require('express')

const patientRouter = express.Router()
const patientController = require('../controllers/patientController')

// get required datas of single patient
patientRouter.get('/getDataTypes', (req, res) => {
    patientController.getDataTypesByPatientId(req, res)
})

// get list of patient
patientRouter.get('/getlist', (req, res) => {
    patientController.getPatientList(req, res)
})

module.exports = patientRouter
