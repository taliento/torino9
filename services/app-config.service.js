/* jshint node: true */
'use strict';

const Q = require('q');
const mongo = require('mongoskin');


var service = {};
service.get = get;
service.create = create;
service.delete = _delete;

module.exports = service;

function get(db) {
  var deferred = Q.defer();

  db.config.findOne({},function(err, config) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (config == null) {
      deferred.resolve();
    } else {
      deferred.resolve(config);
    }
  });
  return deferred.promise;
}

function create(db,config) {
  var deferred = Q.defer();
  if (config._id) {
    return update(db,config._id, config);
  }
  config.insertDate = new Date();

  db.config.insert(
    config,
    function(err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve(doc);
    });
    return deferred.promise;
}

function update(db,_id, config) {
  var deferred = Q.defer();
  // fields to update
  var set = {
    title: config.title,
    updateDate: new Date()
  };

  db.config.update(
    { _id: mongo.helper.toObjectID(_id) },
    { $set: set },
    function(err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve(doc);
    });
    return deferred.promise;
}

function _delete(db,_id) {
  var deferred = Q.defer();

  db.config.remove(
    { _id: mongo.helper.toObjectID(_id) },
    function(err) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
    return deferred.promise;
  }
