require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create link to Angular build directory
console.log(__dirname);
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// use JWT auth to secure the api
app.use(expressJwt({ secret: config.secret }).
unless({ path: [
  '/',
  '/users/authenticate',
  '/users/register',
  /^\/news\/.*/,
   '/news',
  /^\/carousel\/.*/,
  '/carousel',
  /^\/calendar\/.*/,
  /^\/calendar\/month\/.*/,
  '/calendar',
  /^\/featurette\/.*/,
  '/featurette',
  '/about',
  '/contact',
  /^\/branca\/.*/,'/branca'
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


// Initialize the app.
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
