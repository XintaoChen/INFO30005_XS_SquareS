const Clinician = require('../models/clinician')

const getClinicianInfo = async (req, res, next) => {
    try {
        const clinicianId = req.user.clinicianId;
        const clinician = await Clinician.findById(clinicianId).lean();
        if (!clinician) {
            res.redirect("/login")
        }
        res.render('clinicianProfile.hbs', {
            clinicianData : clinician,
            loggedin: req.isAuthenticated(),
            isPatient: true,
        });
        
    } catch (err) {
        console.log(err)
        res.redirect("/login")
    }
  };

module.exports = { getClinicianInfo };