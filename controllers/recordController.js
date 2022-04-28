const Record = require('../models/record')
const HealthData = require('../models/healthData')

const getOneRecordBypatientId = async (req, res) => {
    try {
        const { patientId, date, healthDataId } = req.query
        console.log(patientId, healthDataId)
        const record = await Record.findOne(
            {
                patientId: patientId,
                date: new Date(date),
                healthDataId: healthDataId,
            },
            'value comment'
        )
        if (record) {
            let { unit } = await HealthData.findById(healthDataId)
            let { _id, value, comment } = record
            const data = { _id, value, unit }
            if (!comment && comment.length !== 0) {
                res.json({
                    status: 0,
                    data: data,
                })
            } else {
                res.json({
                    status: 1,
                    data: data,
                })
            }
        } else {
            res.json({
                status: 2,
                msg: 'record not yet filled',
            })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = { getOneRecordBypatientId }
