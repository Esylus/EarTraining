// this is a routing sub-module for a specific page 

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

// Register route
router.post('/register', function(req, res, next){
    let newUser = new User({  // new object fields
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, function(err, user){
        if(err){
            res.json({success: false, msg:'Failed to register user'});
        } else {
            res.json({success: true, msg: 'User Registered'});
        }
    });
});  

// Authenticate route
router.post('/authenticate', function(req, res, next){
    res.send('Authenticate');
}); 

// Profile route
router.get('/profile', function(req, res, next){
    res.send('Profile');
}); 



module.exports = router;