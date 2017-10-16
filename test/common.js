var superagent = require('superagent')
var expect = require('expect.js')
var config = require('../config.json');

exports.apiUrl = config.apiUrl;
exports.superagent = superagent;
exports.expect = expect;
exports.user = config.user;
exports.password = config.password;
exports.connectionString = config.connectionString;
