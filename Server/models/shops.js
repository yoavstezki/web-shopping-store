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

module.exports = mongoose.model("Shop", ShopSchema);