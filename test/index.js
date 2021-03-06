const config = require('./config.json');
const superagent = require('superagent');
const expect = require('expect.js');
const user = config.user;
const apiUrl = config.apiUrl;
const password = config.password;

describe('express rest api server', function() {

  var idApitest;
  var token;

  const api = "http://localhost:" + (process.env.PORT || 3000) + apiUrl;

  before(function(done) { // insert api test user, and get auth token
    superagent.post(api + '/users/register')
      .send({
        username: user,
        password: password
      })
      .end(function(e, res) {
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.result.ok).to.eql(1);
        expect(res.body.insertedCount).to.eql(1);
        expect(res.body.insertedIds[0].length).to.be.equal(24);
        idApitest = res.body.ops[0]._id;

        superagent.post(api + '/users/authenticate')
          .send({
            username: user,
            password: password
          })
          .set('Accept', 'application/json')
          .end(function(err, res) {
            expect(err).to.eql(null);
            token = res.body.token;
            done();
          });
      });
  });

  describe('about page rest api', function() {
    var id;

    it('insert about page', function(done) {
      superagent.post(api + '/about/insert')
        .send({
          title: 'test',
          subtitle: 'about page sub',
          text: 'about text'
        })
        .set('Authorization', 'Bearer ' + token)
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body.result.ok).to.eql(1);
          expect(res.body.insertedCount).to.eql(1);
          expect(res.body.insertedIds[0].length).to.be.equal(24);
          id = res.body.insertedIds[0];
          done();
        });
    });

    it('retrieves about page', function(done) {
      superagent.get(api + '/about/get/' + id)
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body._id.length).to.be.equal(24);
          expect(res.body._id).to.eql(id);
          done();
        });
    });

    it('updates about page', function(done) {
      superagent.post(api + '/about/insert')
        .send({
          title: 'test',
          subtitle: 'about page sub',
          text: 'about text',
          _id: id
        })
        .set('Authorization', 'Bearer ' + token)
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.status).to.eql(200);
          done();
        });
    });

    it('removes about page', function(done) {
      superagent.del(api + '/about/' + id)
        .set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });
  });

  describe('branca page rest api', function() {

    it('insert branca page', function(done) {
      superagent.post(api + '/branca/insert')
        .send({
          title: 'test',
          subtitle: 'branca page sub',
          text: 'about text',
          _id: 'branca1'
        })
        .set('Authorization', 'Bearer ' + token)
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body.ok).to.eql(1);
          expect(res.body.nModified).to.eql(0);
          expect(res.body.upserted[0]._id).to.eql('branca1');
          done();
        });
    });

    it('retrieves branca page', function(done) {
      superagent.get(api + '/branca/get/branca1')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body._id).to.eql('branca1');
          done();
        });
    });

    it('updates branca page', function(done) {
      superagent.post(api + '/branca/insert')
        .send({
          title: 'test',
          subtitle: 'about page sub',
          text: 'about text',
          _id: 'branca1'
        })
        .set('Authorization', 'Bearer ' + token)
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body.ok).to.eql(1);
          expect(res.body.nModified).to.eql(1);
          done();
        });
    });

    it('removes branca page', function(done) {
      superagent.del(api + '/branca/branca1')
        .set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });
  });
  //
  describe('calendar rest api', function() {
    var id;
    var now = new Date();

    it('post event', function(done) {
      superagent.post(api + '/calendar/insert')
        .send({
          title: 'test',
          date: {
            year: now.getFullYear(),
            month: now.getMonth(),
            day: now.getDate()
          }
        })
        .set('Authorization', 'Bearer ' + token)
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body.result.ok).to.eql(1);
          expect(res.body.insertedCount).to.eql(1);
          expect(res.body.insertedIds[0].length).to.be.equal(24);
          id = res.body.ops[0]._id;
          done();
        });
    });

    it('retrieves an event', function(done) {
      superagent.get(api + '/calendar/get/' + id)
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body._id.length).to.be.equal(24);
          expect(res.body._id).to.eql(id);
          done();
        });
    });

    it('retrieves month events', function(done) {
      superagent.get(api + '/calendar/month/' + now.getMonth() + '/' + now.getFullYear())
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body.length).to.be.above(0);
          expect(res.body.map(function(item) {
            return item._id;
          })).to.contain(id);
          done();
        });
    });

    it('retrieves event collection', function(done) {
      superagent.get(api + '/calendar')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.body.length).to.be.above(0);
          expect(res.body.map(function(item) {
            return item._id;
          })).to.contain(id);
          done();
        });
    });

    it('updates an event', function(done) {
      superagent.put(api + '/calendar/' + id)
        .send({
          title: 'test2',
          date: {
            year: now.getFullYear(),
            month: now.getMonth(),
            day: now.getDate()
          }
        })
        .set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });

    it('removes an event', function(done) {
      superagent.del(api + '/calendar/' + id)
        .set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });
  });
  //
  describe('carousel rest api', function() {
    var id;

    it('post slide', function(done) {
      superagent.post(api + '/carousel/insert')
        .send({
          title: 'test',
          subtitle: 'test carousel'
        })
        .set('Authorization', 'Bearer ' + token)
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body.result.ok).to.eql(1);
          expect(res.body.insertedCount).to.eql(1);
          expect(res.body.insertedIds[0].length).to.be.equal(24);
          id = res.body.ops[0]._id;
          done();
        });
    });

    it('retrieves a slide', function(done) {
      superagent.get(api + '/carousel/get/' + id)
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body._id.length).to.be.equal(24);
          expect(res.body._id).to.eql(id);
          done();
        });
    });

    it('retrieves a slide collection', function(done) {
      superagent.get(api + '/carousel')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.body.length).to.be.above(0);
          expect(res.body.map(function(item) {
            return item._id;
          })).to.contain(id);
          done();
        });
    });

    it('count slides', function(done) {
      superagent.get(api + '/carousel/count')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.text).to.be.above(0);
          done();
        });
    });

    it('retrieves paged slides', function(done) {
      superagent.get(api + '/carousel/paged/1/0/1')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.body.length).to.be.above(0);
          // expect(res.body.map(function (item){return item._id})).to.contain(id);
          done();
        });
    });

    it('updates a slide', function(done) {
      superagent.put(api + '/carousel/' + id)
        .send({
          title: 'test',
          subtitle: 'test carousel'
        })
        .set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });

    it('removes a slide', function(done) {
      superagent.del(api + '/carousel/' + id)
        .set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });
  });
  //
  describe('contacts page rest api', function() {
    var id;

    it('inser contacts page', function(done) {
      superagent.post(api + '/contact/insert')
        .send({
          title: 'test',
          subtitle: 'contact page sub',
          text: 'about text'
        })
        .set('Authorization', 'Bearer ' + token)
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body.result.ok).to.eql(1);
          expect(res.body.insertedCount).to.eql(1);
          expect(res.body.insertedIds[0].length).to.be.equal(24);
          id = res.body.insertedIds[0];
          done();
        });
    });

    it('retrieves contacts page', function(done) {
      superagent.get(api + '/contact/get/' + id)
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body._id.length).to.be.equal(24);
          expect(res.body._id).to.eql(id);
          done();
        });
    });

    it('updates contacts page', function(done) {
      superagent.post(api + '/contact/insert')
        .send({
          title: 'test',
          subtitle: 'contact page sub',
          text: 'about text',
          _id: id
        })
        .set('Authorization', 'Bearer ' + token)
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.status).to.eql(200);
          done();
        });
    });

    it('removes contacts page', function(done) {
      superagent.del(api + '/contact/' + id)
        .set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });
  });
  //
  describe('featurette rest api', function() {
    var id;

    it('post featurette', function(done) {
      superagent.post(api + '/featurette/insert')
        .send({
          title: 'test',
          subtitle: 'test featurette'
        })
        .set('Authorization', 'Bearer ' + token)
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body.result.ok).to.eql(1);
          expect(res.body.insertedCount).to.eql(1);
          expect(res.body.insertedIds[0].length).to.be.equal(24);
          id = res.body.ops[0]._id;
          done();
        });
    });

    it('retrieves a featurette', function(done) {
      superagent.get(api + '/featurette/get/' + id)
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body._id.length).to.be.equal(24);
          expect(res.body._id).to.eql(id);
          done();
        });
    });

    it('retrieves a featurette collection', function(done) {
      superagent.get(api + '/featurette')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.body.length).to.be.above(0);
          expect(res.body.map(function(item) {
            return item._id;
          })).to.contain(id);
          done();
        });
    });

    it('count featurettes', function(done) {
      superagent.get(api + '/featurette/count')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.text).to.be.above(0);
          done();
        });
    });

    it('retrieves paged featurettes', function(done) {
      superagent.get(api + '/featurette/paged/1/0/1')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.body.length).to.be.above(0);
          // expect(res.body.map(function (item){return item._id})).to.contain(id);
          done();
        });
    });

    it('updates a featurette', function(done) {
      superagent.put(api + '/featurette/' + id)
        .send({
          title: 'test',
          subtitle: 'test featurette'
        })
        .set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });

    it('removes a featurette', function(done) {
      superagent.del(api + '/featurette/' + id)
        .set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });
  });
  //
  describe('news rest api', function() {
    var id;

    it('post news', function(done) {
      superagent.post(api + '/news/insert')
        .send({
          title: 'test',
          subtitle: 'test news'
        })
        .set('Authorization', 'Bearer ' + token)
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body.result.ok).to.eql(1);
          expect(res.body.insertedCount).to.eql(1);
          expect(res.body.insertedIds[0].length).to.be.equal(24);
          id = res.body.ops[0]._id;
          done();
        });
    });

    it('retrieves a news', function(done) {
      superagent.get(api + '/news/get/' + id)
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body._id.length).to.be.equal(24);
          expect(res.body._id).to.eql(id);
          done();
        });
    });

    it('retrieves news collection', function(done) {
      superagent.get(api + '/news')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.body.length).to.be.above(0);
          expect(res.body.map(function(item) {
            return item._id;
          })).to.contain(id);
          done();
        });
    });

    it('count news', function(done) {
      superagent.get(api + '/news/count/all')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.text).to.be.above(0);
          done();
        });
    });

    it('retrieves paged news', function(done) {
      superagent.get(api + '/news/paged/1/0/1/all')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.body.length).to.be.above(0);
          // expect(res.body.map(function (item){return item._id})).to.contain(id);
          done();
        });
    });

    it('updates a news', function(done) {
      superagent.put(api + '/news/' + id)
        .send({
          title: 'test',
          subtitle: 'test news'
        })
        .set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });

    it('removes a news', function(done) {
      superagent.del(api + '/news/' + id)
        .set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });
  });
  //
  describe('user rest api', function() {
    var id;

    it('user register', function(done) {
      superagent.post(api + '/users/register')
        .send({
          username: 'testuser',
          password: 'password'
        })
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body.result.ok).to.eql(1);
          expect(res.body.insertedCount).to.eql(1);
          expect(res.body.insertedIds[0].length).to.be.equal(24);
          id = res.body.ops[0]._id;
          done();
        });
    });

    it('retrieves an user', function(done) {
      superagent.get(api + '/users/' + id)
        .set('Authorization', 'Bearer ' + token)
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body._id.length).to.be.equal(24);
          expect(res.body._id).to.eql(id);
          done();
        });
    });

    it('retrieves user collection', function(done) {
      superagent.get(api + '/users')
        .set('Authorization', 'Bearer ' + token)
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.body.length).to.be.above(0);
          expect(res.body.map(function(item) {
            return item._id;
          })).to.contain(id);
          done();
        });
    });

    it('count users', function(done) {
      superagent.get(api + '/users/count')
        .set('Authorization', 'Bearer ' + token)
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.text).to.be.above(0);
          done();
        });
    });

    it('retrieves paged users', function(done) {
      superagent.get(api + '/users/paged/1/1/1')
        .set('Authorization', 'Bearer ' + token)
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.body.length).to.be.above(0);
          // expect(res.body.map(function (item){return item._id})).to.contain(id);
          done();
        });
    });

    it('updates an user', function(done) {
      superagent.put(api + '/users/' + id)
        .send({
          username: 'testuser',
          password: 'passwordnew'
        })
        .set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });

    it('removes an user', function(done) {
      superagent.del(api + '/users/' + id)
        .set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json')
        .end(function(e, res) {
          expect(e).to.eql(null);
          expect(res.status).to.eql(200);
          done();
        });
    });
  });

  after(function(done) { // delete api test user
    superagent.del(api + '/users/' + idApitest)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .end(function(e, res) {
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });

});
