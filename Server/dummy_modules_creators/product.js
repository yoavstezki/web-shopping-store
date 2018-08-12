const mongoose = require('mongoose');
const ProductsSchema = require("../models/product").Schema;

const Product = mongoose.model("Product", ProductsSchema);

var productCreator = function () {
    this.serialNumber = {};
    this.productName = '';
    this.productCategory = '';
    this.weightable = Boolean;
    this.productPrice = {};
    this.productManufacturer = '';
    this.productStoreName = {};
    this.productImageUrl = '';
};


var productNum1 = new productCreator();
productNum1.serialNumber = 1;
productNum1.productName = 'Sony Playstation 4';
productNum1.productCategory = 'Game Consoles';
productNum1.weightable = false;
productNum1.productPrice = 1000;
productNum1.productManufacturer = 'Sony';
productNum1.productStoreName = 'Ofer Grand Mall';
productNum1.productImageUrl = '';


var productNum2 = new productCreator();
productNum2.serialNumber = 2;
productNum2.productName = 'Air Conditioner';
productNum2.productCategory = 'Electronics';
productNum2.weightable = false;
productNum2.productPrice = 800;
productNum2.productManufacturer = 'Tadiran';
productNum2.productStoreName = 'Mahsaney Hashmal';
productNum1.productImageUrl = '';


var productNum3 = new productCreator();
productNum3.serialNumber = 3;
productNum3.productName = 'Television';
productNum3.productCategory = 'Electronics';
productNum3.weightable = false;
productNum3.productPrice = 70;
productNum3.productManufacturer = 'Philips';
productNum3.productStoreName = 'Ofer Grand Mall';
productNum1.productImageUrl = '';


var productNum4 = new productCreator();
productNum4.serialNumber = 4;
productNum4.productName = 'Lamp';
productNum4.productCategory = 'Lights';
productNum4.weightable = false;
productNum4.productPrice = 40;
productNum4.productManufacturer = 'Electra';
productNum4.productStoreName = 'Dizengoff Mall';
productNum1.productImageUrl = '';


var productNum5 = new productCreator();
productNum5.serialNumber = 5;
productNum5.productName = 'Electric Bike';
productNum5.productCategory = 'Electronics';
productNum5.weightable = false;
productNum5.productPrice = 50;
productNum5.productManufacturer = 'Koning';
productNum5.productStoreName = 'Dizengoff Mall';
productNum1.productImageUrl = '';


//Meat products
var productNum6 = new productCreator();
productNum6.serialNumber = 6;
productNum6.productName = 'Microwave';
productNum6.productCategory = 'Electronics';
productNum6.weightable = true;
productNum6.productPrice = 80;
productNum6.productManufacturer = 'Galantz';
productNum6.productStoreName = 'Arena Mall';
productNum1.productImageUrl = '';


var productNum7 = new productCreator();
productNum7.serialNumber = 7;
productNum7.productName = 'Laptop';
productNum7.productCategory = 'Gadgets';
productNum7.weightable = true;
productNum7.productPrice = 70;
productNum7.productManufacturer = 'Lenovo';
productNum7.productStoreName = 'Dizengoff Mall';
productNum1.productImageUrl = '';


var productNum8 = new productCreator();
productNum8.serialNumber = 8;
productNum8.productName = 'MacBook';
productNum8.productCategory = 'Gadgets';
productNum8.weightable = true;
productNum8.productPrice = 90;
productNum8.productManufacturer = 'Apple';
productNum8.productStoreName = 'Traklin Hashmal';
productNum1.productImageUrl = '';


var productNum9 = new productCreator();
productNum9.serialNumber = 9;
productNum9.productName = 'iPhone';
productNum9.productCategory = 'Communications';
productNum9.weightable = true;
productNum9.productPrice = 60;
productNum9.productManufacturer = 'Apple';
productNum9.productStoreName = 'Arena Mall';
productNum1.productImageUrl = '';


var productNum10 = new productCreator();
productNum10.serialNumber = 10;
productNum10.productName = 'LG g5';
productNum10.productCategory = 'Communications';
productNum10.weightable = true;
productNum10.productPrice = 90;
productNum10.productManufacturer = 'LG';
productNum10.productStoreName = 'Dizengoff Mall';
productNum1.productImageUrl = '';

//Vegetables
var productNum11 = new productCreator();
productNum11.serialNumber = 11;
productNum11.productName = 'Xbox';
productNum11.productCategory = 'Game Consoles';
productNum11.weightable = true;
productNum11.productPrice = 30;
productNum11.productManufacturer = 'Microsoft';
productNum11.productStoreName = 'Dizengoff Mall';
productNum1.productImageUrl = '';


var productNum12 = new productCreator();
productNum12.serialNumber = 12;
productNum12.productName = 'Refrigerator';
productNum12.productCategory = 'Electronics';
productNum12.weightable = true;
productNum12.productPrice = 20;
productNum12.productManufacturer = 'Arena Mall';
productNum12.productStoreName = 'Ofer Grand Mall';
productNum1.productImageUrl = '';


var productNum13 = new productCreator();
productNum13.serialNumber = 13;
productNum13.productName = 'Iron';
productNum13.productCategory = 'Clothing';
productNum13.weightable = true;
productNum13.productPrice = 10;
productNum13.productManufacturer = 'Philips';
productNum13.productStoreName = 'Mahsaney Hashmal';
productNum1.productImageUrl = '';


var productNum14 = new productCreator();
productNum14.serialNumber = 14;
productNum14.productName = 'Shaving machine';
productNum14.productCategory = 'Hygiene';
productNum14.weightable = true;
productNum14.productPrice = 60;
productNum14.productManufacturer = 'Philips';
productNum14.productStoreName = 'Mahsaney Hashmal';
productNum1.productImageUrl = '';


var productNum15 = new productCreator();
productNum15.serialNumber = 15;
productNum15.productName = 'Toaster';
productNum15.productCategory = 'Electronics';
productNum15.weightable = true;
productNum15.productPrice = 40;
productNum15.productManufacturer = 'Kennedy';
productNum15.productStoreName = 'Ofer Grand Mall';
productNum1.productImageUrl = '';


var product1 = new Product(productNum1);
var product2 = new Product(productNum2);
var product3 = new Product(productNum3);
var product4 = new Product(productNum4);
var product5 = new Product(productNum5);
var product6 = new Product(productNum6);
var product7 = new Product(productNum7);
var product8 = new Product(productNum8);
var product9 = new Product(productNum9);
var product10 = new Product(productNum10);
var product11 = new Product(productNum11);
var product12 = new Product(productNum12);
var product13 = new Product(productNum13);
var product14 = new Product(productNum14);
var product15 = new Product(productNum15);


var ProductCollection =
    [product1, product2, product3, product4, product5,
        product6, product7, product8, product9, product10,
        product11, product12, product13, product14, product15];

module.exports = callback => {
    try {
        mongoose.connection.collections['products'].drop(err => {
            console.log('Products collection dropped');
            for (var i = 0; i < ProductCollection.length; i++) {
                console.log(`save product ${i}`);
                ProductCollection[i].save();
            }
        });
        return callback();
    }
    catch (err) {
        console.log(err);
        return callback(false);
    }
};