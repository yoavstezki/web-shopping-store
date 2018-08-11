console.log("user model");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

console.log("user model after requires");

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model("User", UserSchema);

module.exports.getUserById = (id) => {
    return User.findById(id);
};

module.exports.addUser = (newUser, errorAction, callbcakAction) => {
    User.findOne({'username': newUser.username}, (err, user) => {
        if (user) {
            errorAction("User is already exists!");
        }
        else {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return errorAction("Internal error");
                }
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        errorAction("Internal error");
                    }
                    newUser.password = hash;
                    newUser.save()
                        .then(callbcakAction)
                        .catch(err => errorAction("Failed to save the user in thd daatabase."));
                });
            });
        }
    });
};

module.exports.comparePassword = (username, candidatePassword, errorAction, callbackAction) => {
    User.findOne({'username': username}, (err, user) => {
        if (err) {
            errorAction(err);
        }
        else {
            bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
                if (err || isMatch == false) {
                    errorAction(err);
                }
                else {
                    callbackAction();
                }
            });
        }
    });
};

module.exports.findUser = (username, errorAction, userAction) => {
    return User.findOne({'username': username});
};

module.exports.findAllUsers = (errorAction, usersAction) => User.find((err, users) => {
    if (users) {
        usersAction(users);
    }
    else {
        errorAction(err);
    }
});

module.exports.deleteUser = (username, errorAction, callbcakAction) => {
    User.findOneAndDelete({'username': username}, (err, callback) => {
        if (callback) {
            callbcakAction(callback);
        }
        else {
            errorAction(err);
        }
    })
};
