const Clinician = require('../models/clinician')
//const { param } = require('../routes/peopleRouter')

// const getTodayDate = async (req, res, next) => {
//     try{
//         let date = new Date().toLocaleDateString();
//         // let year = date.getFullYear();
//         // let month = date.getMonth() + 1;
//         // let day = date.getDate();
//         // res.render('clinicianDashboard.hbs',{ todayDate: day + "/" + month + "/" + year})
//         res.render('clinicianDashboard.hbs',{ todayDate: date })

//     }catch(err){
//         return next(err)
//     }
// }

const getClinicianInfo = async (req, res, next) => {
    try{
        const tempData = await Clinician.findById(req.params.id).lean()
        const aData = await Clinician.findById(req.params.id).lean()
        if (tempData) {
            res.render('clinicianDashboard.hbs', { clinicianDashboardData: tempData,a:aData })
        } else {
            res.render('noRecords.hbs')
        }
    }catch(err){
        return next(err)
    }
}

module.exports = {
    // getTodayDate,
    getClinicianInfo,
}
