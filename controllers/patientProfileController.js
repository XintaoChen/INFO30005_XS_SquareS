const Patient = require("../models/patient");
const moment = require("moment");

const getPatientProfile = async (req, res, next) => {
  try {
    const patientId = req.user._id;
    const patient = await Patient.findById(patientId).lean();
    if (!patient) {
      res.redirect("/login");
    }
    var formattedDate = moment(patient.dateOfBirth).format("DD/MM/YYYY");
    patient.dateOfBirth = formattedDate;

    res.render("patientProfile.hbs", {
      patientData: patient,
      loggedin: req.isAuthenticated(),
      isPatient: true,
      pageName: "My Profile",
    });
  } catch (err) {
    console.log(err);
  }
};

const updatePatientProfile = async (req, res, next) => {
  try {
    const filter = { _id: req.user._id };
    Patient.findOne(filter).then(async (doc) => {
      doc.profileName = req.body.profileName;
      doc.phoneNumber = req.body.phoneNumber;
      doc.homeAddress = req.body.homeAddress;
      doc.briefTextBio = req.body.briefTextBio;
      doc.password = req.body.password ? req.body.password : doc.password;
      doc.save();
      if (req.body.password) {
        res.redirect("/login");
      } else {
        res.redirect("/patient/profile");
      }
    });
  } catch (error) {
    console.log("err");
    res.redirect("/login");
  }
};

module.exports = { getPatientProfile, updatePatientProfile };
