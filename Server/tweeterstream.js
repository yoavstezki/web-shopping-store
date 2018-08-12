process.env.CONSUMER_KEY = 'BU4usNXIx0Yn6zDPs6XJSKfbf';
process.env.CONSUMER_SECRET = 'qGeN8DzmHvP5VnYS0UAiDQb9BQTm59NkgAngaVu5T4t4BwuK4l';
process.env.ACCESS_TOKEN = '1005414555726614528-EBCrCWnxgV2JynpG41oSl9MMUxpzaY';
process.env.ACCESS_SECRET = 'WVdjvLZYqEXPpgmD7hItesM3h6MVsy0fM32mdUjVhgYpM';

var Twitter = require('node-tweet-stream'), tw = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    token: process.env.ACCESS_TOKEN,
    token_secret: process.env.ACCESS_SECRET
});


const mongoose = require('mongoose');
const Tweet = require('./models/tweet');
const config = require('./configurations/config');

require('events').EventEmitter.defaultMaxListeners = Infinity;

//Connect to DB using config file
mongoose.connect(config.database);

//On connection event
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

//On error (connection to DB)
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);  // exit
    process.exit(1);
});

tw.track('meanstack');
tw.track('nodejs');
tw.track('angular');


tw.on('tweet', function (tweet) {
    console.log(tweet);

    let newTweet = new Tweet({
        created_at: tweet.created_at,
        tweet_id: tweet.id_str,
        text: tweet.text,
        user_id: tweet.user.id_str,
        user_name: tweet.user.name,
        user_image_url: tweet.user.profile_image_url,
        user_image_url_https: tweet.user.profile_image_url_https
    });

    console.log(newTweet);

    Tweet.addTweet(newTweet, err => console.log({success: false, msg: 'Failed to create tweet'}),
        data => console.log({success: true, msg: 'tweet Created'}));
});