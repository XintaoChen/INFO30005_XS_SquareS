const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
    patientId: {type: mongoose.Schema.Type.ObjectId, ref: Patient, required: true, unique: true},
    healthDataId: {type: mongoose.Schema.Type.ObjectId, ref: dataTypeSchema, required: true},
    date: {type: Date, required: true},
    value: {type: Number, required: true, min = 0},
    comment: {type: String, maxlength = 100}
})

const Record = mongoose.model('Record', recordSchema, 'Record')
module.exports = Record