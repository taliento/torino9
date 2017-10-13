function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

var common = require("./common");

var superagent = common.superagent;
var expect = common.expect;

describe("express rest api server", function () {

    // beforeEach(function () {
    //   // console.log("running something before each test");
    // });

    importTest("about folder", './about/about.test.js');

    importTest("branca folder", './branca/branca.test.js');

    importTest("calendar folder", './calendar/calendar.test.js');

    importTest("carousel folder", './carousel/carousel.test.js');

    importTest("contacts folder", './contacts/contacts.test.js');

    importTest("featurette folder", './featurette/featurette.test.js');

    importTest("news folder", './news/news.test');

    importTest("user folder", './user/user.test.js');

    // after(function () {
    //     // console.log("after all tests");
    // });
});
