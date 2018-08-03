const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//Port Number
const port = 8080;


const app = express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.static(path.join(__dirname, 'Client/src')))
    .use(bodyParser.json())
    .listen(port, () => console.log(`Server start on port ${port}`));

