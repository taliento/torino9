var common = require("../common");
var superagent = common.superagent;
var expect = common.expect;
var apiUrl = common.apiUrl;
var user = common.user;
var password = common.password;


describe('contacts page rest api', function() {
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

  it('inser contacts page', function(done){
    superagent.post(apiUrl+'/contact/insert')
      .send({ title: 'test' , subtitle:'contact page sub',text:'about text' })
      .set('Authorization', 'Bearer ' + token)
      .end(function(e,res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.result.ok).to.eql(1);
        expect(res.body.insertedCount).to.eql(1);
        expect(res.body.insertedIds[0].length).to.be.equal(24);
        id = res.body.insertedIds[0];
        done();
      });
  });

  it('retrieves contacts page', function(done){
    superagent.get(apiUrl+'/contact/get/'+id)
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body._id.length).to.be.equal(24);
        expect(res.body._id).to.eql(id);
        done();
      });
  });

  it('updates contacts page', function(done){
    superagent.post(apiUrl+'/contact/insert')
      .send({ title: 'test' , subtitle:'contact page sub',text:'about text', _id: id })
      .set('Authorization', 'Bearer ' + token)
      .end(function(e, res) {
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('removes contacts page', function(done){
    superagent.del(apiUrl+'/contact/'+id)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });
});
