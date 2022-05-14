const mongoose = require('mongoose')
const moment = require('moment');
const Patient = require('../models/patient')
const Record = require('../models/record')


const updateLeaderBoard = async () => {
    const lastMonday = moment().subtract(1, 'weeks').startOf('isoWeek');
    const lastSunday = moment().subtract(1, 'weeks').endOf('isoWeek');
    const thisMonday = moment().startOf('isoWeek');


    const patientIds = await Patient.find().distinct('_id')
    const engRate = []


    for (const id of patientIds) {


        const profileName = await Patient.findById(id).distinct('profileName')
        const timeStamp = id.getTimestamp();
       // const formatted = moment(timeStamp).format('L');
        const numDays = thisMonday.diff(moment(timeStamp), 'days') + 1;
        
        const records = await Record.aggregate([
            {$match: {patientId : id, date : {$lte: new Date(lastSunday)} }},
            {$group: { _id: {$dateToString: { format: "%Y-%m-%d", date: "$date" }}, count: {$sum: 1}}}
        ])

        const recordDays = records.length;
        const engagementRate = recordDays/numDays * 100;
        const engRateSinglePatient = {patientId : id, profileName : profileName, engagementRate : engagementRate}

        engRate.push(engRateSinglePatient);

    }

    console.log(engRate);

    return engRate;

}

module.exports = {
    updateLeaderBoard
}
