const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose= require('mongoose');
const config= require('./configurations/config');
const ml = require('./models/searching_ml');

const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http); 
const Tweet = require('./models/tweet');
const StreamTweets = require('./tweets/stream_tweets_mongoose');

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

app.use(express.static(path.join(__dirname, 'public')))
    .use(express.static(path.join(__dirname, 'Client/src')))
    .use(bodyParser.json())
    .use('/users', users)
    .use('/products', products)
    .use('/shops', shops)
    .listen(port, () => console.log(`Server start on port ${port}`));

    //based on https://socket.io/docs/ - with Express
   io.on('connection', function(socket) {   
    function forwardTweetsToClient(data) {
        socket.emit('tweet', data) // emit to client
    }

    StreamTweets.startTailableCursor(forwardTweetsToClient);
});
