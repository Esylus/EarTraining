//---------------this is a routing sub-module for a specific page
//------name of page is implied in path name because of routing in app.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');

//-----when posting to users/register - create object and add user---
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

//Authenticate route
router.post('/authenticate', function(req, res, next){
    const username = req.body.username;       // get submitted name + password submitted
    const password = req.body.password;

    User.getUserByUsername(username, function(err, user){  // call db method
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }
        //------Check if passwords match, if they do, create token and respond to front
        User.comparePassword(password, user.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data:user}, config.secret, {
                    expiresIn: 604800 // 1 week
                });
            res.json({        // response for front end
                success: true,
                token: 'Bearer ' +token,
                user:{
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                }
            });
            } else{
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });

}); 

// Profile route
router.get('/profile', passport.authenticate('jwt', {session:false}), function(req, res, next){
    res.json({user: req.user});
}); 

module.exports = router;