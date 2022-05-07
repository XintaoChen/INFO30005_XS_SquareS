// const todayHealthData = require('../models/patientHealthDataTodayModel')
const todayHealthData = require('../models/patient')

const mongoose = require('mongoose')
const patientModel = require('../models/patient')
const recordModel = require('../models/record')

const getTodayDataPatient = async (req, res, next) => {
    var today = new Date()
    try {
        // const tempDataNoRecords = await patientModel.findById(req.params.id).lean()
        let tempData = {}
        //get all required data from database
        patientModel.aggregate(
            [
                {
                    $lookup: {
                        from: 'Record',
                        pipeline: [
                            {
                                $match: {
                                    date: {
                                        // change this to current date
                                        $gte: new Date(
                                            today.getFullYear(),
                                            today.getMonth(),
                                            today.getDate()
                                        ),
                                        $lt: new Date(
                                            today.getTime() +
                                                24 * 60 * 60 * 1000
                                        ),
                                    },
                                },
                            },
                        ],
                        localField: '_id',
                        foreignField: 'patientId',
                        as: 'recordInfo',
                    },
                },
                {
                    $match: {
                        _id: mongoose.Types.ObjectId(req.params.id),
                    },
                },
            ],
            (err, docs) => {
                if (err) {
                    return console.log(err)
                }
                tempData = docs[0]
                if (tempData) {
                    //manipulate data to satisfy .hbs page data logic
                    for (i = 0; i < tempData.recordInfo.length; i++) {
                        for (j = 0; j < tempData.recordingData.length; j++) {
                            if (
                                tempData.recordInfo[
                                    i
                                ].healthDataId.toString() ==
                                tempData.recordingData[
                                    j
                                ].healthDataId.toString()
                            ) {
                                var tempTime = ''
                                tempData.recordingData[j].comment =
                                    tempData.recordInfo[i].comment
                                tempTime +=
                                    tempData.recordInfo[i].date.getHours()
                                tempTime += ':'
                                tempTime +=
                                    tempData.recordInfo[i].date.getMinutes() <
                                    10
                                        ? '0' +
                                          tempData.recordInfo[
                                              i
                                          ].date.getMinutes()
                                        : tempData.recordInfo[
                                              i
                                          ].date.getMinutes()
                                tempData.recordingData[j].time = tempTime
                                tempData.recordingData[j].value =
                                    tempData.recordInfo[i].value
                            }
                        }
                    }
                    console.log(JSON.stringify(tempData))
                    res.render('patientDashboard.hbs', {
                        todayHealthData: tempData,
                        loggedin: req.isAuthenticated()
                    })
                } else {
                    // if (tempDataNoRecords) {
                    //     res.render('singlePatient.hbs', { todayHealthData: tempDataNoRecords })
                    // } else {
                    res.render('noRecords.hbs')
                    // }
                }
            }
        )
    } catch (err) {
        return next(err)
    }
}

const postTodayDataPatient = (req) => {
    var Record = require('../models/record')
    var tempRecord = new Record({
        comment: req.comment,
        // "date": "2022-04-24T13:00:00.000+00:00",
        value: req.value,
        patientId: req.patientId,
        healthDataId: req.healthDataId,
        clinicianId: req.clinicianId,
    })
    tempRecord.save(function (err, res) {
        if (err) return console.error(err)
        console.log(res.value + ' saved to db.')
    })
}

module.exports = {
    getTodayDataPatient,
    postTodayDataPatient,
}
