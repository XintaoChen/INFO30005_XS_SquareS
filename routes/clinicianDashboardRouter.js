const express = require('express')
const clinicianDashboardController = require('../controllers/clinicianDashboardController')
const clinicianDashboardRouter = express.Router()
const patientController = require('../controllers/patientController')

const isAuthenticated = (req, res, next) => {
// If user is not authenticated via passport, redirect to login page 
if (!req.isAuthenticated()) {
    return res.redirect('/login')
}
// Otherwise, proceed to next middleware function
return next()
}
clinicianDashboardRouter.get('/', isAuthenticated, clinicianDashboardController.getTodayDataClinician)

clinicianDashboardRouter.get('/patient/:id', isAuthenticated, patientController.getPatientInfo)
//patientRouter.get('/:id', (req, res) => patientController.getPatientNote(req,res))

clinicianDashboardRouter.post("/patient/add", isAuthenticated, patientController.postNewPatient)

clinicianDashboardRouter.post('/patient/addNote', isAuthenticated, function (req, res) {
    patientController.addNote(req.body)
    console.log(req.body)
    res.redirect('/clinician/patient/' + req.body.patientId.toString())
})

clinicianDashboardRouter.post('/patient/updateSupportMessage', isAuthenticated, function (req, res) {
    console.log(req.body)
    patientController.updateSupportMessage(req.body)
    console.log(req.body)
    res.redirect('/clinician/patient/' + req.body.patientId.toString())
})

clinicianDashboardRouter.post('/patient/editDataSetting', isAuthenticated,function (req, res) {
    patientController.editDataSetting(req.body)
    res.redirect('/clinician/patient/' + req.body.patientId.toString())
})


module.exports = clinicianDashboardRouter
