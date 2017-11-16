const Q = require('q');
const mongo = require('mongoskin');
const db = mongo.db(process.env.MONGODB_URI, { native_parser: true });
db.bind('config');

var service = {};
service.get = get;
service.create = create;
service.delete = _delete;

module.exports = service;

function get() {
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

function create(config) {
  var deferred = Q.defer();
  if (config._id) {
    return update(config._id, config);
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

function update(_id, config) {
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

function _delete(_id) {
  var deferred = Q.defer();
  db.config.remove(
    { _id: mongo.helper.toObjectID(_id) },
    function(err) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
    return deferred.promise;
  }
