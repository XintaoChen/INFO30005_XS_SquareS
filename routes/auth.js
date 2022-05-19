const passport = require('passport')
const express = require('express')
const router = express.Router()
// var id = ""
// Authentication middleware
const isAuthenticated = (req, res, next) => {
  // If user is not authenticated via passport, redirect to login page 
  if (!req.isAuthenticated()) {
    return res.redirect('/login')
  }
  // Otherwise, proceed to next middleware function
  return next()
}
router.get('/login', (req, res) => {
  res.render('login', { flash: req.flash('error'), title: 'Login', pageName: "Log In"})
})
router.get('/login/failed', (req, res) => {
  res.render('loginFailed', { flash: req.flash('error'), title: 'Login', pageName: "Log In" })
})
// Handle login
router.post('/login-patient',
  passport.authenticate('patient-local', {
    failureRedirect: '/login/failed', 
    failureFlash: true
  })
  , (req, res) => {
    res.redirect('/patient/today');
  }
)
router.post('/login-clinician',
  passport.authenticate('clinician-local', {
    failureRedirect: '/login/failed',
    failureFlash: true
  })
  , (req, res) => {
    res.redirect('/clinician');
  }
)
// Handle logout
router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})
module.exports = router