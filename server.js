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
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// use JWT auth to secure the api
app.use(expressJwt({ secret: config.secret }).
unless({ path: [
  '/users/authenticate',
  '/users/register',
  /^\/news\/.*/, '/news',
  /^\/calendar\/.*/,'/calendar',
  /^\/carousel\/.*/,'/carousel'
] }));

// routes
app.use('/users', require('./controllers/users.controller'));
app.use('/news', require('./controllers/news.controller'));
app.use('/calendar', require('./controllers/calendar.controller'));
app.use('/carousel', require('./controllers/carousel.controller'));


// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
