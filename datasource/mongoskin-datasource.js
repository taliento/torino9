/* jshint node: true */
'use strict';

const mongo = require('mongoskin');
//db connection
const db = mongo.db(process.env.MONGODB_URI, { native_parser: true });
const collections = ['about','config','branca','calendar','carousel','contact','page','featurette','news','users'];

for(let i = 0 ; i < collections.length ; i++) {
  db.bind(collections[i]);
}
module.exports = db;
