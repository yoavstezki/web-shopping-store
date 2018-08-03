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
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });
    console.log("Server - saving user...");
    user.save()
    .then(result => {console.log(result);})
    .catch(err=>{res.send("failed to save user"); console.log(err);});
    res.send("user has been saved!");
    console.log("Server - done");
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
});

router.post('/delete',(req,res,next) => {
    console.log("Server - post  user/delete");
});

module.exports = router;
