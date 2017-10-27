require('rootpath')();
const express = require('express');
const expressJwt = require('express-jwt');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// file upload with default options
app.use(fileUpload());

// Create link to Angular build directory
const distDir = __dirname + "/dist/";
app.use(express.static(distDir));

//public img file path
app.use('/public/img/',express.static(path.join(__dirname, 'public/img')));

//API location
// use JWT auth to secure the api
app.use(expressJwt({ secret: process.env.SECRET }).
unless({ path: [
  //public app routes
  '/news',
  '/calendar',
  '/about',
  '/contact',
  '/login',
  '/admin',
  /^\/branca\/.*/,
  //public img folder
  /^\/public\/img\/.*/,
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

//error handling
function logErrors (err, req, res, next) {
  console.error(err.stack);
  next(err);
}
function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}
function errorHandler (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.redirect('/');
    return;
  }
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// // application -------------------------------------------------------------
app.get('*', function (req, res) {
  res.sendFile(distDir + '/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// Initialize the app.
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
