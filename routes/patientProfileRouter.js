const express = require('express')
const patientProfileController = require('../controllers/patientProfileController')

const patientProfileRouter = express.Router()
patientProfileRouter.get('/:id', patientProfileController.getPatientProfile)

patientProfileRouter.post('/edit', function (req, res) {
    console.log("router:"+req.body);
    patientProfileController.updatePatientProfile(req)
    res.redirect('/patient/profile/' + req.body.patientId.toString())
})



module.exports = patientProfileRouter