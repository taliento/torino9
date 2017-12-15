/* jshint node: true */
'use strict';

const mongo = require('mongoskin');
//db connection
const db = mongo.db(process.env.MONGODB_URI || 'mongodb://localhost/torino9', { native_parser: true });
const collections = ['about','config','branca','calendar','carousel','contact','page','featurette','news','users'];
const _ = require('lodash');

_.forEach(collections, (collection) => {
  db.bind(collection);
});

module.exports = db;
