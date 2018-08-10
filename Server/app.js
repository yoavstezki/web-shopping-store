const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const users = require('./routes/users');

//Port Number
const port = 8080;

const app = express();

const http = require('http').Server(app);

app.use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json())
    .get('/api/healthy', (res, req, next) => req.status(200).json({success: true}))
    .use('/api/users', users);

http.listen(port, () => {
    console.log('Server listening at port %d', port);
});