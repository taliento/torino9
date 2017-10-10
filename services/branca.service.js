var config = require('config.json');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(process.env.MONGODB_URI || config.connectionString, { native_parser: true });
db.bind('branca');

var service = {};
service.get = get;
module.exports = service;

function get(_id) {
  var deferred = Q.defer();

  // db.about.findOne({},function (err, about) {
  //   if (err) deferred.reject(err.name + ': ' + err.message);
  //   if(about == null) {
  //     deferred.resolve({});
  //   } else {
  //     deferred.resolve(about);
  //   }
  //
  // });

  deferred.resolve({text:"la branca " + _id});

  return deferred.promise;
}
