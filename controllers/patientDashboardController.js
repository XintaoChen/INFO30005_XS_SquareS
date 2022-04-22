// const todayHealthData = require('../models/patientHealthDataTodayModel')
const todayHealthData = require('../models/patient')

// const getTodayData = async (req, res, next) => {
//     try{
//         const tempData = await todayHealthData.findById(req.params.id).lean()
//         if (tempData) {
//             console.log(JSON.stringify(tempData))  
//             res.render('patientDashboard.hbs', { todayHealthData: tempData })
//         } else {
//             res.render('noRecords.hbs')
//         }
//     }catch(err){
//         return next(err)
//     }
// }

const mongoose = require("mongoose");
const patientModel = require("../models/patient");
const recordModel = require("../models/record");

const getTodayData = async (req, res, next) => {
    try{
        let tempData = {}
        patientModel.aggregate([
            {
                $lookup:{
                    from: "Record",
                    pipeline: [
                        { $match: { 
                            date: {
                                // change this to current date
                                $gte: new Date("2022,04,24"),
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
                for(i=0; i<tempData.recordInfo.length; i++){
                    for(j=0; j<tempData.recordingData.length; j++){
                        if(tempData.recordInfo[i].healthDataId.toString()== tempData.recordingData[j].healthDataId.toString()){
                            tempData.recordingData[j].comment = tempData.recordInfo[i].comment
                            tempData.recordingData[j].date = tempData.recordInfo[i].date
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

module.exports = {
    getTodayData,
}
