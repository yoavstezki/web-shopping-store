const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
serialNumber: {
    type: Number,min :0,
    required: true,
},
productName: {
    type: String,validate: /[a-zA-Z]/,
    required: true
},
productCategory: {
    type: String, validate: /[a-zA-Z]/,
    required: true
},
weightable: {
    type: Boolean,
    required: true
},
productPrice: {
    type: Number,min :0,
    required: true
},
productManufacturer: {
    type: String,validate: /[a-zA-Z]/,
    required: true
},
productStoreName: {
    type: String,
    required: true
},
});

const Product = module.exports = mongoose.model("Product", ProductSchema);

module.exports.Schema = ProductSchema;

module.exports.findProduct = (serialNumber, errorAction, productAction) =>{
    Product.findOne({'serialNumber': serialNumber},  (err, product) => {
        if(product){
            productAction(product);
        }
        else{
            errorAction(err);
        }
    });
};

module.exports.getAllProducts = (errorAction, productsAction) => {
    Product.find((err, products) => {
        if (products) {
            productsAction(products);
        } 
        else {
            errorAction(err);
        }
    });
}

module.exports.deleteProduct = (serialNumber, errorAction, callbcakAction) => {
    Product.findOneAndDelete({'serialNumber': serialNumber}, (err, callback) => {
        if(callback){
            callbcakAction(callback);
        }
        else{
            errorAction(err);
        }
    })
};

module.exports.getCategoryList = (errorAction, categoriesAction) => {
    Product.distinct(("productCategory") , (err, categories) => {
        if (categories){
            categoriesAction(categories);
        } 
        else {
            errorAction(err);
        }
    });
};

module.exports.getCategoryAvg = (errorAction, callbackAction) => {
    console.log("get product statistics")
    Product.aggregate([{"$group" : {_id:"$productCategory", avverage:{$avg:"$productPrice"}}}] ,(err, products) => {
        console.log("in find")
        if (err) {
            errorAction(err);
        } 
        else {
            callbackAction(products);
        }
    });
};

module.exports.getCategoryCounts = (errorAction, callbackAction) => {
    console.log("get product statistics")
    Product.aggregate([{"$group" : {_id:"$productCategory", count:{$sum:1}}}], (err, callback) => {
        console.log("in find")
        if (err) {
            errorAction(err);
        } 
        else {
            callbackAction(callback);
        }
    });
};

module.exports.updateProduct = (newProduct, errorAction, callbackAction) => {
    Product.findOneAndUpdate({serialNumber:newProduct.serialNumber},{$set:{productCategory:newProduct.productCategory,productName:newProduct.productName,weightable:newProduct.weightable,productPrice:newProduct.productPrice,productManufacturer:newProduct.productManufacturer,productStoreName:newProduct.productStoreName}}
                            ,{new:true}, (err, product) => {
        if(err){
            errorAction(err);
        }
        else{
            callbackAction(product);
        }
    });
};

module.exports.searchProductsNameCategoryAndPrice = (product, errorAction, callbackAction) => {
    Product.find({
        productPrice:{$lt:product.price},
        productName:{"$regex" : product.name, "$options" : "i"},
        productCategory:{"$regex" : product.category, "$options" : "i"}
    }, (err, callback) => {
            if (err) {
                console.log(err);
                errorAction(err);
            }
            else {
                callbackAction(callback);
            }
    });
}

module.exports.searchProductsOfCategory = (categoryName, errorAction, callbackAction) => {
    Product.find({
        productCategory:{"$regex" : categoryName, "$options" : "i"}
    }).limit(5).exec((err, callback) => {
        if (err) {
                errorAction(err);
            }
        else {
            callbackAction(callback);
        }
    });
}