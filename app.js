//-----------------------------Dependencies-------------
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

//-----------------------------DB Routing---------------
const config = require('./config/database');
mongoose.connect(config.database);  // call connect string

mongoose.connection.on('connected', function(){
    console.log('Connected to database' + config.database);
});

mongoose.connection.on('error', function(err){
    console.log('Database error' + err);
});

//--------------Sub Router var setup-------------------------------
const users = require('./routes/users'); // sub-routing variable to use below

//--------------Basic express setup---------------------------------
const app = express();  // create instance to use
const port = 3000;

//--------------Body parser + cors Middleware-------------------------------
app.use(bodyParser.json());
app.use(cors());

//--------------Passport (Authentication) Middleware-----------------------------
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//--------------Set path to front-end code (angular)---------- 
app.use(express.static(path.join(__dirname, 'public'))); 

//--------------------Set path to sub router---------------------
app.use('/users', users);  // routing to users folder where another js
//app.use('/scores', scores); etc...

//-------------Default endpoint - If get is called on home - respond with message
app.get('/', function (req, res) {
    res.send('Invalid Enpoint');
});

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//-------------------------Tells express to listen to a port-------------

app.listen(port, function(){
    console.log('Server started on port ' + port);
});
