const mongoose = require('mongoose')

const healthDataSchema = new mongoose.Schema({
    dataName: { type: String, required: true, unique: true },
    unit: String,
})

const HealthData = mongoose.model('HealthData', healthDataSchema, 'HealthData')
module.exports = HealthData
