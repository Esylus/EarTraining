//---User class contains db schema and db access methods

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//--------Info to store---------------------
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
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

//----------------Export schema to use in sub-router-----
const User = module.exports = mongoose.model('User', UserSchema);

//---------------Export DB helper methods---------------
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}

// add user and hash their password
module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, function (err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    });
}

// validate submitted password to database
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
};






