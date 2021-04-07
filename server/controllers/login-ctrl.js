const Login = require("../models/login-model");
const jwt = require("jsonwebtoken");
const accessTokenSecret = "youraccesstokensecret";
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const accountService = require('../service');
// const sendMail = require('_helpers/send-email');
CreateLogin = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      status: 'ERROR',
      message: "Username an password is not null",
    });
  }
  
  Login.findOne({username: req.body.username}, (err, login) => {
    if (err) {
      return res
        .status(201)
        .json({ status: "ERROR", message: "Login fail", error: err });
    }
    if(!login){
      return res.status(403).json({status: 'ERROR',message: 'Fail'})
    }
    while (login.username === body.username && login.password === body.password) {
      return res
        .status(200)
        .json({ status: "SUCCESS", message: "Login success", accessToken: login.accessToken,userId: login._id , rule: login.rule});
    }
    return res.status(401).json({ status: "ERROR", message: "Login fail" });
  });
};

Register = (req, res) => {
  const body = req.body;
  if (!body) {
    return res
      .status(400)
      .json({ status: "ERROR", message: "Body is not null" });
  }
  const accessToken = jwt.sign(
    { username: body.username, password: body.password },
    accessTokenSecret
  );
  const login = new Login({...body,accessToken,rule: 1,resetToken: {token: '',expires: ''}});
  if (!login) {
    return res.status(400).json({ status: "ERROR", message: error });
  }
  login
    .save()
    .then(() => {
      return res.status(200).json({
        id: login._id,
        status: 'SUCCESS',
        message: "Register success", 
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Register fail!",
      });
    });
};

ForgotPassword = async(req,res) => {
accountService.forgotPassword(req.body.username, req.get('origin'))
  .then(() =>res.json({status: 'SUCCESS', message: 'Please check your email for password reset instructions' }))
  .catch(err => {
    return res.status(400).json({ status: "ERROR", message: err });

  });
}

getAccount = (req,res) => {
  Login.find({}, (err, account) => {
    if(err) {
      return res.status(400).json({status: 'ERROR', message: err})
    }
    if(!account || account.length < 1){
      return res.status(400).json({status: 'ERROR', message: 'Account not found'})
    }
    return res.status(200).json({status: 'SUCCESS', data: account})
  })
}

deleteAccount = (req,res) => {
   Login.findOne({_id: req.params.id} , (err, account)=>{
     if(err){
       return res.status(400).json({status: 'ERROR', message: err})
     }
     if(!account){
       return res.status(400).json({status: "ERROR", message: 'Account not found'})
     }
     account.delete()
      .then(()=> {
        return res.status(200).json({status: 'SUCCESS', message: 'Delete success'})
      })
      .catch(err => {
        return res.status(400).json({status: 'ERROR', message: err})
      })
   })
};

editAccount = (req,res) => {
  const body = req.body;
  Login.findOne({_id: body.id}, (err,account) => {
    if(err){
      return res.status(400).json({status: 'ERROR',message: err})
    }
    if(!account){
      return res.status(400).json({status: 'ERROR', message: 'Account not found '})
    }
    account.username = body.username
    account.password = body.password
    account.rule = body.rule
    account.save()
       .then(()=> {
         return res.status(200).json({status: 'SUCCESS', message: 'Edit account success'})
       })
       .catch(err => {
        return res.status(400).json({status: 'ERROR', message: err});
      })
  })
};

module.exports = { CreateLogin, Register,ForgotPassword, getAccount, deleteAccount ,editAccount};
