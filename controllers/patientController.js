// const patientData = require('../models/patientModel')
const { redirect } = require("express/lib/response");
const Patient = require("../models/patient");

// const getPatientInfo = (req, res) => {
//     const tempData = patientData.find((data) => data.id === req.params.id)
//     if (tempData) {
//         res.render('singlePatient.hbs', { singlePatientData: tempData })
//     } else {
//         res.render('noRecords.hbs')
//     }
// }

const getPatientInfo = async (req, res, next) => {
  try {
    const tempData = await Patient.findById(req.user._id).lean();
    if (tempData) {
      res.render("singlePatient.hbs", {
        singlePatientData: tempData,
        loggedin: req.isAuthenticated(),
        isPatient: true,
        pageName: "My Health Data Record"
      });
    } else {
      res.render("noRecords.hbs");
    }
  } catch (err) {
    return next(err);
  }
};

const postNewPatient = async (req, res, next) => {
  try {
    const { nameGiven, nameFamily, emailAddress, dateOfBirth } = req.body;
    const password = Math.random().toString(36).substr(2);
    const profileName = "Patient" + Math.random().toString(10).substr(2, 8);
    const clinicianId = req.user._id;

    const newPatient = new Patient({
      nameGiven: nameGiven,
      nameFamily: nameFamily,
      emailAddress: emailAddress,
      dateOfBirth: dateOfBirth,
      password: password,
      clinicianId: clinicianId,
      profileName: profileName,
    });

    newPatient.save((err) => {
      if (err) {
        console.log(err);
      } else {
        redirect("/clinician");
      }
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getPatientInfo,
  postNewPatient,
};
