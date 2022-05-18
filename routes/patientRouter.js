// add router
const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const patientRouter = express.Router()

// connect to controller
const patientController = require('../controllers/patientController')

const isAuthenticated = (req, res, next) => {
    // If user is not authenticated via passport, redirect to login page 
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    // Otherwise, proceed to next middleware function
    return next()
    }

// process routes by calling controller functions
patientRouter.get('/:id', isAuthenticated, patientController.getPatientInfo)
//patientRouter.get('/:id', (req, res) => patientController.getPatientNote(req,res))

patientRouter.post("/add", isAuthenticated, patientController.postNewPatient)

patientRouter.post('/addNote', isAuthenticated, function (req, res) {
    patientController.addNote(req.body)
    console.log(req.body)
    res.redirect('/patient/' + req.body.patientId.toString())
})

patientRouter.post('/updateSupportMessage', isAuthenticated, function (req, res) {
    console.log(req.body)
    patientController.updateSupportMessage(req.body)
    console.log(req.body)
    res.redirect('/patient/' + req.body.patientId.toString())
})

patientRouter.post('/editDataSetting', isAuthenticated,function (req, res) {
    patientController.editDataSetting(req.body)
    res.redirect('/patient/' + req.body.patientId.toString())
})

// export router
module.exports = patientRouter
