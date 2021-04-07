const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://chienvu:chien2201@cluster0.u37lg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
