const Q = require('q');
const mongo = require('mongoskin');
const db = mongo.db(process.env.MONGODB_URI, { native_parser: true });
db.bind('calendar');

var service = {};
service.getAll = getAll;
service.getMonthEvents = getMonthEvents;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
module.exports = service;

function getAll() {
  var deferred = Q.defer();
  db.calendar.find().toArray(function(err, events) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(events);
  });
  return deferred.promise;
}

function getMonthEvents(_month, _year) {
  var deferred = Q.defer();
  db.calendar.find({'date.month': parseInt(_month, 10), 'date.year': parseInt(_year, 10)}).toArray(function(err, _events) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(_events);
  });
  return deferred.promise;
}

function getById(_id) {
  var deferred = Q.defer();
  db.calendar.findById(_id, function(err, calendar) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    if (calendar) {
      deferred.resolve(calendar);
    } else {
      // calendar not found
      deferred.resolve();
    }
  });
  return deferred.promise;
}

function create(calendarParam) {
  var deferred = Q.defer();
  calendarParam.insertDate = new Date();
  db.calendar.insert(
    calendarParam,
    function(err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      deferred.resolve(doc);
    });
    return deferred.promise;
  }

  function update(_id, calendarParam) {
    var deferred = Q.defer();
    // fields to update
    var set = {
      title: calendarParam.title,
      text: calendarParam.text,
      date: calendarParam.date,
      time: calendarParam.time,
      updateDate: new Date()
    };
    db.calendar.update(
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
      db.calendar.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function(err) {
          if (err) deferred.reject(err.name + ': ' + err.message);
          deferred.resolve();
        });
        return deferred.promise;
      }
