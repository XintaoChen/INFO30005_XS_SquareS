const mongoose = require("mongoose");
const Clinician = require("./clinician");
const HealthData = require("./healthData");

const bcrypt = require('bcryptjs')

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


// Password comparison function
// Compares the provided password with the stored password
// Allows us to call user.verifyPassword on any returned objects 
patientSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, valid) => {
        callback(err, valid)
    })
}
// Password salt factor
const SALT_FACTOR = 10
// Hash password before saving
patientSchema.pre('save', function save(next) {
    const user = this
    // Go to next if password field has not been modified 
    if (!user.isModified('password')) {
        return next()
    }
    // Automatically generate salt, and calculate hash
    bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
        if (err) {
            return next(err)
        }
        // Replace password with hash
        user.password = hash
        next()
    })
})


const Patient = mongoose.model('Patient', patientSchema, 'Patient')
module.exports = Patient
