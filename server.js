// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

//////////////////will probably need to require a schema here///////////


// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000;


// use morgan and bodyparser with our app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));


// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

//set up public route
app.use(express.static('./public'));


// MongoDB Configuration
mongoose.connect('mongodb://heroku_cd8n74fc:@ds011734.mlab.com:11734/heroku_cd8n74fc');
// mongoose.connect('mongodb://localhost/nyt-react');
var db = mongoose.connection;

//MongoDB status
db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function () {
  console.log('Mongoose connection successful.');
});




//Routes
require('./app/routing/routes.js')(app);




//////////////////////////////////////////////////////////////////////////////////

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});





























