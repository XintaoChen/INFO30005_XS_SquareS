const todayHealthData = require("../models/patientHealthDataTodayModel")

const getTodayData = (req, res) => {
    // const tempData = patientData.find(data => data.id === req.params.id)
    // if(tempData){
    //     res.render('patientDashboard.hbs', {singlePatientData: tempData})
    // }else{
    //     res.render('noRecords.hbs')
    // }
    res.render('patientDashboard.hbs')
}

module.exports = {
    getTodayData
}