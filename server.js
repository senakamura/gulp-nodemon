var express = require('express');
var app = express();

var config = require('./config.json');


var greet = require('./app');

app.use(express.static('public'));

app.listen(config.port, function() {
  console.log('Starting up Express!');
  greet('Express');
});
