const express = require('express');
const router = express.Router();
const Product = require('../models/product')
const DummyProductsCreator = require('../dummy_modules_creators/product');
const ml = require("../models/searching_ml");

router.get('/',(req,res,) => {
    const message = "Server - get products/"
    console.log(message);
    res.send(message);
});

router.get('/list', (req, res, next) => {
    console.log("Server - get products/list");
    Product.getAllProducts( err => res.json({'sucsses': false, msg:'failed to get products list'}),
                            products => res.json({products, 'sucsses': true, msg:'Success to fetch products list'}));
});

router.get('/categoryCount',(req,res,next) => {
    console.log("Server - get products/categoryCount");
    Product.getCategoryCounts(  err =>  res.json({'sucsses': false, msg:'failed to caount products per category'}),
                                callback => res.json({callback,'sucsses': false, msg:'Sucsses to count products per category'}));
});

router.get('/categoryAvg',(req,res,next) => {
    console.log("Server - get products/categoryAvg");
    Product.getCategoryAvg( err =>  res.json({'sucsses': false, msg:'failed to calculate avvarage per category'}),
                            callback => res.json({callback,'sucsses': false, msg:'Sucsses to calculate avvarage per category'}));
});

router.post('/delete', (req, res, next) => {
    console.log("Server - post  products/delete");
    const prod = getProduct(req);
    Product.deleteProduct(prod.serialNumber, err => res.json({success: false, msg:'delete opperation failed'}), 
                                             callback => res.json({success: true, msg:`Success to delete ${prod.productName}`}));
});

router.post('/update', (req, res, next) => {
    console.log("Server - post  products/update");
    const newProduct = getProduct(req);    
    Product.updateProduct(newProduct, err => res.json({success: false, msg:'update opperation failed'}),
                                      product => res.json({product, success: true, msg:`sucsses to update ${product.serialNumber}`}) )
});

router.post('/create', (req, res, next) => {
    console.log("Server - post  products/create");
    const newProduct = getProduct(req);
    console.log("saving product...");
    Product.findProduct(newProduct.serialNumber, err => saveProduct(newProduct, res, 'Product created'), user => {
        console.log("product with the same serial number is alredy exists...");
        res.json({success: false, msg:"product with the same serial number is alredy exists"});
    }); 
});

router.post('/search', (req, res, next) => {
    console.log("Server - post  products/search");
    const userName = req.body.username;
    const product = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price
    };
    if(userName != '' & product.category != ''){
        ml.AddToHistory(userName, product.category);
    }
    if (product.price == '') {
        product.price = 1000000;
    }
    Product.searchProductsNameCategoryAndPrice(product, err => res.json({success: false, msg: 'searching failed '}),
                                                        callback => res.json({callback, success: true, msg: 'Listing product '}));
});
router.post('/advertising', (req, res, next) => {
    const userName = req.body.username;    
    if(userName) {
        ml.GetCatagory(userName, err => res.json({success: false, msg: err}),
                                 output => getProductsOfCategory(output, res));
    }
    else {
        res.json({success: false}); // what to do here?
    }
});

router.get('/productCategoryList', (req, res, next) => {
    console.log("Server - post  products/productCategoryList");
    Product.getCategoryList(err => res.json({success: false, msg:'Failed to get catagories list'}),
                            categories => res.json({categories, success:true, msg:'Success to get all categories'})
    );
});

router.get('/init',(req,res,next) => {
    DummyProductsCreator(err => {
        if (err) {
            res.json({success: false, msg: 'Failed to insert products to DB!'});
        } 
        else {
            res.json({success: true, msg: 'Dummy products inserted to DB! '});
        }
    });
});

module.exports = router;

function getProductsOfCategory (categoryName, res) {
    Product.searchProductsOfCategory(categoryName, err => res.json({success: false, msg:'Failed to get products of category'}),
                                                   callback => res.json({callback, success: true, msg: 'Listing product'}));
}

function saveProduct(product, res, successMsg) {
    product.save()
        .then(result => { console.log('saving result: ' + result); res.json({success:true, msg:successMsg}); })
        .catch(err => { res.json({success:false, msg:'Failed to save product'}); console.log(err);});
}

function getProduct(req) {
    if(req.body)
    return  new Product({
        serialNumber: req.body.serialNumber,
        productName: req.body.productName,
        productCategory: req.body.productCategory,
        weightable: req.body.weightable,
        productPrice: req.body.productPrice,
        productManufacturer: req.body.productManufacturer,
        productStoreName: req.body.productStoreName,
    });
}
