const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Login = new Schema({
    username: {type: String, required: true},
    password: {type: String , required: true},
    accessToken: {type: String, required: true},
    resetToken:  {token: {type: String}, expires: {type: String} ,required: false}
},
{ timestamps: true },
)

module.exports = mongoose.model('login', Login)