/* jshint node: true */
"use strict";

const Q = require("q");
const mongo = require("mongoskin");

let service = {};
service.getAll = getAll;
service.getMonthEvents = getMonthEvents;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
module.exports = service;

function getAll(db) {
  let deferred = Q.defer();
  db.calendar.find().toArray((err, events) => {
    if (err) deferred.reject(err.name + ": " + err.message);
    deferred.resolve(events);
  });
  return deferred.promise;
}

function getMonthEvents(db, _month, _year) {
  let deferred = Q.defer();
  db.calendar
    .find({
      "date.month": parseInt(_month, 10),
      "date.year": parseInt(_year, 10)
    })
    .toArray((err, _events) => {
      if (err) deferred.reject(err.name + ": " + err.message);
      deferred.resolve(_events);
    });
  return deferred.promise;
}

function getById(db, _id) {
  let deferred = Q.defer();
  db.calendar.findById(_id, (err, calendar) => {
    if (err) deferred.reject(err.name + ": " + err.message);
    if (calendar) {
      deferred.resolve(calendar);
    } else {
      // calendar not found
      deferred.resolve();
    }
  });
  return deferred.promise;
}

function create(db, calendarParam) {
  let deferred = Q.defer();
  calendarParam.insertDate = new Date();
  db.calendar.insert(calendarParam, (err, doc) => {
    if (err) deferred.reject(err.name + ": " + err.message);
    deferred.resolve(doc);
  });
  return deferred.promise;
}

function update(db, _id, calendarParam) {
  let deferred = Q.defer();
  // fields to update
  let set = {
    title: calendarParam.title,
    text: calendarParam.text,
    date: calendarParam.date,
    time: calendarParam.time,
    updateDate: new Date()
  };
  db.calendar.update(
    {
      _id: mongo.helper.toObjectID(_id)
    },
    {
      $set: set
    },
    (err, doc) => {
      if (err) deferred.reject(err.name + ": " + err.message);
      deferred.resolve();
    }
  );
  return deferred.promise;
}

function _delete(db, _id) {
  let deferred = Q.defer();
  db.calendar.remove(
    {
      _id: mongo.helper.toObjectID(_id)
    },
    err => {
      if (err) deferred.reject(err.name + ": " + err.message);
      deferred.resolve();
    }
  );
  return deferred.promise;
}
