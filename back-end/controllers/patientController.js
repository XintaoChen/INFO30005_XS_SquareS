const Patient = require("../models/patient");
const HealthData = require("../models/healthData");

const getPatientList = async (req, res) => {
  try {
    const { clinicianId } = req.query;
    const pageNum = Number(req.query.pageNum);
    const pageSize = Number(req.query.pageSize);

    const total = await Patient.find({
      clinicianId: clinicianId,
    }).countDocuments();
    const patients = await Patient.find(
      { clinicianId: clinicianId },
      "profileName"
    )
      .skip((pageNum - 1) * pageSize)
      .limit(pageSize);
    if (!patients) {
      res.json({
        status: 1,
        msg: "error",
      });
    } else {
      res.json({
        status: 0,
        total: total,
        data: patients,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const getDataTypesByPatientId = async (req, res) => {
  try {
    const { patientId } = req.query;

    const patient = await Patient.findById(patientId, "recordingData");
    if (!patient) {
      res.json({
        status: 1,
        msg: "Error! No data found!",
      });
    }
    const list = await Promise.all(
      patient.recordingData.map(async (dataType) => {
        let healthDataId = dataType.healthDataId;
        let { upperBound, lowerBound } = dataType;
        let { dataName, unit } = await HealthData.findById(healthDataId);
        return {
          upperBound: upperBound,
          lowerBound: lowerBound,
          dataName: dataName,
          unit: unit,
        };
      })
    );
    res.json({
      status: 0,
      data: list,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getDataTypesByPatientId, getPatientList };
