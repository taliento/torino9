const Q = require('q');
const mongo = require('mongoskin');
const db = mongo.db(process.env.MONGODB_URI, { native_parser: true });
db.bind('page');

var service = {};
service.get = get;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
module.exports = service;

function get() {
  var deferred = Q.defer();
  db.page.find().toArray(function(err, pages) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(pages);
  });
  return deferred.promise;
}

function getById(_id) {
  var deferred = Q.defer();
  db.page.findById(_id, function(err, page) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (page == null) {
      deferred.resolve();
    } else {
      deferred.resolve(page);
    }
  });
  return deferred.promise;
}

function create(page) {
  var deferred = Q.defer();
  page.insertDate = new Date();
  db.page.insert(
    page,
    function(err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve(doc);
    });
    return deferred.promise;
  }

  function update(_id, page) {
    var deferred = Q.defer();
    // fields to update
    var set = {
      title: page.title,
      subtitle: page.subtitle,
      text: page.text,
      menuLabel: page.menuLabel,
      appPath: page.appPath,
      imgPath: page.imgPath,
      updateDate: new Date()
    };
    db.page.update(
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
      db.page.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function(err) {
          if (err) deferred.reject(err.name + ': ' + err.message);

          deferred.resolve();
        });
        return deferred.promise;
      }
