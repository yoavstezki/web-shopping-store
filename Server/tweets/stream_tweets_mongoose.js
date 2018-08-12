const mongoose = require('mongoose');
const Tweet = require('../models/tweet');
const config = require('../configurations/config');

const StreamTweets = module.exports;

module.exports.startTailableCursor = (onData) => {
    const cursor = Tweet
      .find()
      .tailable({ awaitdata : true })
      .cursor();
    //https://thecodebarbarian.com/cursors-in-mongoose-45
    cursor.on('data', (doc) => {
        onData(doc);
        // console.log('doc', doc);
    });
    
    cursor.on('close', function() {
        console.log('closing...');
    });

    cursor.on('error', error => {
        console.error(error);
        cursor.destroy();
    });
}