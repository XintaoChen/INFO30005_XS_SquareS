// Import express
const express = require('express')
// Set your app up as an express app
const app = express()

app.use(express.static('public'))
// set up handlebars view engine
const exphbs = require('express-handlebars')
app.engine(
    'hbs',
    exphbs.engine({
        extname: 'hbs',
        defaultLayout: 'main.hbs',
        helpers: {
            bgLevelLow: (x) => x < 11,
            hData1: (x) => x == "625576a5bcd6f0a12a5e5fa6",
            hData2: (x) => x == "625576a8bcd6f0a12a5e5fa7",
            hData3: (x) => x == "625576acbcd6f0a12a5e5fa8",
            hData4: (x) => x == "625576b0bcd6f0a12a5e5fa9",
            hData: (x) => x == true,        
        },
    })
)

require("./models/db");

app.set('view engine', 'hbs')

// link to our router
const peopleRouter = require('./routes/peopleRouter')
const demoRouter = require('./routes/demoRouter')

const { patientDashboardRouter } = require('./routes/patientDashboardRouter')

const patientRouter = require('./routes/patientRouter')
//const patientRouter2 = require('./routes/patientRouter2')
const recordRouter = require('./routes/recordRouter')
const clinicianDashboardRouter = require('./routes/clinicianDashboardRouter')

// middleware to log a message each time a request arrives at the server - handy for debugging
app.use((req, res, next) => {
    console.log('message arrived: ' + req.method + ' ' + req.path)
    next()
})

// the demo routes are added to the end of the '/demo-management' path
app.use('/people', peopleRouter)

app.use('/patient', patientRouter)
//app.use('/patient-2', patientRouter2)

app.use('/today', patientDashboardRouter)

app.use("/record", recordRouter)

app.use('/clinician', clinicianDashboardRouter)

// Tells the app to send the string: "Our demo app is working!" when you
// hit the '/' endpoint.
app.get('/', (req, res) => {
    // res.send('Our demo app is working!')
    res.render('home.hbs')
})
app.get('/home', (req, res) => {
    // res.send('Our demo app is working!')
    res.render('home.hbs')
})
app.get('/aboutDiabetes', (req, res) => {
    // res.send('Our demo app is working!')
    res.render('aboutDiabetes.hbs')
})
app.get('/aboutUs', (req, res) => {
    // res.send('Our demo app is working!')
    res.render('aboutUs.hbs')
})

// link to our router
// const demoRouter = require('./routes/demoRouter')

// the demo routes are added to the end of the '/demo-management' path
app.use('/demo-management', demoRouter)


const mongoose = require("mongoose");
const patientModel = require("./models/patient.js");

// patientModel.aggregate([
//     {
//         $lookup:{
//             from: "Record",
//             localField: "_id",
//             foreignField: "patientId",
//             as: 'healthDataHistory'
//         }
//     }
// ], (err, docs) => {
//     if (err) {
//         return console.log(err)
//     }
//     console.log(JSON.stringify(docs))
// })

// const recordModel = require("./models/record.js");
// recordModel.aggregate([
//     {
//         $lookup:{
//             from: "Patient",
//             localField: "patientId",
//             foreignField: "_id",
//             as: 'patientInfo'
//         }
//     },{
//         $match: {
//             date: {
//                 $gte: new Date("2022,04,24"),
//                 $lt: new Date("2022,4,25")
//             },
//             patientId: mongoose.Types.ObjectId('62554eb9bcd6f0a12a5e5f52'),
//         }
//     }
// ], (err, docs) => {
//     if (err) {
//         return console.log(err)
//     }
//     console.log(JSON.stringify(docs))
// })


// Tells the app to listen on port 3000 and logs that information to the
// console.
app.listen(process.env.PORT || 3001, () => {
    console.log('Demo app is running!')
})
