const mongoose = require('mongoose');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model("User", UserSchema);

module.exports.findUser = (username, errorAction, userAction) =>{
User.findOne({'username': username},  (err, user) => {
    if(user){
        userAction(user);
    }
    else{
        errorAction(err);
    }
});
};

module.exports.findAllUsers = (errorAction, usersAction) => User.find((err, users)=>{
    if(users){
        usersAction(users);
    }
    else{
        errorAction(err);
    }
});

module.exports.deleteUser = (username, errorAction, callbcakAction) =>{
    User.findOneAndDelete({'username': username}, (err, callback) => {
        if(callback){
            callbcakAction(callback);
        }
        else{
            errorAction(err);
        }
    })
};
