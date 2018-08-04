const mongoose = require('mongoose');
const ShopSchema = mongoose.Schema({

    storeId: {
        type: Number,
        required: true
    },
    shopBranchName: {
        type: String,
        required: true
    },
    shopCompany: {
        type: String,
        required: true
    },
    shopSize: {
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
});

const Shop = module.exports = mongoose.model("Shop", ShopSchema);

module.exports.Schema = ShopSchema;

module.exports.getAllShops = (errorAction, shopsAction) => {
    Shop.find((err, shops) => {
        if (shops) {
            shopsAction(shops);
        } 
        else {
            errorAction(err);
        }
    });
}

module.exports.getShopsNames = (errorAction, shopsAction) => {
    Shop.distinct(("shopBranchName") , (err, names) => {
        if (names){
            shopsAction(names);
        } 
        else {
            errorAction(err);
        }
    });
};