// const patientData = require('../models/patientModel')
const Patient = require('../models/patient')
const { param } = require('../routes/peopleRouter')

// const getPatientInfo = (req, res) => {
//     const tempData = patientData.find((data) => data.id === req.params.id)
//     if (tempData) {
//         res.render('singlePatient.hbs', { singlePatientData: tempData })
//     } else {
//         res.render('noRecords.hbs')
//     }
// }

const getPatientInfo = async (req, res, next) => {
    try{
        const tempData = await Patient.findById(req.params.id).lean()
        if (tempData) {
            res.render('singlePatient.hbs', { singlePatientData: tempData })
        } else {
            res.render('noRecords.hbs')
        }
    }catch(err){
        return next(err)
    }
}

module.exports = {
    getPatientInfo
}
