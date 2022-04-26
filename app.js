// Import express
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
// Set your app up as an express app
const app = express()
app.use(express.static('public'))

app.use(express.json()); // needed if POST data is in JSON format
app.use(express.urlencoded()); // only needed for URL-encoded input

// set up handlebars view engine
var hbs = exphbs.create({
    defaultlayout: "main",
    extname: "hbs",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
    helpers: {
      bgLevelLow: (x) => x < 11,
      css:function (str) {
          
          var cssList = this.cssList || [];
          if(cssList.indexOf(str) < 0){
            cssList.push(str);
          }
          this.cssList = cssList.concat();
      },
        hData1: (x) => x == "625576a5bcd6f0a12a5e5fa6",
        hData2: (x) => x == "625576a8bcd6f0a12a5e5fa7",
        hData3: (x) => x == "625576acbcd6f0a12a5e5fa8",
        hData4: (x) => x == "625576b0bcd6f0a12a5e5fa9",
        hData: (x) => x == true
    },
  })
app.engine(
    'hbs',
    hbs.engine
)
require("./models/db");

app.set('view engine', 'hbs')

// link to our router
const peopleRouter = require('./routes/peopleRouter')
const demoRouter = require('./routes/demoRouter')

const patientRouter = require('./routes/patientRouter')
const { patientDashboardRouter } = require('./routes/patientDashboardRouter')
// const recordRouter = require('./routes/recordRouter')
const clinicianRouter = require('./routes/clinicianDashboardRouter')

// middleware to log a message each time a request arrives at the server - handy for debugging
app.use((req, res, next) => {
    console.log('message arrived: ' + req.method + ' ' + req.path)
    next()
})

// the demo routes are added to the end of the '/demo-management' path
app.use('/people', peopleRouter)

app.use('/patient', patientRouter)

app.use('/today', patientDashboardRouter)

app.use('/clinician', clinicianRouter)
// app.use("/record", recordRouter)

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

// Tells the app to listen on port 3000 and logs that information to the
// console.
app.listen(process.env.PORT || 3000, () => {
    console.log('Demo app is running!')
})
