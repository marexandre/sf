'user strict';

var express = require('express');
var exphbs  = require('express-handlebars');
var API     = require('./api/api');
var APP     = require('./app/app');

/**
 * API
 */
var api = express()
  .get('/ping', API.ping);

/**
 * Web App
 */
var app = express()
  .use('/api', api)
  .use(express.static(__dirname + '/public'))
  .engine('handlebars', exphbs({defaultLayout: 'layout'}))
  .set('view engine', 'handlebars');

app
  .get('/', APP.index);


var port = process.env.PORT || 8999;
app.listen(port, function() {
  console.log('Point your browser at http://localhost:'+ port);
});
