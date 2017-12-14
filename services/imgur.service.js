/* jshint node: true */
'use strict';

const Q = require('q');
const path = require('path');
const imgur = require('imgur');

var service = {};
service.upload = upload;
service.configure = configure;
module.exports = service;

function configure() {
  imgur.setCredentials(process.env.IMGUR_USERNAME, process.env.IMGUR_PASSWORD, process.env.IMGUR_CLIENTID);
}

function upload(filePath) {
  var deferred = Q.defer();

  // A single image
  imgur.uploadFile(path.resolve(filePath))
  .then(function (json) {
    deferred.resolve(json.data.link);
  })
  .catch(function (err) {
    console.error("Imgur service error: " + JSON.stringify(err.message));
    deferred.reject(err.name + ': ' + err.message);
  });

  return deferred.promise;
}
