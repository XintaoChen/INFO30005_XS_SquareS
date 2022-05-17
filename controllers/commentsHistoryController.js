const Clinician = require('../models/clinician')
const Patient = require('../models/patient')
const HealthData = require("../models/healthData");
const Record = require("../models/record");



const getCommentsHistory = async (req, res, next) => {
    try {
      let recordList = [];

        const clinicianId = req.params.id;
        const untrackedHealthDataList = await HealthData.find({}, "dataName unit");
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
                  //change from findOne() to find()
                  let record = await Record.find({
                    patientId: patient._id,
                    healthDataId: healthDataId,
                  })   
                  if (record) {
                    // recordList = record
                    record.forEach((element,index) => {
                      var tempRecord = new Object();
                      // value = element.value;
                      // comment = element.comment;
                      // date = element.date;
                      // tempDate = (element.date>tempDate) ? element.date:tempDate;
                      
                      if(element.comment != ""){
                        tempRecord.comment = element.comment;
                        tempRecord.value = element.value;
                        tempRecord.date = element.date;
                        recordList.push(tempRecord);
                      }
                    });
                  }
                }
                return {
                  upperBound: upperBound,
                  lowerBound: lowerBound,
                  dataName: dataName,
                  unit: unit,
                  // value: value,
                  // comment: comment,
                  // date: date,
                  isRequired: isRequired,

                  //each oneRecordList have all history data of one data type and one patient
                  oneRecordList: recordList
                }
              })
            )
            return {
              _id: patient._id,
              nameGiven: patient.nameGiven,
              nameFamily: patient.nameFamily,
              //store all history data
              allHistoryData: dataList,

              dateLatest: tempDate
            }
          })
        )
        let tempData = {
          nameGiven: clinicianInfo.nameGiven,
          patientList: patientList,
        };
        console.log(tempData.patientList);
        tempData.patientList.sort(compare("dateLatest"))
        res.render('commentsHistory.hbs', {commentsHistoryData: tempData})
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
    getCommentsHistory
}