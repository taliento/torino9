/* jshint node: true */
'use strict';

const Q = require('q');
const mongo = require('mongoskin');

let service = {};
service.get = get;
service.getById = getById;
service.create = create;
service.delete = _delete;

module.exports = service;

function get(db) {
  let deferred = Q.defer();

  db.about.findOne({}, (err, about) => {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (about == null) {
      deferred.resolve();
    } else {
      deferred.resolve(about);
    }
  });
  return deferred.promise;
}

function getById(db, _id) {
  let deferred = Q.defer();

  db.about.findById(_id, (err, about) => {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (about == null) {
      deferred.resolve();
    } else {
      deferred.resolve(about);
    }
  });
  return deferred.promise;
}

function create(db, about) {
  let deferred = Q.defer();
  if (about._id) {
    return update(db, about._id, about);
  }
  about.insertDate = new Date();

  db.about.insert(about, (err, doc) => {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(doc);
  });
  return deferred.promise;
}

function update(db, _id, about) {
  let deferred = Q.defer();
  // fields to update
  let set = {
    title: about.title,
    subtitle: about.subtitle,
    text: about.text,
    links: about.links,
    updateDate: new Date()
  };

  db.about.update({
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

  db.about.remove({
      _id: mongo.helper.toObjectID(_id)
    },
    (err) => {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
  return deferred.promise;
}
