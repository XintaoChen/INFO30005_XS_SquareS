const mongoose = require('mongoose')

connectionURL = 'mongodb+srv://XS_SquareS:xs_squares123@cluster0.tpmnr.mongodb.net/test'


mongoose.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, dbName: 'Diabetes@Home'})

const index = mongoose.connection

db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
    console.log('connected to Mongo')
})