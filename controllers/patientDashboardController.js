// const todayHealthData = require('../models/patientHealthDataTodayModel')
const todayHealthData = require('../models/patient')

const mongoose = require("mongoose");
const patientModel = require("../models/patient");
const recordModel = require("../models/record");



const getTodayDataPatient = async (req, res, next) => {
    try{
        let tempData = {}
        //get all required data from database
        patientModel.aggregate([
            {
                $lookup:{
                    from: "Record",
                    pipeline: [
                        { $match: { 
                            date: {
                                // change this to current date
                                $gte: new Date("2022,4,24"),
                                $lt: new Date("2022,4,25")
                            },
                         } }
                     ],
                    localField: "_id",
                    foreignField: "patientId",
                    as: 'recordInfo'
                }
            },{
                $match: {
                    _id: mongoose.Types.ObjectId(req.params.id),
                }
            }
        ], (err, docs) => {
            if (err) {
                return console.log(err)
            }
            tempData = docs[0]

            if(tempData){
                //manipulate data to satisfy .hbs page data logic
                for(i=0; i<tempData.recordInfo.length; i++){
                    for(j=0; j<tempData.recordingData.length; j++){
                        if(tempData.recordInfo[i].healthDataId.toString()== tempData.recordingData[j].healthDataId.toString()){
                            tempData.recordingData[j].comment = tempData.recordInfo[i].comment
                            tempData.recordingData[j].time = tempData.recordInfo[i].date
                            tempData.recordingData[j].value = tempData.recordInfo[i].value
                        }
                    }
                }
                console.log(JSON.stringify(tempData))
                res.render('patientDashboard.hbs', { todayHealthData: tempData })
            }else {
                res.render('noRecords.hbs')
            }
        })
    }catch(err){
        return next(err)
    }
}

const postTodayDataPatient= (req) => {
    var Record = require("../models/record")
    var tempRecord = new Record({
        "comment": req.comment,
        "date": "2022-04-24T13:00:00.000+00:00",
        "value": req.value,
        "patientId": req.patientId,
        "healthDataId": req.healthDataId,
        "clinicianId": req.clinicianId
    })
    tempRecord.save(function (err, res) {
        if (err) return console.error(err);
        console.log(res.value + " saved to db.");
      });
}

module.exports = {
    getTodayDataPatient,
    postTodayDataPatient
}
