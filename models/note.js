const mongoose = require('mongoose')
const Clinician = require('./clinician')
const Patient = require('./patient')

const noteSchema = new mongoose.Schema({
    clinicianId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Clinician,
        required: true,
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Patient,
        required: true,
    },
    note: { type: String, required: true },
    date: { type: Date, default: Date.now },
})

const Note = mongoose.model('Note', noteSchema, 'Note')
module.exports = Note
