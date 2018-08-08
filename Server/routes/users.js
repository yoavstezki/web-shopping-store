const express = require('express');
const router = express.Router();
const User = require('../models/user');
const config = require('../config/conf');
const jwt = require('jsonwebtoken');

router.get('/',(req,res,) => {
    console.log("Server - get  user/");
    res.send("users - get");
});

// Register
router.post('/register', (req, res, next) => {
    console.log("Server - post  user/register");
    const newUser = getUser(req);
    console.log("saving user...");
    User.addUser(newUser, err => res.json({success: false, msg:`Register user failed. ${err}`}),
                          callback => res.json({success:true, msg:"User Registerd"}) ); 
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    console.log("Server - post  user/authenticate");
    const username = req.body.username;
    const password = req.body.password;
    User.comparePassword(username, password, err => res.json({success: false, msg:' Wrong password!'}),
                                             callback => JsonWebTokenSing(username, res));
});

// Profile
router.get('/profile', (req, res, next) => {
    console.log("Server - get  user/profile");
});

router.get('/userslist', (req, res, next) => {
    console.log("Server - get  user/userslist");
    User.findAllUsers(err => res.json({success: false, msg:'get users list opperation failed'}),
                      users => res.json({users, success: true, msg:'Success to fetch all users'}));
});

router.post('/delete',(req,res,next) => {
    console.log("Server - post  user/delete");
    const user = getUser(req);
    User.deleteUser(user.username, err => res.json({success: false, msg:'Delete opperation failed'}), 
                          callback => res.json({success: true, msg:`Success to delete ${user.username}`}))
});

module.exports = router;

function getUser(req) {
    if(req.body)
    return new User({
        id: req.body._id,
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
}

function JsonWebTokenSing(username, res){
    User.findUser(username, err => res.json({success: false, msg:'Cant find user'}), user => {
        const token = jwt.sign(user.toJSON(), config.secret,{
            expiresIn: 604800 // expires in 1 week
        });
        
        res.json({
            success:true,
            token:'JWT '+token,
            user: {
                id: user._id,
                name: user.username,
                email: user.email,
            }
        })
    })
}