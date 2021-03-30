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
getOrder = (req, res) => {
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
module.exports = {CreateOrder, getOrder}