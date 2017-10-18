var config = require('../config.json');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(process.env.MONGODB_URI || config.connectionString, { native_parser: true });
db.bind('contact');

var service = {};
service.get = get;
service.getById = getById;
service.create = create;
service.delete = _delete;

module.exports = service;

function get() {
  var deferred = Q.defer();

  db.contact.findOne({},function (err, contact) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if(contact == null) {
      deferred.resolve();
    } else {
      deferred.resolve(contact);
    }

  });

  return deferred.promise;
}

function getById(_id) {
  var deferred = Q.defer();

  db.contact.findById(_id,function (err, contact) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if(contact == null) {
      deferred.resolve();
    } else {
      deferred.resolve(contact);
    }
  });

  return deferred.promise;
}

function create(contact) {
  var deferred = Q.defer();

  if(contact._id) {
    return update(contact._id,contact);
  }

  contact.insertDate = new Date();
  db.contact.insert(
    contact,
    function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve(doc);
    });

    return deferred.promise;
}

function update(_id, contact) {
  var deferred = Q.defer();

  // fields to update
  var set = {
    title: contact.title,
    subtitle: contact.subtitle,
    text: contact.text,
    contacts: contact.contacts,
    mapLat:contact.mapLat,
    mapLng:contact.mapLng,
    mapTitle:contact.mapTitle,
    updateDate: new Date()
  };

  db.contact.update(
    { _id: mongo.helper.toObjectID(_id) },
    { $set: set },
    function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve(doc);
    });

    return deferred.promise;
}

function _delete(_id) {
  var deferred = Q.defer();

  db.contact.remove(
    { _id: mongo.helper.toObjectID(_id) },
    function (err) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });

    return deferred.promise;
  }
