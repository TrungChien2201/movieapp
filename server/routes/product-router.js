const express = require('express')

const Product = require('../controllers/product-ctrl')

const router = express.Router()

router.post('/create-product', Product.CreateProduct)
router.get('/get-product',Product.GetProduct)
router.put('/edit-product/:id', Product.EditProduct)
router.post('/delete-product/:id', Product.DeleteProduct)
module.exports = router