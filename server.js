'user strict';

var path = require('path');
global.appRoot = path.resolve(__dirname);

var express    = require('express');
var exphbs     = require('express-handlebars');
var API        = require('./api/api');
var APP        = require('./app/app');
var middleware = require('./app/middleware');

/*
 * Setup Handlebars
 */
var numeral = require('numeral');
var moment = require('moment');
var hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.handlebars',
  helpers: {
    number: function(num) {
      return numeral(num).format('0,0');
    },
    breaklines: function(str) {
      return str
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/\n/g, '<br/>');
    },
    relativeTime: function(str) {
      return moment(str).fromNow();
    }
  }
});


/**
 * API endpoint
 */
var api = express()
  .get('/ping', API.ping)
  .get('/getForum/:forum_type', middleware.delay, API.getForum);


/**
 * Web endpoint
 */
var app = express()
  .engine('handlebars', hbs.engine)
  .set('view engine', 'handlebars')
  .use(express.static(__dirname + '/public'));
  // Endpoints
  app
  .use('/api', api)
  .get('/', middleware.exposeTemplates(app, hbs), APP.index)
  .get('/category/:forum_id', APP.category)
  .get('/post/:post_id', APP.post)
  .get('/create', APP.create);


var port = process.env.PORT || 8999;
app.listen(port, function() {
  console.log('Point your browser at http://localhost:'+ port);
});
