// const todayHealthData = require('../models/patientHealthDataTodayModel')
const todayHealthData = require("../models/patient");

const mongoose = require("mongoose");
const patientModel = require("../models/patient");
const Record = require("../models/record");
const HealthData = require("../models/healthData");

const getTodayDataPatient = async (req, res, next) => {
  var today = new Date();
  try {
    // const tempDataNoRecords = await patientModel.findById(req.params.id).lean()
    let tempData = {};
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
        tempData = docs[0];
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
                tempTime += tempData.recordInfo[i].date.getHours();
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
  const {comment, value, healthDataId, clinicianId} = req.body;
  const {_id} = req.user
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
  res.redirect('/patient/today/')
};


const getDataAnalysis = async (req, res) => {
  try {
    const patientId = req.user._id;
    // 62554eb9bcd6f0a12a5e5f52
    const date = new Date();
    const time = date.getTime();
    const day = date.getDay();
    const oneDayTime = 24 * 60 * 60 * 1000;
    let startOfThisWeek = time - day * oneDayTime;
    const untrackedRecordList = await Record.find(
      {
        patientId: patientId,
        date: {
          $gte: startOfThisWeek,
          $lt: startOfThisWeek + 7 * oneDayTime,
        },
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
      `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`;

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
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getTodayDataPatient,
  postTodayDataPatient,
  getDataAnalysis,
}
