const passport = require('passport')
const User = require('./models/patient')
const Clinician = require('./models/clinician')
const LocalStrategy = require('passport-local').Strategy
var loginRole = ''
// Updated serialize/deserialize functions
passport.serializeUser((user, done) => {
    done(undefined, user._id)
})
passport.deserializeUser((userId, done) => {
    if (loginRole == 'patient'){
        User.findById(userId, { password: 0 }, (err, user) => {
            if (err) {
                return done(err, undefined)
            }
            return done(undefined, user)
        })
    }
    else if(loginRole == 'clinician'){
        Clinician.findById(userId, { password: 0 }, (err, user) => {
            if (err) {
                return done(err, undefined)
            }
            return done(undefined, user)
        })
    }else{

    }
})
// Updated LocalStrategy function

//for patient
passport.use(
    'patient-local',
    new LocalStrategy((username, password, done) => {
        User.findOne({ emailAddress: username }, {}, {}, (err, user) => {
            if (err) {
                return done(undefined, false, {
                    message: 'Unknown error has occurred'
                })
            }
            if (!user) {
                return done(undefined, false, {
                    message: 'Incorrect username or password',
                })
            }
            // Check password
            user.verifyPassword(password, (err, valid) => {
                if (err) {
                    return done(undefined, false, {
                        message: 'Unknown error has occurred'
                    })
                }
                if (!valid) {
                    return done(undefined, false, {
                        message: 'Incorrect username or password',
                    })
                }
                // If user exists and password matches the hash in the database
                loginRole = 'patient'
                return done(undefined, user)
            })
        })
    })
)
//for clinician
passport.use(
    'clinician-local',
    new LocalStrategy((username, password, done) => {
        Clinician.findOne({ emailAddress: username }, {}, {}, (err, user) => {
            if (err) {
                return done(undefined, false, {
                    message: 'Unknown error has occurred'
                })
            }
            if (!user) {
                return done(undefined, false, {
                    message: 'Incorrect username or password',
                })
            }
            // Check password
            user.verifyPassword(password, (err, valid) => {
                if (err) {
                    return done(undefined, false, {
                        message: 'Unknown error has occurred'
                    })
                }
                if (!valid) {
                    return done(undefined, false, {
                        message: 'Incorrect username or password',
                    })
                }
                // If user exists and password matches the hash in the database
                loginRole = 'clinician'
                return done(undefined, user)
            })
        })
    })
)
module.exports = passport