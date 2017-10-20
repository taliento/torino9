const config = require('../config.json');
const Q = require('q');
const mongo = require('mongoskin');
const db = mongo.db(process.env.MONGODB_URI || config.connectionString, { native_parser: true });
db.bind('featurette');

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

  db.featurette.find().toArray(function (err, featuretteList) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(featuretteList);
  });

  return deferred.promise;
}

function count() {

  var deferred = Q.defer();

  db.featurette.count({}, function(err, _count) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve({'count':_count});
  });

  return deferred.promise;
}

function getPaged(_limit, _page, _size) {

  var deferred = Q.defer();

  var _skip = _page * _limit;

  db.featurette.find({}, null,{limit: _limit*1, skip: _skip, sort:[['insertDate',-1]]}).toArray(function (err, featuretteList) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(featuretteList);
  });

  return deferred.promise;
}

function getById(_id) {
  var deferred = Q.defer();

  db.featurette.findById(_id, function (err, featurette) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (featurette) {
      deferred.resolve(featurette);
    } else {
      // featurette not found
      deferred.resolve();
    }
  });

  return deferred.promise;
}

function create(featuretteParam) {
  var deferred = Q.defer();
  featuretteParam.insertDate = new Date();
  db.featurette.insert(
    featuretteParam,
    function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve(doc);
    });

    return deferred.promise;
}

function update(_id, featuretteParam) {
  var deferred = Q.defer();

  // fields to update
  var set = {
    title: featuretteParam.title,
    subTitle: featuretteParam.title,
    imgPath: featuretteParam.imgPath,
    text: featuretteParam.text,
    updateDate: new Date()
  };

  db.featurette.update(
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

  db.featurette.remove(
    { _id: mongo.helper.toObjectID(_id) },
    function (err) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });

    return deferred.promise;
  }
