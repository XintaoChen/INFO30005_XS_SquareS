const Clinician = require("../models/clinician");

const getClinicianInfo = async (req, res) => {
    try { 
      const clinicianId = req.query._id;
      
      const clinician = await Clinician.findById(clinicianId);
      if (!clinician) {
        res.json({
          status: 1,
          msg: "Error! No data found!",
        });
      } else{
        res.json({
          status:0,
          data: clinician
        });
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  module.exports = { getClinicianInfo };