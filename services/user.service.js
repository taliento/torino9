/* jshint node: true */
'use strict';

const Q = require('q');
const mongo = require('mongoskin');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sampleClient = require('./google.oauth2');

let service = {};

service.authenticate = authenticate;
service.googleAuthenticate = googleAuthenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

service.getPaged = getPaged;
service.count = count;

module.exports = service;

function authenticate(db, username, password) {
  let deferred = Q.defer();

  db.users.findOne({
    username: username
  }, (err, user) => {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (user && bcrypt.compareSync(password, user.hash)) {
      // authentication successful
      deferred.resolve({
        _id: user._id,
        username: user.username,
        admin: user.admin,
        firstName: user.firstName,
        lastName: user.lastName,
        imgPath: user.imgPath,
        token: jwt.sign({
          sub: user._id
        }, process.env.SECRET)
      });
    } else {
      // authentication failed
      deferred.resolve();
    }
  });

  return deferred.promise;
}

function googleAuthenticate(db, req, res) {
  let deferred = Q.defer();

  sampleClient.googleAuth(req, res)
    .then((plusUser) => {

        var user = {};
        user._id = plusUser.id;
        user.username = plusUser.displayName;
        user.firstName = plusUser.name.givenName;
        user.lastName = plusUser.name.familyName;
        user.imgPath = plusUser.image.url;
        user.password = plusUser.name.familyName;

        create(db, user, true)
          .then((doc) => {
            doc.token = jwt.sign({
              sub: user._id
            }, process.env.SECRET);
            deferred.resolve(doc);
          })
          .catch((err) => {
            res.status(400).send(err);
          });
    })
    .catch((err) => {
      res.status(400).send(err);
    });

  return deferred.promise;
}

function getAll(db) {
  let deferred = Q.defer();

  db.users.find().sort({
    username: 1
  }).toArray((err, users) => {
    if (err) deferred.reject(err.name + ': ' + err.message);

    // return users (without hashed passwords)
    users = _.map(users, (user) => {
      return _.omit(user, 'hash');
    });

    deferred.resolve(users);
  });

  return deferred.promise;
}

function count(db) {

  let deferred = Q.defer();

  db.users.count({}, (err, _count) => {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(_count);
  });

  return deferred.promise;
}

function getPaged(db, _limit, _page, _size) {

  let deferred = Q.defer();

  let _skip = _page * _limit;

  db.users.find({}, null, {
    limit: _limit * 1,
    skip: _skip,
    sort: [
      ['insertDate', -1]
    ]
  }).toArray((err, users) => {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(users);
  });

  return deferred.promise;
}

function getById(db, _id) {
  let deferred = Q.defer();

  db.users.findById(_id, (err, user) => {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (user) {
      // return user (without hashed password)
      deferred.resolve(_.omit(user, 'hash'));
    } else {
      // user not found
      deferred.resolve();
    }
  });

  return deferred.promise;
}

function create(db, userParam, googleAuth) {
  let deferred = Q.defer();

  if(googleAuth) {
    getById(db, userParam._id).
    then((user) => {
      if(user) {
        deferred.resolve(user);
      } else {
        createUser();
      }
    });
  } else {
    // validation
    db.users.findOne({
        username: userParam.username
      },
      (err, user) => {
        if (err) deferred.reject(err.name + ': ' + err.message);
        if (user) {
            deferred.reject('Username "' + userParam.username + '" already exists');
        } else {
          createUser();
        }
      });
  }

  function createUser() {
    // set user object to userParam without the cleartext password
    let user = _.omit(userParam, 'password');
    user.insertDate = new Date();
    // add hashed password to user object
    user.hash = bcrypt.hashSync(userParam.password, 10);

    db.users.insert(
      user,
      (err, doc) => {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve(doc);
      });
  }

  return deferred.promise;
}

function update(db, _id, userParam) {
  let deferred = Q.defer();

  if (!userParam || !userParam.username) {
    deferred.reject('no username param was found!');
  }

  // validation
  db.users.findById(_id, (err, user) => {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (!user || !user.username) {
      deferred.reject('no username was found!');
    }

    if (user.username !== userParam.username) {
      // username has changed so check if the new username is already taken
      db.users.findOne({
          username: userParam.username
        },
        (err, user) => {
          if (err) deferred.reject(err.name + ': ' + err.message);

          if (user) {
            // username already exists
            deferred.reject(
              'Username "' + userParam.username + '" already exists');
          } else {
            updateUser();
          }
        });
    } else {
      updateUser();
    }
  });

  function updateUser() {
    // fields to update
    let set = {
      firstName: userParam.firstName,
      lastName: userParam.lastName,
      admin: userParam.admin,
      username: userParam.username,
      updateDate: new Date()
    };

    if (userParam.imgPath) {
      set.imgPath = userParam.imgPath;
    }

    // update password if it was entered
    if (userParam.password && userParam.password != '') {
      set.hash = bcrypt.hashSync(userParam.password, 10);
    }

    db.users.update({
        _id: mongo.helper.toObjectID(_id)
      }, {
        $set: set
      },
      (err, doc) => {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve();
      });
  }

  return deferred.promise;
}

function _delete(db, _id) {
  let deferred = Q.defer();

  db.users.remove({
      _id: mongo.helper.toObjectID(_id)
    },
    (err) => {
      if (err) deferred.reject(err.name + ': ' + err.message);

      deferred.resolve();
    });

  return deferred.promise;
}
