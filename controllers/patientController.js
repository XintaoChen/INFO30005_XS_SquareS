const Patient = require("../models/patient");
const HealthData = require("../models/healthData");
const Record = require("../models/record");
const Note = require("../models/note");
const moment = require("moment");
const mongoose = require("mongoose");

const getPatientInfo = async (req, res, next) => {
  try {
    // to retrieve patient's data
    const patientId = req.params.id;
    const patientData = await Patient.findById(patientId).lean();
    var patientDoB = moment(patientData.dateOfBirth);
    var timeNow = moment(new Date());
    const patientAge = timeNow.diff(patientDoB, "years");

    // to retrieve list of health data with their units
    const untrackedHealthDataList = await HealthData.find({}, "dataName unit");
    const healthDataList = (await HealthData.find()).map((item) => {
      let dataMatched = patientData.recordingData.find((data) => {
        return (
          data.healthDataId.toString() === item._id.toString() &&
          data.isRequired !== false
        );
      });
      return {
        healthDataId: item._id,
        dataName: item.dataName,
        unit: item.unit,
        upperBound:
          dataMatched !== undefined ? dataMatched.upperBound : undefined,
        lowerBound:
          dataMatched !== undefined ? dataMatched.lowerBound : undefined,
        isRequired: dataMatched !== undefined ? true : false,
      };
    });

    // to retrieve list of clinician notes, sorted in descending order
    const untrackedNoteList = await Note.find({ patientId }, "note date");
    let noteList = untrackedNoteList.map((singleNote) => {
      var formattedDate = moment(singleNote.date).format("YYYY/MM/DD");
      var formattedTime = moment(singleNote.date).format("HH:mm:ss");

      return {
        note: singleNote.note,
        dateTime: singleNote.date,
        date: formattedDate,
        time: formattedTime,
      };
    });
    const sortedNoteList = noteList.sort(
      (objA, objB) => objB.dateTime - objA.dateTime
    );

    // to retrieve patient's data threshold and isRequired state
    let dataList = await Promise.all(
      untrackedHealthDataList.map(async (dataType) => {
        let healthDataId = dataType._id;
        let healthDataMatched = patientData.recordingData.find((item) => {
          return (
            item.healthDataId.toString() == healthDataId.toString() &&
            item.isRequired != false
          );
        });
        let { upperBound, lowerBound } = healthDataMatched || {};
        let { dataName, unit } = dataType;
        let isRequired = healthDataMatched ? true : false;
        let value = undefined;
        let comment = undefined;
        let date = undefined;
        if (isRequired) {
          let record = await Record.findOne({
            patientId: patientData._id,
            date: healthDataMatched.date,
            healthDataId: healthDataId,
          });
          if (record) {
            value = record.value;
            comment = record.comment;
            tempDate = record.date > tempDate ? record.date : tempDate;
          }
        }
        return {
          healthDataId: healthDataId,
          healthDataTitle: dataName + " (" + unit + ")",
          upperBound: upperBound,
          lowerBound: lowerBound,
          // dataName: dataName,
          // unit: unit,
          // value: value,
          // comment: comment,
          // date: date,
          isRequired: isRequired,
        };
      })
    );

    // to retrieve all of the patient's past records
    const untrackedRecordList = await Record.find(
      { patientId: patientId },
      "healthDataId value date"
    );

    let recordList = await Promise.all(
      untrackedRecordList.map(async (record) => {
        const { unit, dataName } = await HealthData.findById(
          record.healthDataId
        );
        let healthDataMatched = patientData.recordingData.find((item) => {
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

    let dailyRecordList = {};
    let healthDataNameList = healthDataList.map((item) => {
      return item.dataName;
    });
    const formmatDate = (date) =>
      `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    for (let record of recordList) {
      let index = healthDataNameList.indexOf(record.dataName);

      let fDate = formmatDate(record.date);
      if (dailyRecordList[fDate]) {
        dailyRecordList[fDate].records[index] = { ...record };
      } else {
        dailyRecordList[fDate] = {
          date: fDate,
          records: [...healthDataList],
        };
        dailyRecordList[fDate].records[index] = { ...record };
      }
    }
    let tempData = {
      patientData: patientData,
      patientAge: patientAge,
      recordList: dailyRecordList,
      dataSetting: dataList,
      noteList: sortedNoteList,
      healthDataList: healthDataList,
    };

    console.log(tempData.patientData._id);

    let temCode = JSON.stringify(tempData);

    if (patientData) {
      res.render("singlePatient.hbs", {
        singlePatientData: tempData,
        code: temCode,
        loggedin: req.isAuthenticated(),
        isPatient: false,
        pageName: "Single Patient Page"
      });
    } else {
      res.render("noRecords.hbs");
    }

    console.log();
    // const noteList = await Note.find()
    // console.log(noteList)

    // let noteList = await Promise.all(
    //     let notes = Note.find({})
    // )
  } catch (err) {
    return next(err);
  }
};

const postNewPatient = async (req, res, next) => {
  try {
    const { nameGiven, nameFamily, emailAddress, dateOfBirth } = req.body;
    const password = Math.random().toString(36).substr(2);
    const profileName = "Patient" + Math.random().toString(10).substr(2, 8);
    const clinicianId = req.user._id;

    let healthDataList = await HealthData.find({}, "");
    const recordingData = healthDataList.map((item) => {
      return {
        healthDataId: item._id,
        upperBound: "",
        lowerBound: "",
        isRequired: false,
      };
    });

    const newPatient = new Patient({
      nameGiven: nameGiven.trim(),
      nameFamily: nameFamily.trim(),
      emailAddress: emailAddress,
      dateOfBirth: new Date(dateOfBirth),
      password: password,
      recordingData: recordingData,
      clinicianId: clinicianId,
      profileName: profileName,
    });

    newPatient.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/clinician");
      }
    });
  } catch (err) {
    return next(err);
  }
};

const addNote = async (req, res) => {
  console.log("from addNote:" + req.note);

  var newNote = new Note({
    patientId: req.patientId,
    note: req.note,
  });

  newNote.save(function (err, res) {
    if (err) return console.error(err);
  });
};

const updateSupportMessage = async (req, res, next) => {
  try {
    const patientId = req.patientId;

    // console.log(update);
    await Patient.findByIdAndUpdate(
      patientId,
      { supportMessage: req.supportMessage },
      { new: true }
    ).lean();
  } catch (error) {
    console.log(error);
  }
};

const editDataSetting = async (req, res, next) => {
  try {
    const patientId = req.patientId;

    var recordingDataArray = [];
    const healthDataIdList = req.healthDataId;
    // console.log(healthDataIdList)
    console.log(req.upperbound);

    for (var i = 0; i < healthDataIdList.length; i++) {
      var upperbound = req.upperbound[i];
      var lowerbound = req.lowerbound[i];

      if (upperbound) {
        var isRequired = true;
      } else {
        isRequired = false;
      }

      var recordingData = {
        healthDataId: healthDataIdList[i],
        upperBound: upperbound,
        lowerBound: lowerbound,
        isRequired: isRequired,
      };
      recordingDataArray.push(recordingData);
    }

    console.log(recordingDataArray);

    await Patient.findByIdAndUpdate(
      patientId,
      { $set: { recordingData: recordingDataArray } },
      { new: true }
    ).lean();
  } catch (error) {
    console.log(error);
  }
};

function compare(p) {
  return function (m, n) {
    var a = m[p];
    var b = n[p];
    return b - a;
  };
}

module.exports = {
  getPatientInfo,
  postNewPatient,
  addNote,
  updateSupportMessage,
  editDataSetting,
};
