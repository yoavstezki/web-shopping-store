const express = require('express');
const router = express.Router();
var Product = require('../models/product')

router.get('/',(req,res,) => {
    const message = "Server - get products/"
    console.log(message);
    res.send(message);
});

router.get('/list', (req, res, next) => {
    console.log("Server - get products/list");
});

router.get('/categoryCount',(req,res,next) => {
    console.log("Server - get products/categoryCount");
});

router.get('/categoryAvg',(req,res,next) => {
    console.log("Server - get products/categoryAvg");
});

router.post('/delete', (req, res, next) => {
    console.log("Server - post  products/delete");
});

router.post('/update', (req, res, next) => {
    console.log("Server - post  products/update");
});

router.post('/create', (req, res, next) => {
    console.log("Server - post  products/create");
});

router.post('/search', (req, res, next) => {
    console.log("Server - post  products/search");
});

router.get('/productCategoryList', (req, res, next) => {
    console.log("Server - post  products/productCategoryList");
});

module.exports = router;