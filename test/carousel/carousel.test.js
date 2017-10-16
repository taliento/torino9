var common = require("../common");
var superagent = common.superagent;
var expect = common.expect;
var apiUrl = common.apiUrl;
var user = common.user;
var password = common.password;

describe('carousel rest api', function() {
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

  it('post slide', function(done){
    superagent.post(apiUrl+'/carousel/insert')
      .send({ title: 'test' , subtitle: 'test carousel' })
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

  it('retrieves a slide', function(done){
    superagent.get(apiUrl+'/carousel/get/'+id)
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body._id.length).to.be.equal(24);
        expect(res.body._id).to.eql(id);
        done();
      });
  });

  it('retrieves a slide collection', function(done){
    superagent.get(apiUrl+'/carousel')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body.length).to.be.above(0);
        expect(res.body.map(function (item){return item._id})).to.contain(id);
        done();
      });
  });

  it('count slides', function(done){
    superagent.get(apiUrl+'/carousel/count')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.count).to.be.above(0);
        done();
      });
  });

  it('retrieves paged slides', function(done){
    superagent.get(apiUrl+'/carousel/paged/1/0/1')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body.length).to.be.above(0);
        // expect(res.body.map(function (item){return item._id})).to.contain(id);
        done();
      });
  });

  it('updates a slide', function(done){
    superagent.put(apiUrl+'/carousel/'+id)
      .send({ title: 'test' , subtitle: 'test carousel' })
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .end(function(e, res) {
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('removes a slide', function(done){
    superagent.del(apiUrl+'/carousel/'+id)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });
});
