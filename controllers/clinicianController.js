const Clinician = require("../models/clinician");

const getClinicianInfo = async (req, res) => {
    try { 
      const clinicianId = req.query._id;
      
      const clinician = await Clinician.findOne(clinicianId);
      if (!clinician) {
        res.json({
          status: 1,
          msg: "Error! No data found!",
        });
      }
      res.json({
        status:0,
        data: clinician
      });
    } catch (err) {
      console.log(err);
    }
  };

  module.exports = { getClinicianInfo };