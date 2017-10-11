var config = require('config.json');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(process.env.MONGODB_URI || config.connectionString, { native_parser: true });
db.bind('about');

var service = {};
service.get = get;
service.create = create;
service.update = update;
module.exports = service;

function get() {
  var deferred = Q.defer();

  db.about.findOne({},function (err, about) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if(about == null) {
      deferred.resolve({});
    } else {
      deferred.resolve(about);
    }

  });

  return deferred.promise;
}

function create(about) {
  var deferred = Q.defer();
  about.insertDate = new Date();
  db.about.insert(
    about,
    function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
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

      deferred.resolve();
    });

    return deferred.promise;
}