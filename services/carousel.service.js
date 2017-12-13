/* jshint node: true */
'use strict';

const Q = require('q');
const mongo = require('mongoskin');


var service = {};
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.getPaged = getPaged;
service.count = count;
module.exports = service;

function getAll(db) {
  var deferred = Q.defer();

  db.carousel.find().sort({insertDate: -1}).toArray(function(err, carousel) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(carousel);
  });
  return deferred.promise;
}

function count(db) {
  var deferred = Q.defer();
  
  db.carousel.count({}, function(err, _count) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve({'count': _count});
  });
  return deferred.promise;
}

function getPaged(db,_limit, _page, _size) {
  var deferred = Q.defer();
  var _skip = _page * _limit;

  db.carousel.find({}, null, {limit: _limit * 1, skip: _skip, sort: [['insertDate', -1]]}).toArray(function(err, carousel) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(carousel);
  });
  return deferred.promise;
}

function getById(db,_id) {
  var deferred = Q.defer();

  db.carousel.findById(_id, function(err, carousel) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (carousel) {
      deferred.resolve(carousel);
    } else {
      // carousel not found
      deferred.resolve();
    }
  });
  return deferred.promise;
}

function create(db,carousel) {
  var deferred = Q.defer();
  carousel.insertDate = new Date();

  db.carousel.insert(
    carousel,
    function(err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve(doc);
    });
    return deferred.promise;
}

function update(db,_id, carousel) {
  var deferred = Q.defer();
  // fields to update
  var set = {
    title: carousel.title,
    imgPath: carousel.imgPath,
    text: carousel.text,
    btnText: carousel.btnText,
    btnHref: carousel.btnHref,
    alt: carousel.alt,
    position: carousel.position,
    updateDate: new Date()
  };

  db.carousel.update(
    { _id: mongo.helper.toObjectID(_id) },
    { $set: set },
    function(err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
    return deferred.promise;
}

function _delete(db,_id) {
  var deferred = Q.defer();

  db.carousel.remove(
    { _id: mongo.helper.toObjectID(_id) },
    function(err) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
    return deferred.promise;
}
