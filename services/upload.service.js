'use strict';

const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const Q = require('q');
const publicImgPath = '/public/img';

var service = {};
service.insert = insert;
service.update = update;
service._delete = _delete;
module.exports = service;

function insert(imgFile) {
  var deferred = Q.defer();
  var fileName = new Date().getTime() + imgFile.name;
  var imgPath = __dirname + '/..' + publicImgPath + fileName;//timestamp name
  imgFile.mv(imgPath, function(err) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(publicImgPath + fileName);
  });
  return deferred.promise;
}

function update(imgFile, imagePath) {
  var deferred = Q.defer();
  var oldPath = __dirname + '/..' + imagePath;
  _delete(oldPath).then(function() {
    insert(imgFile).then(function(path) {
      deferred.resolve(path);
    }).catch(function(err) {
      res.status(400).send(err);
    });
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
  return deferred.promise;
}

function _delete(imgPath) {
  var deferred = Q.defer();
  if (fs.existsSync(imgPath)) {
    fs.unlink(imgPath, function(err) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
  } else {
    deferred.resolve();
  }
  return deferred.promise;
}
