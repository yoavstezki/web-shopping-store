const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../configurations/config');

const BYTE_CAP = 100000;

const TweetSchema = mongoose.Schema({
    tweet_id: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    user_image_url: {
        type: String,
        required: true
    },
    user_image_url_https: {
        type: String,
        required: true
    }
},
    // read https://coderwall.com/p/c8cr1q/tailable-cursors-in-mongodb
    // https://docs.mongodb.com/manual/core/capped-collections/
    // https://docs.mongodb.com/manual/core/tailable-cursors/
    { capped: BYTE_CAP } );

const Tweet = module.exports = mongoose.model('Tweet', TweetSchema);

module.exports.addTweet = (newTweet, errorAction, callbackAction) => {
    console.log("Add new tweet");
    newTweet.save((error, data) =>{
        if(error) {
            errorAction(error);
        }
        else{
            callbackAction(data);
        }
    });
}