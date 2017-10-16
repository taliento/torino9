var common = require("../common");
var superagent = common.superagent;
var expect = common.expect;
var apiUrl = common.apiUrl;
var user = common.user;
var password = common.password;

describe('user rest api', function() {
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

  it('user register', function(done){
    superagent.post(apiUrl+'/users/register')
      .send({ username: 'test' , password: 'password' })
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

  it('retrieves an user', function(done){
    superagent.get(apiUrl+'/users/'+id)
      .set('Authorization', 'Bearer ' + token)
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body._id.length).to.be.equal(24);
        expect(res.body._id).to.eql(id);
        done();
      });
  });

  it('retrieves user collection', function(done){
    superagent.get(apiUrl+'/users')
      .set('Authorization', 'Bearer ' + token)
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body.length).to.be.above(0);
        expect(res.body.map(function (item){return item._id})).to.contain(id);
        done();
      });
  });

  it('count users', function(done){
    superagent.get(apiUrl+'/users/count')
      .set('Authorization', 'Bearer ' + token)
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.count).to.be.above(0);
        done();
      });
  });

  it('retrieves paged users', function(done){
    superagent.get(apiUrl+'/users/paged/1/1/1')
      .set('Authorization', 'Bearer ' + token)
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body.length).to.be.above(0);
        // expect(res.body.map(function (item){return item._id})).to.contain(id);
        done();
      });
  });

  it('updates an user', function(done){
    superagent.put(apiUrl+'/users/'+id)
      .send({ username: 'test' , password: 'passwordnew' })
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .end(function(e, res) {
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('removes an user', function(done){
    superagent.del(apiUrl+'/users/'+id)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });
});
