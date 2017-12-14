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
  db.contact.findOne({},(err, contact) => {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (contact == null) {
      deferred.resolve();
    } else {
      deferred.resolve(contact);
    }
  });
  return deferred.promise;
}

function getById(db,_id) {
  let deferred = Q.defer();
  db.contact.findById(_id, (err, contact) => {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (contact == null) {
      deferred.resolve();
    } else {
      deferred.resolve(contact);
    }
  });
  return deferred.promise;
}

function create(db,contact) {
  let deferred = Q.defer();
  if (contact._id) {
    return update(db,contact._id, contact);
  }
  contact.insertDate = new Date();
  db.contact.insert(
    contact,
    (err, doc) => {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve(doc);
    });
    return deferred.promise;
  }

  function update(db,_id, contact) {
    let deferred = Q.defer();
    // fields to update
    let set = {
      title: contact.title,
      subtitle: contact.subtitle,
      text: contact.text,
      contacts: contact.contacts,
      mapLat: contact.mapLat,
      mapLng: contact.mapLng,
      mapTitle: contact.mapTitle,
      updateDate: new Date()
    };
    db.contact.update(
      { _id: mongo.helper.toObjectID(_id) },
      { $set: set },
      (err, doc) => {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve(doc);
      });
      return deferred.promise;
    }

    function _delete(db,_id) {
      let deferred = Q.defer();
      db.contact.remove(
        { _id: mongo.helper.toObjectID(_id) },
        (err) => {
          if (err) deferred.reject(err.name + ': ' + err.message);

          deferred.resolve();
        });
        return deferred.promise;
      }
