const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose= require('mongoose');
const config= require('./configurations/config');
const ml = require('./models/searching_ml');
// mongoose connetion
mongoose.connect(config.database);
mongoose.connection
 .once('open', () => console.log('Connected to db'))
 .on('error', (error) => {
 console.warn('db error', error);
 });

//Port Number
const port = 8080;

const users = require('./routes/users.js');

const products = require('./routes/products.js');
const shops = require('./routes/shops.js');

const app = express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.static(path.join(__dirname, 'Client/src')))
    .use(bodyParser.json())
    .use('/api/users', users)
    .use('/api/products', products)
    .use('/api/shops', shops)
    .listen(port, () => console.log(`Server start on port ${port}`));

http.listen(port, () => {
    console.log('Server listening at port %d', port);
});