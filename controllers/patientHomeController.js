const todayHealthData = require('../models/patientHomeDataModel')
const { param } = require('../routes/patientHomeRouter')

const getTodayData = (req, res) => {
    // const tempData = todayHealthData.find(data => data.id === req.params.id)
    // if(tempData){
    //     res.render('patientDashboard.hbs', {singlePatientData: tempData})
    // }else{
    //     res.render('noRecords.hbs')
    // }
    res.render('patientDashboard.hbs')
}

module.exports = {
    getTodayData,
}
