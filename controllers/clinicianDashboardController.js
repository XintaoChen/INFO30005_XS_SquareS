// const patientData = require('../models/patientModel')
const Patient = require('../models/patient')
const { param } = require('../routes/peopleRouter')

const mongoose = require('mongoose')
const clinicianToday = require('../models/clinician.js')
const HealthData = require('../models/healthData')
const Record = require('../models/record')

const getTodayDataClinician = async (req, res, next) => {
    try {
        const clinicianId = req.params.id
        const untrackedHealthDataList = await HealthData.find(
            {},
            'dataName unit'
        )
        let healthDataList = untrackedHealthDataList.map((healthData) => {
            return {
                healthTitle: healthData.dataName + ' (' + healthData.unit + ')',
            }
        })
        const clinicianInfo = await clinicianToday.findById(clinicianId)
        if (!clinicianInfo) {
            res.render('noRecords.hbs')
        }
        const untrackedPatientList = await Patient.find(
            { clinicianId: clinicianId },
            'nameGiven nameFamily recordingData'
        )
        let patientList = await Promise.all(
            untrackedPatientList.map(async (patient) => {
                let dataList = await Promise.all(
                    untrackedHealthDataList.map(async (dataType) => {
                        let healthDataId = dataType._id
                        let healthDataMatched = patient.recordingData.find(
                            (item) => {
                                return (
                                    item.healthDataId.toString() ==
                                        healthDataId.toString() &&
                                    item.isRequired != false
                                )
                            }
                        )
                        let { upperBound, lowerBound } = healthDataMatched || {}
                        let { dataName, unit } = dataType
                        let isRequired = upperBound ? true : false
                        let value = undefined
                        if (isRequired) {
                            let nDate = new Date()
                            let startOfToday = new Date(
                                nDate.getFullYear(),
                                nDate.getMonth(),
                                nDate.getDate()
                            )
                            let record = await Record.findOne({
                                patientId: patient._id,
                                date: {
                                    $gte: startOfToday,
                                    $lt: new Date(
                                        startOfToday.getTime() +
                                            24 * 60 * 60 * 1000
                                    ),
                                },
                                healthDataId: healthDataId,
                            })
                            if (record) {
                                value = record.value
                            }
                        }
                        return {
                            upperBound: upperBound,
                            lowerBound: lowerBound,
                            dataName: dataName,
                            unit: unit,
                            value: value,
                            isRequired: isRequired,
                        }
                    })
                )
                return {
                    nameGiven: patient.nameGiven,
                    nameFamily: patient.nameFamily,
                    recordingData: dataList,
                }
            })
        )
        let testData = {
            nameGiven: clinicianInfo.nameGiven,
            nameFamily: clinicianInfo.nameFamily,
            welcomeMessage: clinicianInfo.welcomeMessage,
            patientList: patientList,
            healthDataList: healthDataList,
        }
        // let tempData = {};
        //get all required data form database
        // clinicianToday.aggregate(
        //   [
        //     {
        //       $lookup: {
        //         from: "Patient",
        //         localField: "_id",
        //         foreignField: "clinicianId",
        //         as: "patient",
        //       },
        //     },
        //     {
        //       $match: {
        //         _id: mongoose.Types.ObjectId(req.params.id),
        //       },
        //     },
        //     {
        //       $skip: 0,
        //     },
        //     {
        //       $unwind: "$patient", //  You have to use $unwind on an array if you want to use a field in the subdocument array to further usage with `$lookup`
        //     },
        //     {
        //       $lookup: {
        //         from: "Record",
        //         pipeline: [
        //           {
        //             $match: {
        //               date: {
        //                 // change this to current date
        //                 $gte: new Date("2022,04,24"),
        //                 $lt: new Date("2022,04,25"),
        //               },
        //             },
        //           },
        //         ],
        //         localField: "patient._id",
        //         foreignField: "patientId",
        //         as: "recordInfo",
        //       },
        //     },
        //   ],
        //   (err, docs) => {
        //     if (err) {
        //       return console.log(err);
        //     }
        //     // console.log(JSON.stringify(docs))
        //     tempData = docs;
        //     if (tempData) {
        //       //manipulate data to satisfy .hbs page data logic
        //       tempData[0].patientList = [];
        //       if (tempData.length > 1) {
        //         for (i = 0; i < tempData.length; i++) {
        //           tempData[0].patientList.push(tempData[i].patient);
        //         }
        //       } else {
        //         tempData[0].patientList.add(tempData[0].patient);
        //       }
        //       tempData = tempData[0];
        //       for (i = 0; i < tempData.recordInfo.length; i++) {
        //         for (j = 0; j < tempData.patientList.length; j++) {
        //           if (
        //             tempData.recordInfo[i].patientId.toString() ==
        //             tempData.patientList[j]._id.toString()
        //           ) {
        //             for (
        //               k = 0;
        //               k < tempData.patientList[j].recordingData.length;
        //               k++
        //             ) {
        //               if (
        //                 tempData.recordInfo[i].healthDataId.toString() ==
        //                 tempData.patientList[j].recordingData[
        //                   k
        //                 ].healthDataId.toString()
        //               ) {
        //                 tempData.patientList[j].recordingData[k].comment =
        //                   tempData.recordInfo[i].comment;
        //                 tempData.patientList[j].recordingData[k].value =
        //                   tempData.recordInfo[i].value;
        //               }
        //             }
        //           }
        //         }
        //       }
        //       console.log(tempData.patientList[1]);
        //       res.render("clinicianDashboard.hbs", { todayPatientData: tempData });
        //     } else {
        //       res.render("noRecords.hbs");
        //     }
        //   }
        // );
        console.log(testData)
        res.render('clinicianDashboard.hbs', { todayPatientData: testData })
    } catch (err) {
        return next(err)
    }
}

// const getTodayDataClinician = async (req, res, next) => {
//     try{
//         const tempDataClicianInfo = await Patient.findById(req.params.id).lean()
//     }catch(err){
//         return next(err)
//     }
//     try{
//         const tempDataPatientList = await Patient.findById(req.params.id).lean()
//     }catch(err){
//         return next(err)
//     }
//     try{
//         const tempDataHealthDataList = await Patient.findById(req.params.id).lean()
//     }catch(err){
//         return next(err)
//     }
// tempDataPatientList.map((item)=>{
//     let id = item._id;
//     let patientInfo = await ajax({patientId:id})
//     let requiredData = healthDataList.map((item)=>{
//         let upperBound = "", lowerBound = "";
//         for(dataType of patientInfo.recordingData){
//             if(dataType.healthDataId === item._id){
//                 upperBound = dataType.upperBound;
//                 lowerBound = dataType.lowerBound;
//             }
//         }
//         return {
//             healthDataId:item._id,
//             lowerBound: lowerBound,
//             upperBound: upperBound,
//             unit: item.unit,
//             isRequired: Boolean(upperBound)
//         }
//     })

//     return {recordingData:requiredData, ...item}
// })
//     if (tempData) {
//         res.render('clinicianDashboard.hbs', { todayPatientData: tempData })
//     } else {
//         res.render('noRecords.hbs')
//     }
// }

module.exports = {
    getTodayDataClinician,
}
