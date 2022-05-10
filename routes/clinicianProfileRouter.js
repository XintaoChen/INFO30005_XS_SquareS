const express = require('express')
const clinicianProfileController = require('../controllers/clinicianProfileController')

const clinicianProfileRouter = express.Router()
clinicianProfileRouter.get('/:id', clinicianProfileController.getClinicianInfo)



module.exports = clinicianProfileRouter