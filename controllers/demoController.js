// import demo model 
const demoData = require('../models/demoModel') 

// handle request to get all demo data instances 
const getAllDemoData = (req, res) => { 
    res.send(demoData) // send list to browser 
} 
const getDataById = (req, res) =>{
    const data = demoData.find(data => data.id === req.params.id)
    if (data){
        res.send(data)
    }else{
        res.sendStatus(404)
    }
}

// exports an object, which contains a function named getAllDemoData 
module.exports = { 
    getAllDemoData,
    getDataById 
} 

// For clinician:
// get all patients' latest comments
//      input, output, route
// get single patient basic info
// get single patient all health data
// get single patient single day health data
// get single patient comments

// change single patient basic info
// change single patient health data requirement
// change single patient support message
// change/add/delete note

// For patient:
// add daliy health data (comments)
// change patient himself basic info
// get single patient current day health data
// get single patient single day health data
// get single patient all health data

// Others:
// Rank
// Auto Bandage




