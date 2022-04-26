const Record = require("../models/record");
const HealthData = require("../models/healthData");
const Patient = require("../models/patient");
const Clinician = require("../models/clinician");

const getOneRecordBypatientId = async (req, res) => {
  try {
    const { patientId, date, healthDataId } = req.query;
    let nDate = new Date(date);
    let thisDate = new Date(nDate.getFullYear(),nDate.getMonth(),nDate.getDate(),0,0,0)
    let nextDate = new Date(nDate.getFullYear(),nDate.getMonth(),nDate.getDate(),23,59,59)
    
    const record = await Record.findOne(
      {
        patientId: patientId,
        date: {"$gte":thisDate, "$lte":nextDate},
        healthDataId: healthDataId,
      }
    );
    if (record) {
      let { unit,dataName } = await HealthData.findById(healthDataId);
      let { _id, value, date } = record;
      const data = { _id,dataName, value, unit, date };
      res.json({
        status: 0,
        data: data,
      });
    } else {
      res.json({
        status: 1,
        msg: "record not yet filled",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const getCommentList = async (req, res) => {
  try {
    const { clinicianId } = req.query;
    const pageNum = Number(req.query.pageNum);
    const pageSize = Number(req.query.pageSize);

    const total = await Record.find({
      clinicianId: clinicianId,
    }).countDocuments();
    const records = await Record.find({ clinicianId: clinicianId })
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize);
    if (!records) {
      res.json({
        status: 1,
        msg: "error",
      });
    } else {
      const data = await Promise.all(
        records.map(async (record) => {
          const { profileName } = await Patient.findById(record.patientId);
          const { dataName, unit } = await HealthData.findById(
            record.healthDataId
          );
          return {
            patientId: record.patientId,
            patientName: profileName,
            dataType: dataName,
            value: record.value,
            unit: unit,
            comment: record.comment,
            date: record.date,
          };
        })
      );
      res.json({
        status: 0,
        total: total,
        data: data,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const postUpdateRecord = async (req, res) => {
  try {

    const {patientId, healthDataId, value, comment} = req.body;

    const patient = await Patient.findById(patientId);
    let n = new Date;
    console.log(n.valueOf())
    const newRecord = new Record({
      patientId: patientId,
      healthDataId: healthDataId,
      clinicianId: patient.clinicianId,
      // date: Date.now(),
      value: value,
      comment: comment
    }) 

    newRecord.save((err)=>{
      if(err){
        res.json({
          status:1,
          msg:err
        })
      } else{
        res.json({
          status: 0
        });
      }
    })

    

  } catch (err) {
    console.log(err)
  }

}

module.exports = { getOneRecordBypatientId, getCommentList, postUpdateRecord };
