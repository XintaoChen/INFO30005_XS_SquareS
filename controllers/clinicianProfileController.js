const Clinician = require('../models/clinician')

const getClinicianInfo = async (req, res, next) => {
    try {
        const clinicianId = req.params.id;
        const clinician = await Clinician.findById(clinicianId).lean();
        if (!clinician) {
            console.log(err);
        }
        res.render('clinicianProfile.hbs', {
            clinicianData : clinician
        });
        
    } catch (err) {
        console.log(err);
    }
  };

  module.exports = { getClinicianInfo };