const express = require('express') 
// create our Router object 
const demoRouter = express.Router() 

// import demo controller functions 
const demoController = require('../controllers/demoController') 
// add a route to handle the GET request for all demo data 
demoRouter.get('/', demoController.getAllDemoData)
demoRouter.get('/:id', demoController.getDataById)

// export the router 
module.exports = demoRouter 