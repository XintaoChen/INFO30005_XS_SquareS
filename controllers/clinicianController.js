const Clinician = require('../models/clinician')

  const getClinicianProfile = async (req, res, next) => {
    try {
        const clinicianId = req.user._id;
        const clinician = await Clinician.findById(clinicianId).lean();
        if (!clinician) {
            console.log(err);
        }
        console.log(clinician);
        res.render('patientProfile.hbs', {
            clinicianData : clinician,
            loggedin: req.isAuthenticated(),
            isPatient: false,
            pageName: "Clinician Profile"
        });
    
    } catch (err) {
        console.log(err);
    }
  };

    const updateClinicianProfile = async (req, res, next) => {
        try {
            const filter = { _id: req.user._id };
            Clinician.findOne(filter).then(async (doc) => {
                doc.clinicNumber = req.body.clinicNumber;
                doc.clinicAddress = req.body.clinicAddress;
                doc.briefTextBio = req.body.briefTextBio;
                doc.password = req.body.password;
                doc.save();
                })
            res.redirect("/login");
        } catch (error) {
            console.log(err);
        }
        
    }


  module.exports = { getClinicianProfile, updateClinicianProfile };