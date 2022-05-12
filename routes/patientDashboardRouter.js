const express = require('express')
const patientDashboardController = require('../controllers/patientDashboardController')
const leaderBoardController = require('../controllers/leaderBoardController')

const patientDashboardRouter = express.Router()
patientDashboardRouter.get(
    '/:id',
    patientDashboardController.getTodayDataPatient
)

patientDashboardRouter.post('/add', function (req, res) {
    patientDashboardController.postTodayDataPatient(req.body)
    console.log(req.body)
    res.redirect('/today/' + req.body.patientId.toString())
})

patientDashboardRouter.get('/:d/leaderBoard', leaderBoardController.updateLeaderBoard)

module.exports = {
    patientDashboardRouter,
}
