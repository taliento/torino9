require('rootpath')();
var express = require('express');
var expressJwt = require('express-jwt');
var cors = require('cors');
var bodyParser = require('body-parser');
var config = require('config.json');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

//API location
// use JWT auth to secure the api
app.use(expressJwt({ secret: (process.env.SECRET || config.secret) }).
unless({ path: [
  //public app routes
  '/news',
  '/calendar',
  '/about',
  '/contact',
  '/login',
  '/admin',
  /^\/branca\/get\/.*/,

  //public api routes
  '/api/users/authenticate',
  '/api/users/register',
   '/api/news',
   '/api/news/count',
   /^\/api\/news\/get\/.*/,
   /^\/api\/news\/paged\/.*/,
  '/api/carousel',
  '/api/carousel/count',
  /^\/api\/carousel\/get\/.*/,
  /^\/api\/carousel\/paged\/.*/,
  '/api/calendar',
  /^\/api\/calendar\/month\/.*/,
  /^\/api\/calendar\/get\/.*/,
  '/api/featurette',
  '/api/featurette/count',
  /^\/api\/featurette\/get\/.*/,
  /^\/api\/featurette\/paged\/.*/,
  '/api/about',
  /^\/api\/about\/get\/.*/,
  '/api/contact',
  /^\/api\/contact\/get\/.*/,
  '/api/branca',
  /^\/api\/branca\/get\/.*/
] }));

// routes
app.use('/api/users', require('./controllers/users.controller'));
app.use('/api/news', require('./controllers/news.controller'));
app.use('/api/calendar', require('./controllers/calendar.controller'));
app.use('/api/carousel', require('./controllers/carousel.controller'));
app.use('/api/featurette', require('./controllers/featurette.controller'));
app.use('/api/about', require('./controllers/about-page.controller'));
app.use('/api/contact', require('./controllers/contact-page.controller'));
app.use('/api/branca', require('./controllers/branca.controller'));

// application -------------------------------------------------------------
app.get('*', function (req, res) {
    res.sendFile(distDir + '/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

//error handling
function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}
function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}
function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// Initialize the app.
var server = app.listen(process.env.PORT || config.port, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
