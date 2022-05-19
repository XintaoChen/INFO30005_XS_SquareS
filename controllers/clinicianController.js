const Clinician = require('../models/clinician')

  const getClinicianProfile = async (req, res, next) => {
    try {
        const clinicianId = req.params.id;
        const clinician = await Clinician.findById(clinicianId).lean();
        if (!clinician) {
            console.log(err);
        }

        res.render('patientProfile.hbs', {
            clinicianData : clinician
        });
    
    } catch (err) {
        console.log(err);
    }
  };

    const updateClinicianProfile = async (req, res, next) => {
        try {

            const clinicianId = req.body.clinicianId;
            
            const updates = {
                clinicNumber: req.body.clinicNumber,
                clinicAddress: req.body.clinicAddress,
                password: req.body.password,
                briefTextBio: req.body.briefTextBio,
            }

            const result = await Clinician.findByIdAndUpdate(clinicianId, updates, { new : true }).lean();

        } catch (error) {
            console.log(err);
        }
        
    }


  module.exports = { getClinicianProfile, updateClinicianProfile };