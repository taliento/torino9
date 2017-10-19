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

//API location
// use JWT auth to secure the api
app.use(expressJwt({ secret: (process.env.SECRET || config.secret) }).
unless({ path: [
  '/users/authenticate',
  '/users/register',
   '/news',
   '/news/count',
   /^\/news\/get\/.*/,
   /^\/news\/paged\/.*/,
  '/carousel',
  '/carousel/count',
  /^\/carousel\/get\/.*/,
  /^\/carousel\/paged\/.*/,
  '/calendar',
  /^\/calendar\/month\/.*/,
  /^\/calendar\/get\/.*/,
  '/featurette',
  '/featurette/count',
  /^\/featurette\/get\/.*/,
  /^\/featurette\/paged\/.*/,
  '/about',
  /^\/about\/get\/.*/,
  '/contact',
  /^\/contact\/get\/.*/,
  '/branca',
  /^\/branca\/get\/.*/
] }));

// routes
app.use('/users', require('./controllers/users.controller'));
app.use('/news', require('./controllers/news.controller'));
app.use('/calendar', require('./controllers/calendar.controller'));
app.use('/carousel', require('./controllers/carousel.controller'));
app.use('/featurette', require('./controllers/featurette.controller'));
app.use('/about', require('./controllers/about-page.controller'));
app.use('/contact', require('./controllers/contact-page.controller'));
app.use('/branca', require('./controllers/branca.controller'));

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

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
// app.use(express.static(distDir));
app.get('*', function(req,res) {
  res.sendFile(path.join(distDir));
})


// Initialize the app.
var server = app.listen(process.env.PORT || config.port, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
