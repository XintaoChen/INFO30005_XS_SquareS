const mongoose = require("mongoose");
const Patient = require("./patient");
const HealthData = require("./healthData");
const Clinician = require("./clinician");
const recordSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Patient,
      required: true,
      unique: true,
    },
    healthDataId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: HealthData,
      required: true,
    },
    clinicianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Clinician,
      required: true,
    },
    value: { type: Number, required: true, min: 0 },
    comment: { type: String, maxlength: 100 },
  },
  { timestamps: { createdAt: "date" , updatedAt:false} }
);

const Record = mongoose.model("Record", recordSchema, "Record");
module.exports = Record;
