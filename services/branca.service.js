/* jshint node: true */
'use strict';

const Q = require('q');
const mongo = require('mongoskin');


let service = {};
service.get = get;
service.getAll = getAll;
service.create = create;
service.delete = _delete;
module.exports = service;

function getAll(db) {
  let deferred = Q.defer();

  db.branca.find().toArray((err, branca) => {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(branca);
  });
  return deferred.promise;
}

function get(db, _id) {
  let deferred = Q.defer();

  db.branca.findById(_id, (err, branca) => {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (branca == null) {
      deferred.reject('Not found!');
    } else {
      deferred.resolve(branca);
    }
  });
  return deferred.promise;
}

function create(db, branca) {
  let deferred = Q.defer();
  if (branca._id) {
    return update(db, branca._id, branca);
  }
  deferred.reject('no id found');
  return deferred.promise;
}

function update(db, _id, branca) {
  let deferred = Q.defer();
  // fields to update
  let set = {
    title: branca.title,
    subtitle: branca.subtitle,
    text: branca.text,
    updateDate: new Date()
  };

  if (branca.imgPath) {
    set.imgPath = branca.imgPath;
  }

  db.branca.update({
      _id: mongo.helper.toObjectID(_id)
    }, {
      $set: set
    }, {
      upsert: true
    },
    (err, doc) => {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve(doc);
    });
  return deferred.promise;
}

function _delete(db, _id) {
  let deferred = Q.defer();

  db.branca.remove({
      _id: mongo.helper.toObjectID(_id)
    },
    (err) => {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
  return deferred.promise;
}
