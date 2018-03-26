// this is a routing sub-module for a specific page 

const express = require('express');
const router = express.Router();

// Register route
router.get('/register', function(req, res, next){
    res.send('Register');
});  

// Authenticate route
router.post('/authenticate', function(req, res, next){
    res.send('Authenticate');
}); 

// Profile route
router.get('/profile', function(req, res, next){
    res.send('Profile');
}); 

// Validate route
router.get('/validate', function(req, res, next){
    res.send('Validate');
}); 


module.exports = router;