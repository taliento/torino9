/* jshint node: true */
"use strict";

const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const Q = require("q");
const publicImgPath = "/public/img/";

let service = {};
service.insert = insert;
service.update = update;
service._delete = _delete;
module.exports = service;

function insert(imgFile) {
  let deferred = Q.defer();
  let fileName = new Date().getTime() + imgFile.name;
  let imgPath = __dirname + "/.." + publicImgPath + fileName; //timestamp name
  imgFile.mv(imgPath, err => {
    //save file in filesystem
    if (err) deferred.reject(err.name + ": " + err.message);
    deferred.resolve(imgPath);
  });
  return deferred.promise;
}

function update(imgFile, imagePath) {
  let deferred = Q.defer();
  let oldPath = __dirname + "/.." + imagePath;
  _delete(oldPath)
    .then(() => {
      insert(imgFile)
        .then(path => {
          deferred.resolve(path);
        })
        .catch(err => {
          deferred.reject(err.name + ": " + err.message);
        });
    })
    .catch(err => {
      deferred.reject(err.name + ": " + err.message);
    });
  return deferred.promise;
}

function _delete(imgPath) {
  let deferred = Q.defer();
  if (fs.existsSync(imgPath)) {
    fs.unlink(imgPath, err => {
      if (err) deferred.reject(err.name + ": " + err.message);
      deferred.resolve();
    });
  } else {
    deferred.resolve();
  }
  return deferred.promise;
}
