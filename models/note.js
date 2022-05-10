const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    clinicianId: {
        type: mongoose.Schema.Type.ObjectId,
        ref: clinicianSchema,
        required: true,
        unique: true,
    },
    patientId: {
        type: mongoose.Schema.Type.ObjectId,
        ref: patientSchema,
        required: true,
        unique: true,
    },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
})

const Note = mongoose.model('Note', noteSchema, 'Note')
module.exports = Note
