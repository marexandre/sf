'user strict';

var path = require('path');
global.appRoot = path.resolve(__dirname);

var bodyParser = require('body-parser');
var express    = require('express');
var exphbs     = require('express-handlebars');
var API        = require('./api/api');
var APP        = require('./app/app');
var middleware = require('./app/middleware');
var helpers    = require('./shared/js/helpers');

/*
 * Setup Handlebars
 */
var hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.handlebars',
  helpers: helpers.handlebarsHelpers
});

/**
 * API endpoint
 */
var api = express()
  .get('/ping', API.ping)
  .get('/getForum/:forum_type', middleware.delay, API.getForum)
  .post('/comment/', middleware.delay, API.postComment);


/**
 * Web endpoint
 */
var app = express()
  .engine('handlebars', hbs.engine)
  .set('view engine', 'handlebars')
  .use(bodyParser.urlencoded({extended: false}))
  .use(express.static(__dirname + '/public'));
  // Endpoints
  app
  .use('/api', api)
  .get('/', middleware.exposeTemplates(app, hbs), APP.index)
  .get('/category/:forum_id', middleware.exposeTemplates(app, hbs), APP.category)
  .get('/post/:post_id', middleware.exposeTemplates(app, hbs), APP.post)
  .get('/create', APP.create);


var port = process.env.PORT || 8999;
app.listen(port, function() {
  console.log('Point your browser at http://localhost:'+ port);
});
