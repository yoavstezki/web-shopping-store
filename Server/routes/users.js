const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/',(req,res,) => {
    console.log("Server - get  user/");
    res.send("users - get");
});

// Register
router.post('/register', (req, res, next) => {
    console.log("Server - post  user/register");
    const newUser = getUser(req);
    console.log("saving user...");
    User.findUser(newUser.username, err => saveUser(newUser, res, 'User Registerd'), user => {
        console.log("user alredy exists...");
        res.json({success: false, msg:'User with the same username is already exists'});
    }); 
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    console.log("Server - post  user/authenticate");
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
    User.deleteUser(user.username, err => res.json({success: false, msg:'delete opperation failed'}), 
                          callback => res.json({success: true, msg:`Success to delete ${user.username}`}))
});

module.exports = router;

function saveUser(user, res, successMsg) {
    user.save()
        .then(result => { console.log('saving result: ' + result); res.json({success:true, msg:successMsg}); })
        .catch(err => { res.json({success:false, msg:'Failed to save user'}); console.log(err);});
}

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

