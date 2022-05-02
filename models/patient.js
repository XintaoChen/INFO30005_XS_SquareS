const mongoose = require("mongoose");
const Clinician = require("./clinician");
const HealthData = require("./healthData");

const patientSchema = new mongoose.Schema({
  emailAddress: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  nameFamily: { type: String, required: true },
  nameGiven: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  clinicianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Clinician,
    required: true,
  },
  phoneNumber: String,
  homeAddress: String,
  profileName: String,
  recordingData: [
    {
      healthDataId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: HealthData,
        required: true,
      },
      upperBound: Number,
      lowerBound: Number,
      isRequired: Boolean,
    },
  ],
  profilePhoto: Buffer,
  briefTextBio: String,
  supportMessage: String,
});

const Patient = mongoose.model("Patient", patientSchema, "Patient");

module.exports = Patient;
