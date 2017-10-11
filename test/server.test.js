function importTest(name, path) {
    describe(name, function () {
        require(path);
    });
}

var common = require("./common");
var superagent = common.superagent;
var expect = common.expect;

describe("express rest api server", function () {

    before(function(done) {
      superagent.post('http://localhost:3000/users/authenticate')
        .send({ username: 'dade', password: 'asdasd' })
        .set('Accept', 'application/json')
        .end(function(err, res) {
          common.options.token = res.body.token;
          done();
        });
    });

    it('should get a valid token for user: dade', function(done) {
      superagent.get('http://localhost:3000/users/current')
        .set('Authorization', 'Bearer ' + common.options.token)
        .set('Accept', 'application/json')
        .end((err, res)=> {
            if (err) done(err);
            expect(res.body.content === 'The protected test route is functional!');
            done();
        });
    });

    beforeEach(function () {
      // console.log("running something before each test");
    });

    importTest("news", './news/news.test');
    // importTest("b", './b/b');
    after(function () {
        // console.log("after all tests");
    });
});
