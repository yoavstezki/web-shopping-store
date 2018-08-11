const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config');

module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserById(jwt_payload._id)
            .then(data => data._doc)
            .then(user => {
                if (user) {
                    return done(null, {name: user.name, username: user.username, email: user.email});
                } else {
                    return done(null, false);
                }
            })
            .catch(err => {
                if (err) {
                    return done(err, false);
                }
            });
    }));
};