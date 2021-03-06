const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');
const ml = require('./models/searching_ml');

const app = express();
const http = require('http').Server(app);


const io = require('socket.io')(http);
const Tweet = require('./models/tweet');
const StreamTweets = require('./tweets/stream_tweets_mongoose');


const passport = require('passport');


// mongoose connetion
mongoose.connect(config.database);
mongoose.connection
    .on('open', () => console.log('Connected to db'))
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
    .use(passport.initialize())
    .use((passport.session()))
    .use(bodyParser.json())
    .use('/api/users', users)
    .use('/api/products', products)
    .use('/api/shops', shops);

require('./config/passport')(passport);
//based on https://socket.io/docs/ - with Express
io.on('connection', function (socket) {
    function forwardTweetsToClient(data) {
        socket.emit('tweet', data) // emit to client
    }

    StreamTweets.startTailableCursor(forwardTweetsToClient);
});


http.listen(port, () => {
    console.log('Server listening at port %d', port);
});