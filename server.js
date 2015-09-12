'user strict';

var path = require('path');
global.appRoot = path.resolve(__dirname);

var express = require('express');
var exphbs  = require('express-handlebars');
var API     = require('./api/api');
var APP     = require('./app/app');

var numeral = require('numeral');
var hbs = exphbs({
  defaultLayout: 'layout',
  // Specify helpers which are only registered on this instance.
  helpers: {
    number: function(num) {
      return numeral(num).format('0,0');
    },
    breaklines: function(str) {
      return str
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/\n/g, '<br/>');
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
  .engine('handlebars', hbs)
  .set('view engine', 'handlebars');

app
  .get('/', APP.index)
  .get('/category/:forum_id', APP.category)
  .get('/post/:post_id', APP.post);


var port = process.env.PORT || 8999;
app.listen(port, function() {
  console.log('Point your browser at http://localhost:'+ port);
});
