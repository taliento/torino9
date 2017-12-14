/* jshint node: true */
'use strict';

require('rootpath')();
const express = require('express');
const expressJwt = require('express-jwt');
const fileUpload = require('express-fileupload');
const imgurService = require('./services/imgur.service');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const _ = require('lodash');

const app = express();

//init imgurService
imgurService.configure();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db connection
app.locals.db = require('./datasource/mongoskin-datasource');

// file upload with default options
app.use(fileUpload());

// Create link to Angular build directory
const distDir = __dirname + '/dist/';
app.use(express.static(distDir));

//public img file path
app.use('/public/img/', express.static(path.join(__dirname, 'public/img')));

//API location
// use JWT auth to secure the api
app.use(expressJwt({ secret: process.env.SECRET }).
unless({ path: require('./routes/public-routes') }));

// routes
_.forEach(require('./routes/api-mapping'), (_route) => {
  app.use(_route.endpoint, require(_route.controller));
});

//error handling
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}
// function errorHandler(err, req, res, next) {
//   if (err.name === 'UnauthorizedError') {
//     res.redirect('/');
//     return;
//   }
//   if (res.headersSent) {
//     return next(err);
//   }
//   res.status(500);
//   res.render('error', { error: err });
// }

app.use(logErrors);
app.use(clientErrorHandler);
// app.use(errorHandler);

// application -------------------------------------------------------------
app.get('*', (req, res) => {
  res.sendFile(distDir + '/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// Initialize the app.
const server = app.listen(process.env.PORT || 3000, () => {
  const port = server.address().port;
  console.log('App now running on port', port);
});
