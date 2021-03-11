const Product = require('../models/product-model')

  CreateProduct = (req,res) => {
    const body = req.body;
    if(!body){
      return res.status(400).json({status: 'ERROR', message: 'Filed is not null' })
    }
    const product = new Product({...body});
    console.log(body, 'body')

    console.log(product,'product')
    product.save()
    .then(()=> {
      return res.status(200).json({status: 'SUCCESS',message: 'Create product success'})
    })
    .catch((error)=> {
      return res.status(400).json({status: 'ERROR', message: error})
    })
}

GetProduct = (req,res) => { 
  Product.find({}, (err,product)=>{
    if(err){
      return res.status(400).json({message: 'Error get product', status: 'ERROR',error: err});
    }
    if(!product.length){
      return res.status(400).json({message: 'Product not found', status: 'ERROR'})
    }
      return res.status(200).json({status: 'SUCCESS',data: product})
  })
}

EditProduct = (req,res) => {
  console.log(req)
  const id = req.params.id;
  
  Product.findOne({_id: id},(err,product)=> {
    console.log('product',product)
    if(err){
      return res.status(400).json({status: 'ERROR',message: err})
    }
    if(!product?.length < 1){
      return res.status(201).json({status: 'ERROR', message: 'Not product id request',errorCode: 'ERROR.NOT.EXIST'})
    }
    product.description = req.body.description
    product.title = req.body.title
    product.price = req.body.price
    product.image = req.body.image
    product.save()
    .then(()=> {
      return res.status(200).json({status: 'SUCCESS',message: ''})
    })
    .catch(err => {
      return res.status(400).json({status: 'ERROR',message: err})

    })
  })
}

DeleteProduct = (req,res) => {
  const id = req.params.id;
  Product.findOne({_id: id}, (err,product)=> {
    console.log(`pr`, product);
    if(err){ 
      return res.status(400).json({status: 'ERROR',message: err})
    }
    if(!product.length < 1){
      return res.status(400).json({status: 'ERROR',message: 'Product not found'})
    }
    product.delete()
    .then(()=> {
      return res.status(200).json({status: 'SUCCESS',message: 'Delete success'})
    })
    .catch(err => {
      return res.status(201).json({status: 'ERROR',message: err})

    })
  })
}

module.exports = {CreateProduct,GetProduct,EditProduct,DeleteProduct}