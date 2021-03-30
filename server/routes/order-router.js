const express = require('express');
const router = express.Router();
const OrderCtrl = require('../controllers/order-ctrl')
router.post('/create-order', OrderCtrl.CreateOrder)
router.get('/get-order/:userId', OrderCtrl.getOrder)

module.exports = router