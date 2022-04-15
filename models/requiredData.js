const mongoose = require('mongoose')

const requiredDataSchema = new mongoose.Schema({
    healthDataId: {type: mongoose.Schema.Type.ObjectId, ref: dataTypeSchema, required: true},
    upperBound: Number,
    lowerBound: Number
})

const RequiredData = mongoose.model('RequiredData', requiredDataSchema, 'RequiredData')
module.exports = RequiredData