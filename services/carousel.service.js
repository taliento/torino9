/* jshint node: true */
'use strict';

const Q = require('q');
const mongo = require('mongoskin');


let service = {};
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.getPaged = getPaged;
service.count = count;
module.exports = service;

function getAll(db) {
  let deferred = Q.defer();

  db.carousel.find().sort({insertDate: -1}).toArray((err, carousel) => {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(carousel);
  });
  return deferred.promise;
}

function count(db) {
  let deferred = Q.defer();

  db.carousel.count({}, (err, _count) => {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve({'count': _count});
  });
  return deferred.promise;
}

function getPaged(db,_limit, _page, _size) {
  let deferred = Q.defer();
  let _skip = _page * _limit;

  db.carousel.find({}, null, {limit: _limit * 1, skip: _skip, sort: [['insertDate', -1]]}).toArray((err, carousel) => {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(carousel);
  });
  return deferred.promise;
}

function getById(db,_id) {
  let deferred = Q.defer();

  db.carousel.findById(_id, (err, carousel) => {
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
  let deferred = Q.defer();
  carousel.insertDate = new Date();

  db.carousel.insert(
    carousel,
    (err, doc) => {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve(doc);
    });
    return deferred.promise;
}

function update(db,_id, carousel) {
  let deferred = Q.defer();
  // fields to update
  let set = {
    title: carousel.title,
    text: carousel.text,
    btnText: carousel.btnText,
    btnHref: carousel.btnHref,
    alt: carousel.alt,
    position: carousel.position,
    updateDate: new Date()
  };

  if(carousel.imgPath) {
    set.imgPath = carousel.imgPath;
  }

  db.carousel.update(
    { _id: mongo.helper.toObjectID(_id) },
    { $set: set },
    (err, doc) => {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
    return deferred.promise;
}

function _delete(db,_id) {
  let deferred = Q.defer();

  db.carousel.remove(
    { _id: mongo.helper.toObjectID(_id) },
    (err) => {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
    return deferred.promise;
}
