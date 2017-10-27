const Q = require('q');
const mongo = require('mongoskin');
const db = mongo.db(process.env.MONGODB_URI, { native_parser: true });
db.bind('about');

var service = {};
service.get = get;
service.getById = getById;
service.create = create;
service.delete = _delete;

module.exports = service;

function get() {
  var deferred = Q.defer();
  db.about.findOne({},function (err, about) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if(about == null) {
      deferred.resolve();
    } else {
      deferred.resolve(about);
    }
  });
  return deferred.promise;
}

function getById(_id) {
  var deferred = Q.defer();
  db.about.findById(_id,function (err, about) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if(about == null) {
      deferred.resolve();
    } else {
      deferred.resolve(about);
    }
  });
  return deferred.promise;
}

function create(about) {
  var deferred = Q.defer();
  if(about._id) {
    return update(about._id,about);
  }
  about.insertDate = new Date();
  db.about.insert(
    about,
    function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve(doc);
    });
    return deferred.promise;
}

function update(_id, about) {
  var deferred = Q.defer();
  // fields to update
  var set = {
    title: about.title,
    subtitle: about.subtitle,
    text: about.text,
    links: about.links,
    updateDate: new Date()
  };
  db.about.update(
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
  db.about.remove(
    { _id: mongo.helper.toObjectID(_id) },
    function (err) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
    return deferred.promise;
  }
