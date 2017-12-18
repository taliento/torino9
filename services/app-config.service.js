/* jshint node: true */
'use strict';

const Q = require('q');
const mongo = require('mongoskin');


let service = {};
service.get = get;
service.create = create;
service.delete = _delete;

module.exports = service;

function get(db) {
  let deferred = Q.defer();

  db.config.findOne({}, (err, config) => {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (config == null) {
      deferred.resolve();
    } else {
      deferred.resolve(config);
    }
  });
  return deferred.promise;
}

function create(db, config) {
  let deferred = Q.defer();
  if (config._id) {
    return update(db, config._id, config);
  }
  config.insertDate = new Date();

  db.config.insert(config, (err, doc) => {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(doc);
  });
  return deferred.promise;
}

function update(db, _id, config) {
  let deferred = Q.defer();
  // fields to update
  let set = {
    title: config.title,
    updateDate: new Date()
  };

  db.config.update({
      _id: mongo.helper.toObjectID(_id)
    }, {
      $set: set
    },
    (err, doc) => {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve(doc);
    });
  return deferred.promise;
}

function _delete(db, _id) {
  let deferred = Q.defer();

  db.config.remove({
      _id: mongo.helper.toObjectID(_id)
    },
    (err) => {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
  return deferred.promise;
}
