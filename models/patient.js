const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    emailAddress: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    nameFamily: {type: String, required: true},
    nameGiven: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    clinicianId: {type: mongoose.Schema.Type.ObjectId, ref: clinicianSchema, required: true, unique: true},
    phoneNumber: String,
    homeAddress: String,
    profileName: String,
    recordingData: [requiredDataSchema],
    profilePhoto: buffer,
    briefTextBio: String,
    supportMessage: String
})

const Patient = mongoose.model('Patient', patientSchema, 'Patient')
module.exports = Patient