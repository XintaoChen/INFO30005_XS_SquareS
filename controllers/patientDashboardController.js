// const todayHealthData = require('../models/patientHealthDataTodayModel')
const todayHealthData = require("../models/patient");
const mongoose = require("mongoose");
const patientModel = require("../models/patient");
const Record = require("../models/record");
const HealthData = require("../models/healthData");
const moment = require("moment");

const getTodayDataPatient = async (req, res, next) => {
  var today = new Date();
  const patientId = req.user._id;
  try {
    // const tempDataNoRecords = await patientModel.findById(req.params.id).lean()
    const engagementRate = await updateEngagementRate(patientId);
    const leaderBoard = await updateLeaderBoard();
    let tempData = { leaderBoard: leaderBoard };
    //get all required data from database
    patientModel.aggregate(
      [
        {
          $lookup: {
            from: "Record",
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
                    $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
                  },
                },
              },
            ],
            localField: "_id",
            foreignField: "patientId",
            as: "recordInfo",
          },
        },
        {
          $match: {
            _id: mongoose.Types.ObjectId(req.user._id),
          },
        },
      ],
      (err, docs) => {
        if (err) {
          return console.log(err);
        }

        let tempData = docs[0];
        tempData.leaderBoard = leaderBoard;

        if (tempData) {
          //manipulate data to satisfy .hbs page data logic
          for (i = 0; i < tempData.recordInfo.length; i++) {
            for (j = 0; j < tempData.recordingData.length; j++) {
              if (
                tempData.recordInfo[i].healthDataId.toString() ==
                tempData.recordingData[j].healthDataId.toString()
              ) {
                var tempTime = "";
                tempData.recordingData[j].comment =
                  tempData.recordInfo[i].comment;
                tempTime +=
                  tempData.recordInfo[i].date.getHours() < 10
                    ? "0" + tempData.recordInfo[i].date.getHours()
                    : tempData.recordInfo[i].date.getHours();
                tempTime += ":";
                tempTime +=
                  tempData.recordInfo[i].date.getMinutes() < 10
                    ? "0" + tempData.recordInfo[i].date.getMinutes()
                    : tempData.recordInfo[i].date.getMinutes();
                tempData.recordingData[j].time = tempTime;
                tempData.recordingData[j].value = tempData.recordInfo[i].value;
              }
            }
          }
          console.log(JSON.stringify(tempData));
          res.render("patientDashboard.hbs", {
            todayHealthData: tempData,
            loggedin: req.isAuthenticated(),
            isPatient: true,
            pageName: "My Dashboard",
          });
        } else {
          res.redirect("/login");
        }
      }
    );
  } catch (err) {
    return next(err);
  }
};

const postTodayDataPatient = (req, res) => {
  const { comment, value, healthDataId, clinicianId } = req.body;
  const { _id } = req.user._id;
  var Record = require("../models/record");
  var tempRecord = new Record({
    comment: comment,
    value: value,
    patientId: _id,
    healthDataId: healthDataId,
    clinicianId: clinicianId,
  });
  tempRecord.save(function (err, res) {
    if (err) return console.error(err);
    console.log(res.value + " saved to db.");
  });
  res.redirect("/patient/today/");
};

async function updateEngagementRate(id) {
  const yesterday = moment().subtract(1, "days").endOf("day");
  const patientId = mongoose.Types.ObjectId(id);
  const timeStamp = patientId.getTimestamp();

  const totalDays = yesterday.diff(moment(timeStamp), "days") + 1;
  var engRateBool = false;

  const records = await Record.aggregate([
    { $match: { patientId: patientId, date: { $lte: new Date(yesterday) } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        count: { $sum: 1 },
      },
    },
  ]);

  const recordDays = records.length;
  const engagementRate = ((recordDays / totalDays) * 100).toFixed(1);

  if (engagementRate >= 80) {
    engRateBool = true;
  }

  console.log(engRateBool);

  const update = {
    engagementRate: engRateBool,
  };
  const result = await patientModel.findByIdAndUpdate(id, update, { new: true });
}

