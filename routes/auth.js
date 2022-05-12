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
// Main page which requires login to access
// Note use of authentication middleware here
// router.get('/', isAuthenticated, (req, res) => {
//   res.render('home', { title: 'Express', user: req.user.toJSON() })
// })
// router.get('/home', isAuthenticated, (req, res) => {
//   res.render('home', { title: 'Express', user: req.user.toJSON() })
// })
// Login page (with failure message displayed upon login failure)
router.get('/login', (req, res) => {
  res.render('login', { flash: req.flash('error'), title: 'Login' })
})
// Handle login
router.post('/login-patient',
  passport.authenticate('patient-local', {
    failureRedirect: '/login', 
    failureFlash: true
  })
  , (req, res) => {
    // res.redirect('/today/' + req.user._id);
    res.redirect('/patient/today');
  }
)
router.post('/login-clinician',
  passport.authenticate('clinician-local', {
    failureRedirect: '/login',
    failureFlash: true
  })
  , (req, res) => {
    // res.redirect('/clinician/' + req.user._id);
    res.redirect('/clinician');
  }
)
// Handle logout
router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})
module.exports = router