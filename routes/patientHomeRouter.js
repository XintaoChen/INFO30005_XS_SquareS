const express = require('express')

const patientHomeRouter = express.Router()

const patientHomeController = require('../controllers/patientHomeController')

patientHomeRouter.get('/:id', patientHomeController.getTodayData)

module.exports = {patientHomeRouter,}
