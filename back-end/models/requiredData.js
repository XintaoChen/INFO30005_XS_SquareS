const mongoose = require('mongoose')

const requiredDataSchema = new mongoose.Schema({
    healthDataId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    upperBound: Number,
    lowerBound: Number,
})

const RequiredData = mongoose.model(
    'RequiredData',
    requiredDataSchema,
    'RequiredData'
)
module.exports = RequiredData
