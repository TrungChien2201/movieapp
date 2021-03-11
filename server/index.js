const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const movieRouter = require('./routes/movie-router')
const loginRouter = require('./routes/login-router')
const productRouter = require('./routes/product-router')
const app = express()
const apiPort = 3001

const { createProxyMiddleware } = require('http-proxy-middleware');
 
// proxy middleware options


app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', movieRouter)
app.use('/api', loginRouter)
app.use('/api', productRouter)
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
