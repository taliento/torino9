const Q = require('q');
const mongo = require('mongoskin');
const db = mongo.db(process.env.MONGODB_URI, { native_parser: true });
db.bind('news');

var service = {};
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.getPaged = getPaged;
service.count = count;
module.exports = service;

function getAll() {
  var deferred = Q.defer();
  db.news.find().toArray(function(err, newsList) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(newsList);
  });
  return deferred.promise;
}

function count() {
  var deferred = Q.defer();
  db.news.count({}, function(err, _count) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve({'count': _count});
  });
  return deferred.promise;
}

function getPaged(_limit, _page, _size) {
  var deferred = Q.defer();
  var _skip = _page * _limit;
  db.news.find({}, null, {limit: _limit * 1, skip: _skip, sort: [['insertDate', -1]]}).toArray(function(err, newsList) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(newsList);
  });
  return deferred.promise;
}

function getById(_id) {
  var deferred = Q.defer();
  db.news.findById(_id, function(err, news) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (news) {
      deferred.resolve(news);
    } else {
      // news not found
      deferred.resolve();
    }
  });
  return deferred.promise;
}

function create(newsParam) {
  var deferred = Q.defer();
  newsParam.insertDate = new Date();
  db.news.insert(
    newsParam,
    function(err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve(doc);
    });
  return deferred.promise;
}

function update(_id, newsParam) {
  var deferred = Q.defer();
  // fields to update
  var set = {
    title: newsParam.title,
    subTitle: newsParam.title,
    imgPath: newsParam.imgPath,
    text: newsParam.text,
    updateDate: new Date()
  };
  db.news.update(
    { _id: mongo.helper.toObjectID(_id) },
    { $set: set },
    function(err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
  return deferred.promise;
}

function _delete(_id) {
  var deferred = Q.defer();
  db.news.remove(
    { _id: mongo.helper.toObjectID(_id) },
    function(err) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve();
    });
  return deferred.promise;
}
