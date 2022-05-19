const Clinician = require("../models/clinician");
const Patient = require("../models/patient");
const HealthData = require("../models/healthData");
const Record = require("../models/record");

const getTodayDataClinician = async (req, res, next) => {
    try {
        const clinicianId = req.user._id;
        const untrackedHealthDataList = await HealthData.find({}, "dataName unit");
        let healthDataList = untrackedHealthDataList.map((healthData) => {
          return {
            healthTitle: healthData.dataName + " (" + healthData.unit + ")",
          }
        })
        const clinicianInfo = await Clinician.findById(clinicianId)
        if (!clinicianInfo) {
          // res.render("noRecords.hbs")
          res.redirect("/login");
        }
    
        const untrackedPatientList = await Patient.find(
          { clinicianId: clinicianId },
          "nameGiven nameFamily recordingData"
        );
        let patientList = await Promise.all(
          untrackedPatientList.map(async (patient) => {
            let tempDate = new Date(2000,01,01);
            let dataList = await Promise.all(
              untrackedHealthDataList.map(async (dataType) => {
                let healthDataId = dataType._id
                let healthDataMatched = patient.recordingData.find((item) => {
                  return (
                    item.healthDataId.toString() == healthDataId.toString() &&
                    item.isRequired != false
                  )
                })
                let { upperBound, lowerBound } = healthDataMatched || {};
                let { dataName, unit } = dataType;
                let isRequired = healthDataMatched ? true : false
                let value = undefined;
                let comment = undefined;
                let date = undefined;
                if (isRequired) {
                  let nDate = new Date();
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
                        startOfToday.getTime() + 24 * 60 * 60 * 1000
                      )
                    },
                    healthDataId: healthDataId,
                  })
                  if (record) {
                    value = record.value;
                    comment = record.comment;
                    date = record.date;
                    tempDate = (record.date>tempDate) ? record.date:tempDate;
                  }
                }
                return {
                  upperBound: upperBound,
                  lowerBound: lowerBound,
                  dataName: dataName,
                  unit: unit,
                  value: value,
                  comment: comment,
                  date: date,
                  isRequired: isRequired
                }
              })
            )
            return {
              patientId: patient._id,
              nameGiven: patient.nameGiven,
              nameFamily: patient.nameFamily,
              recordingData: dataList,
              dateLatest: tempDate
            }
          })
        )
        let tempData = {
          nameGiven: clinicianInfo.nameGiven,
          patientList: patientList,
          healthDataList: healthDataList,
        };
        console.log(tempData.patientList);
        tempData.patientList.sort(compare("dateLatest"))
        res.render('clinicianDashboard.hbs', 
        { clinicianDashboardData: tempData,
          loggedin: req.isAuthenticated(),
          isPatient: false,
          pageName: "Clinician Dashboard"
        })
    } catch (err) {
        return next(err)
    }
}

function compare(p){
  return function(m,n){
      var a = m[p];
      var b = n[p];
      return b - a; 
  }
}

module.exports = {
    getTodayDataClinician,
}
