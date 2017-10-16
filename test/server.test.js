var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var mongo = require('mongoskin');
var common = require("./common");
var Q = require('q');
var user = common.user;
var apiUrl = common.apiUrl;
var password = common.password;
var connectionString = common.connectionString;


function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

function create(userParam) {

    var deferred = Q.defer();
    var db = mongo.db(connectionString, { native_parser: true });
    db.bind('users');

    // validation
    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');
        user.insertDate = new Date();
        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve(doc);
            });
    }

    return deferred.promise;
}


var superagent = common.superagent;
var expect = common.expect;

describe("express rest api server", function () {

    before(function(done) {
     // runs before all tests in this block

     create({'username': user, 'password': password}).then(function(doc) {
       done();
     });

    });

    importTest("about folder", './about/about.test.js');

    importTest("branca folder", './branca/branca.test.js');

    importTest("calendar folder", './calendar/calendar.test.js');

    importTest("carousel folder", './carousel/carousel.test.js');

    importTest("contacts folder", './contacts/contacts.test.js');

    importTest("featurette folder", './featurette/featurette.test.js');

    importTest("news folder", './news/news.test');

    importTest("user folder", './user/user.test.js');

    after(function () {
        // console.log("after all tests");
    });
});
