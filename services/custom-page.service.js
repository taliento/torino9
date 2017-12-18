/* jshint node: true */
'use strict';

const Q = require('q');
const mongo = require('mongoskin');

let service = {};
service.get = get;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function get(db) {
  let deferred = Q.defer();
  db.page.find().toArray((err, pages) => {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(pages);
  });
  return deferred.promise;
}


function getById(db, _id) {
  let deferred = Q.defer();
  db.page.findById(_id, (err, page) => {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (page == null) {
      deferred.reject('Not found!');
    } else {
      deferred.resolve(page);
    }
  });
  return deferred.promise;
}

function create(db, page) {
  let deferred = Q.defer();
  page.insertDate = new Date();
  db.page.insert(
    page,
    (err, doc) => {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve(doc);
    });
  return deferred.promise;
}

function update(db, _id, page) {

  let deferred = Q.defer();
  // fields to update
  let set = {
    title: page.title,
    subtitle: page.subtitle,
    text: page.text,
    menuLabel: page.menuLabel,
    appPath: page.appPath,
    updateDate: new Date()
  };

  if (page.imgPath) {
    set.imgPath = page.imgPath;
  }

  db.page.update({
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
  db.page.remove({
      _id: mongo.helper.toObjectID(_id)
    },
    (err) => {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });
  return deferred.promise;
}
