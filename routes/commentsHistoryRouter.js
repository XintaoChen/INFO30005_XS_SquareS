const express = require('express')
const commentsHistoryController = require('../controllers/commentsHistoryController')

const commentsHistoryRouter = express.Router()
commentsHistoryRouter.get('/:id', commentsHistoryController.getCommentsHistory)

module.exports = commentsHistoryRouter