const mongoose = require('mongoose')

mongoose.connect(
    process.env.MONGO_URL ||
        'mongodb+srv://XS_SquareS:xs_squares123@cluster0.tpmnr.mongodb.net/test',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'Diabetes@Home',
    }
)

// Exit on error
const db = mongoose.connection.on('error', (err) => {
    console.error(err)
    process.exit(1)
})

db.once('open', async () => {
    console.log(`Mongo connection started on ${db.host}:${db.port}`)
})

require('./patient')
