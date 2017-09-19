var config = require('config.json');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(process.env.MONGODB_URI, { native_parser: true });
db.bind('carousel');

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

  db.carousel.find().toArray(function (err, carousel) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(carousel);
  });

  return deferred.promise;
}

function count() {

  var deferred = Q.defer();

  db.carousel.count({}, function(err, _count) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve({'count':_count});
  });

  return deferred.promise;
}

function getPaged(_limit, _page, _size) {

  var deferred = Q.defer();

  var _skip = _page * _limit;

  db.carousel.find({}, null, {limit: _limit*1, skip: _skip}).toArray(function (err, carousel) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(carousel);
  });

  return deferred.promise;
}

function getById(_id) {
  var deferred = Q.defer();

  db.carousel.findById(_id, function (err, carousel) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (carousel) {
      deferred.resolve(carousel);
    } else {
      // carousel not found
      deferred.resolve();
    }
  });

  return deferred.promise;
}

function create(carousel) {
  var deferred = Q.defer();
  carousel.insertDate = new Date();
  db.carousel.insert(
    carousel,
    function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });

    return deferred.promise;
}

function update(_id, carousel) {
  var deferred = Q.defer();

  // fields to update
  var set = {
    title: carousel.title,
    imgPath: carousel.imgPath,
    text: carousel.text,
    btnText: carousel.btnText,
    btnHref:carousel.btnHref,
    alt: carousel.alt,
    updateDate: new Date()
  };

  db.carousel.update(
    { _id: mongo.helper.toObjectID(_id) },
    { $set: set },
    function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });

    return deferred.promise;
}

function _delete(_id) {
  var deferred = Q.defer();

  db.carousel.remove(
    { _id: mongo.helper.toObjectID(_id) },
    function (err) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });

    return deferred.promise;
  }
