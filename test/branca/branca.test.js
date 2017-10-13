var common = require("../common");
var superagent = common.superagent;
var expect = common.expect;
var apiUrl = common.apiUrl;
var user = common.user;
var password = common.password;


describe('branca page rest api', function() {
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

  it('insert branca page', function(done){
    superagent.post(apiUrl+'/branca/insert')
      .send({ title: 'test' , subtitle:'branca page sub',text:'about text',_id:'branca1' })
      .set('Authorization', 'Bearer ' + token)
      .end(function(e,res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.ok).to.eql(1);
        expect(res.body.nModified).to.eql(0);
        expect(res.body.upserted[0]._id).to.eql('branca1');
        done();
      });
  });

  it('retrieves branca page', function(done){
    superagent.get(apiUrl+'/branca/get/branca1')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body._id).to.eql('branca1');
        done();
      });
  });

  it('updates branca page', function(done){
    superagent.post(apiUrl+'/branca/insert')
      .send({ title: 'test' , subtitle:'about page sub',text:'about text', _id:'branca1' })
      .set('Authorization', 'Bearer ' + token)
      .end(function(e, res) {
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.ok).to.eql(1);
        expect(res.body.nModified).to.eql(1);
        done();
      });
  });

  it('removes branca page', function(done){
    superagent.del(apiUrl+'/branca/branca1')
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });
});
