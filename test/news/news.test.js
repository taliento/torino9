var common = require("../common");
var superagent = common.superagent;
var expect = common.expect;
var apiUrl = common.apiUrl;
var user = common.user;
var password = common.password;

describe('news rest api', function() {
  var id;

  var token;

  before(function(done) {
    superagent.post(apiUrl+'/users/authenticate')
      .send({ username: user, password: password })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        expect(err).to.eql(null);
        token = res.body.token;
        done();
      });
  });

  it('post news', function(done){
    superagent.post(apiUrl+'/news/insert')
      .send({ title: 'test' , subtitle: 'test news' })
      .set('Authorization', 'Bearer ' + token)
      .end(function(e,res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.result.ok).to.eql(1);
        expect(res.body.insertedCount).to.eql(1);
        expect(res.body.insertedIds[0].length).to.be.equal(24);
        id = res.body.ops[0]._id;
        done();
      });
  });

  it('retrieves a news', function(done){
    superagent.get(apiUrl+'/news/get/'+id)
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body._id.length).to.be.equal(24);
        expect(res.body._id).to.eql(id);
        done();
      });
  });

  it('retrieves news collection', function(done){
    superagent.get(apiUrl+'/news')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body.length).to.be.above(0);
        expect(res.body.map(function (item){return item._id})).to.contain(id);
        done();
      });
  });

  it('count news', function(done){
    superagent.get(apiUrl+'/news/count')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.count).to.be.above(0);
        done();
      });
  });

  it('retrieves paged news', function(done){
    superagent.get(apiUrl+'/news/paged/1/0/1')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body.length).to.be.above(0);
        // expect(res.body.map(function (item){return item._id})).to.contain(id);
        done();
      });
  });

  it('updates a news', function(done){
    superagent.put(apiUrl+'/news/'+id)
      .send({ title: 'test' , subtitle: 'test news' })
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .end(function(e, res) {
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('removes a news', function(done){
    superagent.del(apiUrl+'/news/'+id)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });
});
