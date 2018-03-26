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

//-----------------------------------------------------

const users = require('./routes/users'); // sub-routing variable to use below

const app = express();  // create instance to use
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

//set static folder to place front-end app in 
app.use(express.static(path.join(__dirname, 'public'))); 

app.use('/users', users);  // routing to users folder where another js
//app.use('/scores', scores); etc...

app.get('/', function (req, res) {
    res.send('Invalid Enpoint');
});

app.listen(port, function(){
    console.log('Server started on port ' + port);
});
