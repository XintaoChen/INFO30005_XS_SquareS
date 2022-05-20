const express = require('express')
const clinicianDashboardController = require('../controllers/clinicianDashboardController')
const patientController = require('../controllers/patientController')
const commentsHistoryController = require('../controllers/commentsHistoryController')
const clinicianController = require('../controllers/clinicianController')

const clinicianDashboardRouter = express.Router()

const isAuthenticated = (req, res, next) => {
// If user is not authenticated via passport, redirect to login page 
if (!req.isAuthenticated()) {
    return res.redirect('/login')
}
// Otherwise, proceed to next middleware function
return next()
}
clinicianDashboardRouter.get('/', isAuthenticated, clinicianDashboardController.getTodayDataClinician)

clinicianDashboardRouter.get('/profile', isAuthenticated, clinicianController.getClinicianProfile)
clinicianDashboardRouter.post('/profile/edit', isAuthenticated, clinicianController.updateClinicianProfile)

//for viewing all coments
clinicianDashboardRouter.get('/comment', isAuthenticated, commentsHistoryController.getCommentsHistory)

//for management of patients
clinicianDashboardRouter.get('/patient/:id', isAuthenticated, patientController.getPatientInfo)
//patientRouter.get('/:id', (req, res) => patientController.getPatientNote(req,res))

clinicianDashboardRouter.post("/patient/add", isAuthenticated, patientController.postNewPatient)

clinicianDashboardRouter.post('/patient/addNote', isAuthenticated, function (req, res) {
    patientController.addNote(req.body)
    // console.log(req.body)
    res.redirect('/clinician/patient/' + req.body.patientId.toString())
})

clinicianDashboardRouter.post('/patient/updateSupportMessage', isAuthenticated, function (req, res) {
    // console.log(req.body)
    patientController.updateSupportMessage(req.body)
    // console.log(req.body)
    res.redirect('/clinician/patient/' + req.body.patientId.toString())
})

clinicianDashboardRouter.post('/patient/editDataSetting', isAuthenticated,function (req, res) {
    patientController.editDataSetting(req.body)
    res.redirect('/clinician/patient/' + req.body.patientId.toString())
})


module.exports = clinicianDashboardRouter
