const express = require('express');
const router = express.Router();
const Shop = require("../models/shops");
const DummyShopsCreator = require("../dummy_modules_creators/shops");

router.get('/list',(req,res,next) => {
    console.log("Server - get  shops/list");
    Shop.getAllShops(err=> res.json({'sucsses': false, msg:'failed to get all shops'}),
                     shops => res.json({shops, 'sucsses': true, msg:'Success to fetch all shops'}));
});

router.get('/getShopsNames', (req, res, next) => {
    Shop.getShopsNames(err => res.json({success: false, msg:'Failed to get shops names'}),
                       names => res.json({names, success:true, msg:'Showing names '})
    );
});

router.get('/init',(req,res,next) => {
    DummyShopsCreator(err => {
        if(err){
            res.json({success: false, msg:'Failed to insert shops to DB!'});
        }
        else{
            res.json({success:true, msg:'Dummy shops inserted to DB! '});
        }
    });
});
   
module.exports = router;
