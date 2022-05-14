// const todayHealthData = require('../models/patientHealthDataTodayModel')
const todayHealthData = require('../models/patient')
const mongoose = require('mongoose')
const moment = require('moment');
const patientModel = require('../models/patient')
const recordModel = require('../models/record')

const getTodayDataPatient = async (req, res, next) => {
    var today = new Date()
    try {
        // const tempDataNoRecords = await patientModel.findById(req.params.id).lean()
        const leaderBoard = await updateLeaderBoard();
        let tempData = {leaderBoard : leaderBoard} 
        
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
                    tempData["leaderBoard"] = leaderBoard;
                    console.log(JSON.stringify(tempData))
                    res.render('patientDashboard.hbs', {
                        todayHealthData: tempData,
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
    console.log(req.body);
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

async function updateLeaderBoard() {
    //Get last Sunday's and this Monday's dates
    const lastSunday = moment().subtract(1, 'weeks').endOf('isoWeek');
    const thisMonday = moment().startOf('isoWeek');

    //Get all patientIds in mongoDB
    const patientIds = await patientModel.find().distinct('_id')

    //An array to store all engagementRates of patients
    let engRate = []

    for (const id of patientIds) {
        //Get profileName of this patient
        const profileName = await patientModel.findById(id).distinct('profileName')
        //Retrive date that patient's account was created (first date)
        const timeStamp = id.getTimestamp();
        //Calculate number of days between registered day and thisMonday
        const numDays = thisMonday.diff(moment(timeStamp), 'days') + 1;

        //Calculate the number of days this patient recorded data
        //Get all of this patient's records that were recorded before thisMonday
        //Group the retrieved records by date
        const records = await recordModel.aggregate([
            {$match: {patientId : id, date : {$lte: new Date(lastSunday)} }},
            {$group: { _id: {$dateToString: { format: "%Y-%m-%d", date: "$date" }}, count: {$sum: 1}}}
        ])

        //Calculate the number of days this patient recorded data
        const recordDays = records.length;

        //Get engagementRate by numRecordDays/numRegisteredDays
        const engagementRate = (recordDays/numDays * 100).toFixed(1);
        const engRateSinglePatient = {patientId : id, profileName : profileName.toString(), engagementRate : engagementRate}
        engRate.push(engRateSinglePatient);

    }

    //Sort array by engagementRate in dsecnding order
    engRate.sort((x,y) => y.engagementRate - x.engagementRate);
    //Get top 5 engagementRate
    leaderBoardEngRate = engRate.slice(0, 5)

    return leaderBoardEngRate;

}


module.exports = {
    getTodayDataPatient,
    postTodayDataPatient,
}
