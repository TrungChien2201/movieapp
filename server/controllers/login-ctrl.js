const Login = require('../models/login-model');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const CreateLogin = async (req,res) => {
    const body = req.body;
    console.log(`body`,req.body);
    if(!body){
        return res.status(400).json({
            status: error,
            message: 'Username an password is not null'
        })
    }
    const data = new Login(body);

    if(!data) {
        return res.status(400).json({status: 'Error', message: error});
    }
    console.log(`run here`,data);
    Login.findOne({}, (err, login) => {
        if(err){
            return res.status(201).json({status: 'ERROR',message: 'Login fail',error: err});
        }
        console.log(`run here`, login);
    if(data.username === body.username && data.password === body.password){
        const accessToken = jwt.sign({ username: body.username,  password: body.password}, accessTokenSecret);
        return res.status(200).json({status: 'Success',message: 'Login success',accessToken});
    }
   })
}
module.exports =  {CreateLogin}