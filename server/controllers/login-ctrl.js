const Login = require("../models/login-model");
const jwt = require("jsonwebtoken");
const accessTokenSecret = "youraccesstokensecret";
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const accountService = require('../service');
// const sendMail = require('_helpers/send-email');
CreateLogin = (req, res) => {
  const body = req.body;
  console.log(`body`, req.body);
  if (!body) {
    return res.status(400).json({
      status: error,
      message: "Username an password is not null",
    });
  }
  const data = new Login(body);

  if (!data) {
    return res.status(400).json({ status: "Error", message: error });
  }
  console.log(`run here`, data);
  Login.findOne({username: req.body.username}, (err, login) => {
    if (err) {
      return res
        .status(201)
        .json({ status: "ERROR", message: "Login fail", error: err });
    }
    console.log(`run here`, login);
    if(!login){
      return res.status(403).json({status: 'Error',message: 'Fail'})
    }
    while (login?.username === body.username && login?.password === body.password) {
      return res
        .status(200)
        .json({ status: "Success", message: "Login success", accessToken: login?.accessToken });
    }
    return res.status(401).json({ status: "Error", message: "Login fail" });
  });
};

Register = (req, res) => {
  const body = req.body;
  console.log(`body`, body);
  if (!body) {
    return res
      .status(400)
      .json({ status: "Error", message: "Body is not null" });
  }
  const accessToken = jwt.sign(
    { username: body.username, password: body.password },
    accessTokenSecret
  );
  const login = new Login({...body,accessToken,resetToken: {token: '',expires: ''}});
  if (!login) {
    return res.status(400).json({ status: "Error", message: error });
  }
  login
    .save()
    .then(() => {
      return res.status(200).json({
        id: login._id,
        status: 'Success',
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
console.log(``, req.body.username);
accountService.forgotPassword(req.body.username, req.get('origin'))
  .then(() =>res.json({ message: 'Please check your email for password reset instructions' }))
  .catch(err => console.log(`err`,err));
}
module.exports = { CreateLogin, Register,ForgotPassword };
