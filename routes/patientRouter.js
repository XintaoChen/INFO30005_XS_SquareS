// add router
const express = require('express')
const patientRouter = express.Router()

// connect to controller
const patientController = require('../controllers/patientController')

// process routes by calling controller functions
patientRouter.get('/:id', patientController.getPatientInfo)
//patientRouter.get('/:id', (req, res) => patientController.getPatientNote(req,res))

patientRouter.post('/addNote', function (req, res) {
    patientController.addNote(req.body)
    console.log(req.body)
    res.redirect('/patient/' + req.body.patientId.toString())
})

// export router
module.exports = patientRouter
