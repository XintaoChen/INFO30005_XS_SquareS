// Import express
const express = require("express");
// Set your app up as an express app
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const flash = require('express-flash')
const session = require('express-session')
app.use(flash())
app.use(
    session({
        // The secret used to sign session cookies (ADD ENV VAR)
        secret: process.env.SESSION_SECRET || 'keyboard cat', name: 'demo', // The cookie name (CHANGE THIS) saveUninitialized: false,
        resave: false,
        cookie: {
            sameSite: 'strict',
            httpOnly: true,
            secure: app.get('env') === 'production'
        },
    })
)
if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // Trust first proxy
}
// Initialise Passport.js
const passport = require('./passport')
app.use(passport.authenticate('session'))


app.use(express.static('public'))
// set up handlebars view engine
const exphbs = require("express-handlebars");
app.engine(
    'hbs',
    exphbs.engine({
        extname: 'hbs',
        defaultLayout: 'main.hbs',
        helpers: {
            bgLevelLow: (x) => x < 11,
            hData1: (x) => x == '625576a5bcd6f0a12a5e5fa6',
            hData2: (x) => x == '625576a8bcd6f0a12a5e5fa7',
            hData3: (x) => x == '625576acbcd6f0a12a5e5fa8',
            hData4: (x) => x == '625576b0bcd6f0a12a5e5fa9',
            hData: (x) => x == true,
            true: (x) => x == true,
            compare: (x, y) => x > y,
            true: (x) => x == true,
            false: (x) => x == false,
            formmatDate: (date) => `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
        },
    })
)

require("./models/db");

app.set("view engine", "hbs");

// link to our router
const { patientDashboardRouter } = require("./routes/patientDashboardRouter");
// const patientRouter = require("./routes/patientRouter");
// const recordRouter = require("./routes/recordRouter");
const clinicianDashboardRouter = require("./routes/clinicianDashboardRouter");
// const clinicianProfileRouter = require('./routes/clinicianProfileRouter')
// const commentsHistoryRouter = require('./routes/commentsHistoryRouter')
// Load authentication router
const authRouter = require('./routes/auth')
app.use(authRouter)

// middleware to log a message each time a request arrives at the server - handy for debugging
app.use((req, res, next) => {
  console.log("message arrived: " + req.method + " " + req.path);
  next();
});

//All routers here
app.use("/patient", patientDashboardRouter);

app.use("/clinician", clinicianDashboardRouter);


// // Tells the app to send the string: "Our demo app is working!" when you
// // hit the '/' endpoint.
// app.get('/ajax', (req, res) => {
//     res.render('test.hbs')
// })

//Pages not using routers (static pages)
app.get('/', (req, res) => {res.redirect('/home')})
app.get('/home', (req, res) => {
    if(req.isAuthenticated()){
        res.render('home.hbs', { loggedin: req.isAuthenticated(), isPatient: (typeof(req.user.supportMessage)  != 'undefined') ? true:false, pageName: "Home"})
    }else{
        res.render('home.hbs', { loggedin: req.isAuthenticated(), pageName: "Home"})
    }
})
app.get('/aboutDiabetes', (req, res) => {
    if(req.isAuthenticated()){
        res.render('aboutDiabetes.hbs', { loggedin: req.isAuthenticated(), isPatient: (typeof(req.user.supportMessage)  != 'undefined') ? true:false, pageName: "About Diabetes"})
    }else{
        res.render('aboutDiabetes.hbs', { loggedin: req.isAuthenticated(), pageName: "About Diabetes"})
    }
})
app.get('/aboutUs', (req, res) => {
    if(req.isAuthenticated()){
        res.render('aboutUs.hbs', { loggedin: req.isAuthenticated(), isPatient: (typeof(req.user.supportMessage)  != 'undefined') ? true:false, pageName: "About This Website"})
    }else{
        res.render('aboutUs.hbs', { loggedin: req.isAuthenticated(), pageName: "About This Website"})
    }
})


// link to our router
// const demoRouter = require('./routes/demoRouter')

// the demo routes are added to the end of the '/demo-management' path
// app.use('/demo-management', demoRouter)

// Tells the app to listen on port 3000 and logs that information to the
// console.
app.listen(process.env.PORT || 3001, () => {
    console.log('Demo app is running!')
})
