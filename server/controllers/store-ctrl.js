const Store = require('../models/store-model');
CreateStore = (req,res) => {
   const body = req.body
   Store.findOne({_id: req.params.userId}, (err, el)=> {
       if(!el){
           const stores = [];
           stores.push(body);
          const  store = new Store({_id: req.params.userId, store: stores})
          store.save()
          .then(()=> {
              return res.status(200).json({status: 'SUCCESS', message: 'Create store of user success'})
          })
          .catch(err => {
              return res.status(400).json({status: 'ERROR', message: err})
          })
       }
       else if(el){
          el?.store.push(body);
          el.save()
          .then(()=> {
              return res.status(200).json({status: 'SUCCESS', message: 'Add product join store'})
          })
          .catch(err => {
              return res.status(400).json({status: 'SUCCESS', message: err})
          })
       }
       if(err){
        return res.status(400).json({status: 'ERROR',message: err})
       } 
   })
}
getStore  = async(req,res) => {
   await Store.findOne({_id: req.params.userId}, (err, store)=> {
       if(err){
           return res.status(400).json({status: 'ERROR', message: err})
       }
       if(store.length < 1){
        return res.status(400).json({status: 'ERROR', message: 'Not found in store with user ID'})
       }
       else {
           return res.status(200).json({status: 'SUCCESS', message: 'Get Store Success', data: store})
       }
       
   })
}
module.exports = {CreateStore, getStore}