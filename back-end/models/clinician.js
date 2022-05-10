const mongoose = require('mongoose')

const clinicianSchema = new mongoose.Schema({
    emailAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    nameFamily: { type: String, required: true },
    nameGiven: { type: String, required: true },
    clinicNumber: String,
    clinicAddress: String,
    profilePhoto: Buffer,
    briefTextBio: String,
})

const Clinician = mongoose.model('Clinician', clinicianSchema, 'Clinician')
module.exports = Clinician
