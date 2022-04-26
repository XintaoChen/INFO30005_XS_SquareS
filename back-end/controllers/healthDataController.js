const HealthData = require("../models/healthData");

const getHealthDataList = async (req, res) => {
    try { 
      const healthData = await HealthData.find().sort({dataName:1});
      if (!healthData) {
        res.json({
          status: 1,
          msg: "Error! No data found!",
        });
      } else{
        console.log(healthData)
        res.json({
          status:0,
          data: healthData
        });
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  module.exports = { getHealthDataList };