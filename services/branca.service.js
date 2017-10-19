var config = require('../config.json');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(process.env.MONGODB_URI || config.connectionString, { native_parser: true });
db.bind('branca');

var service = {};
service.get = get;
service.getAll = getAll;
service.create = create;
service.delete = _delete;

module.exports = service;


function getAll() {
  var deferred = Q.defer();

  db.branca.find().toArray(function (err, branca) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(branca);
  });

  return deferred.promise;
}

function get(_id) {
  var deferred = Q.defer();

  db.branca.findById(_id,function (err, branca) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if(branca == null) {
      deferred.reject("Not found!");
    } else {
      deferred.resolve(branca);
    }

  });
  return deferred.promise;
}

function create(branca) {
  var deferred = Q.defer();

  if(branca._id) {
    return update(branca._id,branca);
  }
  deferred.reject("no id found");

  return deferred.promise;
}

function update(_id, branca) {
  var deferred = Q.defer();

  // fields to update
  var set = {
    title: branca.title,
    subtitle: branca.subtitle,
    text: branca.text,
    imgPath: branca.imgPath,
    updateDate: new Date()
  };

  db.branca.update(
    { _id: mongo.helper.toObjectID(_id) },
    { $set: set },
    {upsert:true},
    function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve(doc);
    });

    return deferred.promise;
}

function _delete(_id) {
  var deferred = Q.defer();

  db.branca.remove(
    { _id: mongo.helper.toObjectID(_id) },
    function (err) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });

    return deferred.promise;
  }
