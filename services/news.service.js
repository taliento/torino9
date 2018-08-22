/* jshint node: true */
"use strict";

const moment = require("moment");
const Q = require("q");
const mongo = require("mongoskin");

let service = {};
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.getPaged = getPaged;
service.count = count;
service.archivesDate = archivesDate;
module.exports = service;

function getAll(db) {
  let deferred = Q.defer();
  db.news.find().toArray((err, newsList) => {
    if (err) deferred.reject(err.name + ": " + err.message);
    deferred.resolve(newsList);
  });
  return deferred.promise;
}

function count(db, _date) {
  let deferred = Q.defer();

  let findParams = {};
  if (_date != "all") {
    let startDate = new Date(_date);
    let endDate = moment(startDate).add(1, "month");
    let plusOneMonth = new Date(endDate.toISOString());
    findParams = {
      insertDate: {
        $gte: startDate,
        $lt: plusOneMonth
      }
    };
  }

  db.news.count(findParams, (err, _count) => {
    if (err) deferred.reject(err.name + ": " + err.message);
    deferred.resolve(_count);
  });
  return deferred.promise;
}

function getPaged(db, _limit, _page, _size, _date) {
  let deferred = Q.defer();
  let _skip = _page * _limit;
  let findParams = {};
  if (_date != "all") {
    let startDate = new Date(_date);
    let endDate = moment(startDate).add(1, "month");
    let plusOneMonth = new Date(endDate.toISOString());
    findParams = {
      insertDate: {
        $gte: startDate,
        $lt: plusOneMonth
      }
    };
  }

  db.news
    .find(findParams, null, {
      limit: _limit * 1,
      skip: _skip,
      sort: [["insertDate", -1]]
    })
    .toArray((err, newsList) => {
      if (err) deferred.reject(err.name + ": " + err.message);
      deferred.resolve(newsList);
    });
  return deferred.promise;
}

function getById(db, _id) {
  let deferred = Q.defer();
  db.news.findById(_id, (err, news) => {
    if (err) deferred.reject(err.name + ": " + err.message);
    if (news) {
      deferred.resolve(news);
    } else {
      // news not found
      deferred.resolve();
    }
  });
  return deferred.promise;
}

function create(db, newsParam) {
  let deferred = Q.defer();
  newsParam.insertDate = new Date();
  db.news.insert(newsParam, (err, doc) => {
    if (err) deferred.reject(err.name + ": " + err.message);
    deferred.resolve(doc);
  });
  return deferred.promise;
}

function update(db, _id, newsParam) {
  let deferred = Q.defer();
  // fields to update
  let set = {
    title: newsParam.title,
    subTitle: newsParam.title,
    text: newsParam.text,
    updateDate: new Date()
  };
  db.news.update(
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
  db.news.remove(
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

function archivesDate(db) {
  let deferred = Q.defer();
  //aggregate dates by month starting from two year ago
  let date = new Date();
  let newDate = moment(date).subtract(2, "years");
  let twoYearsAgo = newDate.toISOString();

  db.news.aggregate(
    [
      {
        $match: {
          insertDate: {
            $gte: new Date(twoYearsAgo) // now - 2 years
          }
        }
      },
      {
        $project: {
          year: {
            $year: "$insertDate"
          },
          month: {
            $month: "$insertDate"
          }
        }
      },
      {
        $group: {
          _id: null,
          distinctDate: {
            $addToSet: {
              year: "$year",
              month: "$month"
            }
          }
        }
      }
    ],
    (err, dates) => {
      if (err) deferred.reject(err.name + ": " + err.message);
      deferred.resolve(dates);
    }
  );

  return deferred.promise;
}
