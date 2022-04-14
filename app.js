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
        },
    })
)

app.set('view engine', 'hbs')

// link to our router
const peopleRouter = require('./routes/peopleRouter')
const demoRouter = require('./routes/demoRouter')

const patientRouter = require('./routes/patientRouter')
const { patientDashboardRouter } = require('./routes/patientDashboardRouter')

// middleware to log a message each time a request arrives at the server - handy for debugging
app.use((req, res, next) => {
    console.log('message arrived: ' + req.method + ' ' + req.path)
    next()
})

// the demo routes are added to the end of the '/demo-management' path
app.use('/people', peopleRouter)

app.use('/patient', patientRouter)

app.use('/today', patientDashboardRouter)

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
app.listen(process.env.PORT || 3001, () => {
    console.log('Demo app is running!')
})
