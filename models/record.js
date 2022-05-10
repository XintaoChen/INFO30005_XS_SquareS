const mongoose = require('mongoose')
const Patient = require('./patient')
const HealthData = require('./healthData')

const recordSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Patient,
            required: true,
        },
        healthDataId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: HealthData,
            required: true,
        },
        // date: { type: Date, required: true },
        value: { type: Number, required: true, min: 0 },
        comment: { type: String, maxlength: 100 },
    },
    { timestamps: { createdAt: 'date', updatedAt: false } }
)

const Record = mongoose.model('Record', recordSchema, 'Record')
module.exports = Record
