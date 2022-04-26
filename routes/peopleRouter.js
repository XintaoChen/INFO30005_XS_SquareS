const express = require('express')

// create our Router object
const peopleRouter = express.Router()

// require our controller
const peopleController = require('../controllers/peopleController')

// add a route to handle the GET request for all demo data
peopleRouter.get('/', peopleController.getAllPeopleData)

// add a route to handle the GET request for one data instance
peopleRouter.get('/:id', peopleController.getDataById)

// add a new JSON object to the database
peopleRouter.post('/', peopleController.insertData)

// export the router
module.exports = peopleRouter