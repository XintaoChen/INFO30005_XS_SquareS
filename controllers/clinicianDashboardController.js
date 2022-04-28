const Clinician = require('../models/clinician')
const Patient = require('../models/patient')
const HealthData = require("../models/healthData");
const Record = require("../models/record");

const getTodayDataClinician = async (req, res, next) => {
    try {
        const clinicianId = req.params.id;
        const untrackedHealthDataList = await HealthData.find({}, "dataName unit");
        let healthDataList = untrackedHealthDataList.map((healthData) => {
          return {
            healthTitle: healthData.dataName + " (" + healthData.unit + ")",
          }
        })
        const clinicianInfo = await Clinician.findById(clinicianId)
        if (!clinicianInfo) {
          res.render("noRecords.hbs")
        }
    
        const untrackedPatientList = await Patient.find(
          { clinicianId: clinicianId },
          "nameGiven nameFamily recordingData"
        );
        let patientList = await Promise.all(
          untrackedPatientList.map(async (patient) => {
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
        let tempData = {
          nameGiven: clinicianInfo.nameGiven,
          patientList: patientList,
          healthDataList: healthDataList,
        };
        console.log(tempData.patientList[0]);
        res.render('clinicianDashboard.hbs', { clinicianDashboardData: tempData})
    } catch (err) {
        return next(err)
    }
}


module.exports = {
    getTodayDataClinician,
}
