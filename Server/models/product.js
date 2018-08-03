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

module.exports = mongoose.model("Product", ProductSchema);