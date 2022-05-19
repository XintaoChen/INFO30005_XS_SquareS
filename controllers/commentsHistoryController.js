const Clinician = require('../models/clinician')
const Patient = require('../models/patient')
const HealthData = require("../models/healthData");
const Record = require("../models/record");
var mongoose = require('mongoose');


const getCommentsHistory = async (req, res, next) => {
    try {
      let recordList = [];
        const filterId = req.query.filterId;

        const clinicianId = req.user._id;
        const untrackedHealthDataList = await HealthData.find({}, "dataName unit");
        const clinicianInfo = await Clinician.findById(mongoose.Types.ObjectId(clinicianId))
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
                      if(element.comment != ""){
                        tempRecord.patientId = patient._id;
                        tempRecord.nameGiven = patient.nameGiven,
                        tempRecord.nameFamily = patient.nameFamily,
                        tempRecord.upperBound = upperBound,
                        tempRecord.lowerBound = lowerBound,
                        tempRecord.dataName = dataName,
                        tempRecord.unit = unit,
                        tempRecord.isRequired = isRequired,
                        tempRecord.comment = element.comment;
                        tempRecord.value = element.value;
                        tempRecord.date = dtFormat(element.date);
                        recordList.push(tempRecord);
                      }
                    });
                  }
                }
                return {}
              })
            )
            return {
              _id: patient._id.toString(),
              nameGiven: patient.nameGiven,
              nameFamily: patient.nameFamily,
              dateLatest: tempDate
            }
          })
        )
        let tempData = {
          nameGiven: clinicianInfo.nameGiven,
          patientList: patientList,
        };
        tempData.patientList.sort(compare("dateLatest"))
        //store all history data
        tempData.allHistoryData = filterByPId(filterId, recordList)
        console.log(tempData)
        res.render('commentsHistory.hbs', {
          commentsHistoryData: tempData,              
          allHistoryData: recordList,
          loggedin: req.isAuthenticated(),
          isPatient: false,        
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

function filterByPId(id, list){
  var tempList = []
  if(id == "" || id == undefined){
    return list;
  }else{
    list.forEach((Element)=>{
      if(Element.patientId.toString() == id){
        tempList.push(Element);
      }
    })
    return tempList;
  }
}

function dtFormat(unformatDate) {
  date = new Date(unformatDate);
  year = date.getFullYear();
  month = ((date.getMonth() + 1) < 10 ) ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  day = (date.getDate() < 10 ) ? "0" + date.getDate() : date.getDate();
  hour = (date.getHours() < 10 ) ? "0" + date.getHours() : date.getHours();
  minute = (date.getMinutes() < 10 ) ? "0" + date.getMinutes() : date.getMinutes();
  formatDate = hour + ":" + minute + ", " + day + "/" + month + "/" + year
  return formatDate;
}

module.exports = {
    getCommentsHistory
}