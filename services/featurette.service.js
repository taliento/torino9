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
  db.featurette.find().toArray((err, featuretteList) => {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(featuretteList);
  });
  return deferred.promise;
}

function count(db) {
  let deferred = Q.defer();
  db.featurette.count({}, (err, _count) => {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve({
      'count': _count
    });
  });
  return deferred.promise;
}

function getPaged(db, _limit, _page, _size) {
  let deferred = Q.defer();
  let _skip = _page * _limit;
  db.featurette.find({}, null, {
    limit: _limit * 1,
    skip: _skip,
    sort: [
      ['insertDate', -1]
    ]
  }).toArray((err, featuretteList) => {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(featuretteList);
  });
  return deferred.promise;
}

function getById(db, _id) {
  let deferred = Q.defer();
  db.featurette.findById(_id, (err, featurette) => {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (featurette) {
      deferred.resolve(featurette);
    } else {
      // featurette not found
      deferred.resolve();
    }
  });
  return deferred.promise;
}

function create(db, featuretteParam) {
  let deferred = Q.defer();
  featuretteParam.insertDate = new Date();
  db.featurette.insert(
    featuretteParam,
    (err, doc) => {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve(doc);
    });
  return deferred.promise;
}

function update(db, _id, featuretteParam) {
  let deferred = Q.defer();
  // fields to update
  let set = {
    title: featuretteParam.title,
    subTitle: featuretteParam.subTitle,
    text: featuretteParam.text,
    updateDate: new Date()
  };

  if (featuretteParam.imgPath) {
    set.imgPath = featuretteParam.imgPath;
  }

  db.featurette.update({
      _id: mongo.helper.toObjectID(_id)
    }, {
      $set: set
    },
    (err, doc) => {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
  return deferred.promise;
}

function _delete(db, _id) {
  let deferred = Q.defer();
  db.featurette.remove({
      _id: mongo.helper.toObjectID(_id)
    },
    (err) => {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
  return deferred.promise;
}
