const Order = require('../models/order-model');
const StoreNotify = require('../models/notify-model');
CreateOrder = (req,res) => {
    const body = req.body
    if(!body){
        return res.status(400).json({status: 'ERROR', message: 'body request null'})
    }
    const order = new Order({...body, status: 0})
    if(!order){
        return res.status(400).json({status: 'ERROR', message: 'Not Create Order - Form'})
    }
    order.save()
      .then(()=> {
        return res.status(200).json({status: 'SUCCESS', message: 'Create order Success'});

      })
      .catch(err => {
        return res.status(400).json({status: 'ERROR', message: err})
 
      })
      const newNoti = new StoreNotify(body);
      newNoti.save()
}
getOrderUser = (req, res) => {
  const idUser = req.params.userId
  Order.find({idUser: idUser},(err,order)=> {
      if(err){
          return res.status(400).json({status: 'ERROR', message: err})
      }
      if(!order || order.length < 1){
        return res.status(400).json({status: 'ERROR', message: 'Order Form of userId not found'})
      }
      return res.status(200).json({status: 'SUCCESS', data: order, message: 'Success'})
  })
}

getAllOrder = async(req, res) => {
  await Order.find({},(err, order)=> {
    if(err){
      return res.status(400).json({status: 'ERROR', message: err})
    }
    if(!order || order.length < 1) {
      return res.status(400).json({status: 'ERROR', message: 'Order not found'});
    }
    return res.status(200).json({status: 'SUCCESS',message: 'Success', data: order})
  })
}

deleteOrder = async(req, res) => {
  console.log(req.params);
  const id = req.params.id
  await Order.findByIdAndDelete({_id: id}, (err, order)=>{
     if(err){
       return res.status(400).json({status: 'ERROR', message: 'Delete Success'})
     }
     if(!order){
       return res.status(400).json({status: 'ERROR', message: 'Order not found'})
     }
     return  res.status(200).json({status: 'SUCCESS', message: 'Delete success'});
  })
}

editOrder = async(req,res) => {
  const body = req.body;
  console.log(`body`,body);
  if(!body){
    return res.status(400).json({status: 'ERROR', message: 'Body request not found'});
  }
  await Order.findByIdAndUpdate({_id: body._id}, body , (err, order)=> {
    if(err){
      return res.status(400).json({status: 'ERROR', message: err})
    }
    if(!order){
      return res.status(400).json({status: 'ERROR', message: 'Order not found'})
    }
    return res.status(200).json({status: 'SUCCESS', message: 'Edit success'})
  })
   
}
module.exports = {CreateOrder, getOrderUser, getAllOrder, deleteOrder, editOrder}