const Patient = require("../models/patient");
const HealthData = require("../models/healthData");

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


module.exports = { getDataTypesByPatientId };