async function updateLeaderBoard() {
  //Get yesterday's date
  const yesterday = moment().subtract(1, "days").endOf("day");

  //Get all patientIds in mongoDB
  const patientIds = await patientModel.find().distinct("_id");

  //Create an array to store all engagementRates of patients
  let engRate = [];

  for (const id of patientIds) {
    //Get profileName of the current patient
    const profileName = await patientModel.findById(id).distinct("profileName");
    //Retrive date that patient's account was created (first date)
    const timeStamp = id.getTimestamp();
    //Calculate number of days between registered day and yesterday
    const numDays = yesterday.diff(moment(timeStamp), "days") + 1;

    //Get all of this patient's records that were recorded before yesterday
    //Group the retrieved records by date
    const records = await Record.aggregate([
      { $match: { patientId: id, date: { $lte: new Date(yesterday) } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          count: { $sum: 1 },
        },
      },
    ]);
    //Calculate the number of days this patient recorded data
    const recordDays = records.length;

    //Get engagementRate by numRecordDays/numRegisteredDays
    const engagementRate = ((recordDays / numDays) * 100).toFixed(1);
    const engRateSinglePatient = {
      patientId: id,
      profileName: profileName.toString(),
      engagementRate: engagementRate,
    };
    engRate.push(engRateSinglePatient);
  }

  //Sort array by engagementRate in dsecnding order
  engRate.sort((x, y) => y.engagementRate - x.engagementRate);
  //Get top 5 engagementRate
  leaderBoardEngRate = engRate.slice(0, 5);
  
  return leaderBoardEngRate;
}

const getDataAnalysis = async (req, res) => {
  try {
    const patientId = req.user._id;
    // 62554eb9bcd6f0a12a5e5f52
    const date = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
    const untrackedRecordList = await Record.find(
      {
        patientId: patientId,
      },
      "healthDataId value comment date"
    );

    const patient = await patientModel.findById(patientId, "recordingData");
    const healthDataList = (await HealthData.find()).map((item) => {
      let dataMatched = patient.recordingData.find((data) => {
        return (
          data.healthDataId.toString() === item._id.toString() &&
          data.isRequired !== false
        );
      });
      return {
        healthDataId: item._id,
        dataName: item.dataName,
        unit: item.unit,
        isRequired: dataMatched !== undefined ? true : false,
      };
    });
    const recordList = await Promise.all(
      untrackedRecordList.map(async (record) => {
        const { unit, dataName } = await HealthData.findById(
          record.healthDataId
        );
        let healthDataMatched = patient.recordingData.find((item) => {
          return (
            item.healthDataId.toString() == record.healthDataId.toString() &&
            item.isRequired != false
          );
        });
        let upperBound = undefined,
          lowerBound = undefined;
        if (healthDataMatched) {
          upperBound = healthDataMatched.upperBound;
          lowerBound = healthDataMatched.lowerBound;
        }

        return {
          dataName: dataName,
          unit: unit,
          value: record.value,
          comment: record.comment,
          date: record.date,
          upperBound: upperBound,
          lowerBound: lowerBound,
        };
      })
    );

    const formmatDate = (date) =>
      `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

    let hashMap = {};
    let healthDataNameList = healthDataList.map((item) => {
      return item.dataName;
    });

    for (let record of recordList) {
      let index = healthDataNameList.indexOf(record.dataName);

      let fDate = formmatDate(record.date);
      if (hashMap[fDate]) {
        hashMap[fDate].records[index] = { ...record };
      } else {
        hashMap[fDate] = {
          date: fDate,
          records: [...healthDataList],
        };
        hashMap[fDate].records[index] = { ...record };
      }
    }
    console.log(hashMap);
    const data = JSON.stringify({
      weeklyData: hashMap,
      healthDataList: healthDataList,
    });
    res.render("patientDataAnalysis.hbs", {
      code: data,
      weeklyData: hashMap,
      healthDataList: healthDataList,
      loggedin: req.isAuthenticated(),
      isPatient: true,
      pageName: "My Health Data Record",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getTodayDataPatient,
  postTodayDataPatient,
  getDataAnalysis,
};
