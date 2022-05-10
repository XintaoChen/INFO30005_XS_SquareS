const Clinician = require("../models/clinician");
const Patient = require("../models/patient");
const HealthData = require("../models/healthData");
const Record = require("../models/record");

const getTodayDataClinician = async (req, res, next) => {
  try {
    const clinicianId = req.params.id;
    const untrackedHealthDataList = await HealthData.find({}, "dataName unit");
    let healthDataList = untrackedHealthDataList.map((healthData) => {
      return {
        healthTitle: healthData.dataName + " (" + healthData.unit + ")",
      };
    });
    const clinicianInfo = await clinicianToday.findById(clinicianId);
    if (!clinicianInfo) {
      res.render("noRecords.hbs");
    }
    const untrackedPatientList = await Patient.find(
      { clinicianId: clinicianId },
      "nameGiven nameFamily recordingData"
    );
    let patientList = await Promise.all(
      untrackedPatientList.map(async (patient) => {
        let dataList = await Promise.all(
          untrackedHealthDataList.map(async (dataType) => {
            let healthDataId = dataType._id;
            let healthDataMatched = patient.recordingData.find((item) => {
              return (
                item.healthDataId.toString() == healthDataId.toString() &&
                item.recordingData != false
              );
            });
            let { upperBound, lowerBound } = healthDataMatched || {};
            let { dataName, unit } = dataType;
            let isRequired = upperBound ? true : false;
            let value = undefined;
            if (isRequired) {
              let record = await Record.findOne({
                patientId: patient._id,
                date: {
                  $gte: new Date("2022,04,24"),
                  $lt: new Date("2022,04,25"),
                },
                healthDataId: healthDataId,
              });
              if (record) {
                value = record.value;
              }
            }
            return {
              upperBound: upperBound,
              lowerBound: lowerBound,
              dataName: dataName,
              unit: unit,
              value: value,
              isRequired: isRequired,
            };
          })
        );
        return {
          nameGiven: patient.nameGiven,
          nameFamily: patient.nameFamily,
          recordingData: dataList,
        };
      })
    );
    let testData = {
      nameGiven: clinicianInfo.nameGiven,
      nameFamily: clinicianInfo.nameFamily,
      welcomeMessage: clinicianInfo.welcomeMessage,
      patientList: patientList,
      healthDataList: healthDataList,
    };
    console.log(testData);
    res.render("clinicianDashboard.hbs", { todayPatientData: testData });
  } catch (err) {
    return next(err);
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
  getTodayDataClinician,
};
