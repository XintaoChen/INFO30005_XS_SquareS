const express = require('express')

const recordRouter = express.Router()
const recordController = require('../controllers/recordController')

// get required datas of single patient
recordRouter.get('/get', (req, res) => {
    recordController.getOneRecordBypatientId(req, res)
})

module.exports = recordRouter
