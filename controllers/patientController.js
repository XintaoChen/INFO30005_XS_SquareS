const patientData = require('../models/patientModel')
const { param } = require('../routes/peopleRouter')

const getPatientInfo = (req, res) => {



    
    const tempData = patientData.find((data) => data.id === req.params.id)
    if (tempData) {
        res.render('singlePatient.hbs', { singlePatientData: tempData })
    } else {
        res.render('noRecords.hbs')
    }
}

module.exports = {
    getPatientInfo,
}
