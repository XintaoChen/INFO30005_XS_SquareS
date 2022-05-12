const mongoose = require('mongoose')
const moment = require('moment');
const patientModel = require('../models/patient')
const recordModel = require('../models/record')

const updateLeaderBoard = async (req, res, next) => {

    const lastMonday = moment().subtract(1, 'weeks').startOf('isoWeek');
    const thisMonday = moment().startOf('isoweek');
    const lastSunday = moment().subtract(1, 'weeks').endOf('isoWeek');
    const totalDaysInWeek = 7;

    console.log(lastMonday);
    console.log(lastSunday);
    console.log(thisMonday);

    const patientIds = await patientModel.find().distinct('_id')

    console.log(patientIds);


    for (const id of patientIds) {
        var patientId = id;
        var numRecordDays = 0;


        async.forEach(function(err, patientId) {

            for (var thisDate = lastMonday; thisDate.isBefore(thisMonday); thisDate.add(1, 'days')) {

                const check =  await recordModel.find( {patientId: patientId, date: {$gte: thisDate, $lte: thisDate.endOf('day')}}).count().exec();
                console.log(thisDate);
                console.log(patientId);
                console.log(check);
    
            }

        }

    }




 
}
    

module.exports = {
    updateLeaderBoard
}