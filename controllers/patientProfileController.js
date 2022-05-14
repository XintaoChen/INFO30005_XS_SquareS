const Patient = require('../models/patient')
const moment = require('moment');

  const getPatientProfile = async (req, res, next) => {
    try {
        const patientId = req.params.id;
        const patient = await Patient.findById(patientId).lean();
        if (!patient) {
            console.log(err);
        }
        var formattedDate = moment(patient.dateOfBirth).format('DD/MM/YYYY');
        patient.dateOfBirth = formattedDate;

        res.render('patientProfile.hbs', {
            patientData : patient
        });
    
    } catch (err) {
        console.log(err);
    }
  };

    const updatePatientProfile = async (req, res, next) => {
        try {
            const patientId = req.body.patientId;

            console.log(req.body);
            const updates = {
                phoneNumber: req.body.phoneNumber,
                homeAddress: req.body.homeAddress,
                password: req.body.password,
                briefTextBio: req.body.briefTextBio,
            }

            const result = await Patient.findByIdAndUpdate(patientId, updates, { new : true }).lean();

        } catch (error) {
            console.log("err");
        }
        
    }


  module.exports = { getPatientProfile, updatePatientProfile };