'user strict';

var path = require('path');
global.appRoot = path.resolve(__dirname);

var express = require('express');
var exphbs  = require('express-handlebars');
var API     = require('./api/api');
var APP     = require('./app/app');

var numeral = require('numeral');
var hbs = exphbs.create({
  defaultLayout: 'layout',
  // Specify helpers which are only registered on this instance.
  helpers: {
    number: function() {
      [].unshift.call(arguments, 'number');
      return numeral(arguments[1]).format('0,0');
    }
  }
});

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
  .engine('handlebars', hbs.engine)
  .set('view engine', 'handlebars');

app
  .get('/', APP.index)
  .get('/category/:forum_id', APP.category);


var port = process.env.PORT || 8999;
app.listen(port, function() {
  console.log('Point your browser at http://localhost:'+ port);
});
