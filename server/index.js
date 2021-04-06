const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http');
const db = require('./db')
const movieRouter = require('./routes/movie-router')
const loginRouter = require('./routes/login-router')
const productRouter = require('./routes/product-router')
const storeRouter = require('./routes/store-router')
const addressRouter = require('./routes/address-router')
const OrderRouter = require('./routes/order-router')
const app = express();
const Order = require('./models/order-model');
const Notify = require('./models/notify-model');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server, {origins: 'http://localhost:3001'});
const apiPort = 3001

const { createProxyMiddleware } = require('http-proxy-middleware');
 
// proxy middleware options
let interval;
let countAccess = 0;
io.sockets.on("connection", (socket) => {
    if (interval) {
      clearInterval(interval);
    }
    countAccess++;
    socket.on('error', function() {
        console.log('there was an error');
      });
      
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
   interval = setInterval(() => getNotify(socket) , 1000);
   
   socket.on('Preview', (id)=> {
    Notify.findByIdAndDelete({_id: id}, (err,pr)=> {
      
    })
    socket.emit('PreviewSuccess', 'SUCCESS')
   });
   interval = setInterval(()=> getAllOrder(socket), 1000);
   interval = setInterval(()=> getAccessWebsite(socket, countAccess), 1000);
   
  });
  const getAllOrder = (socket) => {
    Order.find({}, (err,order)=> {
      socket.emit('getAllOrder', order)
     })
  }
  const getNotify = (socket) => {
    Notify.find({}, (err,notify) => {
      socket.emit('Order', notify)
    })
  }
  const getAccessWebsite = (socket, countAccess) => {
    socket.emit('countAccess', countAccess);
  }
    
  global.io = io
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
app.use('/api', storeRouter)
app.use('/api', addressRouter)
app.use('/api', OrderRouter)
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

io.listen(3002, () => console.log(`Server running on port ${apiPort}`));
