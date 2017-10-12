var common = require("../common");
var superagent = common.superagent;
var expect = common.expect;

describe('featurette rest api', function() {
  var id;

  var token;

  before(function(done) {
    superagent.post('http://localhost:3000/users/authenticate')
      .send({ username: 'dade', password: 'asdasd' })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        expect(err).to.eql(null);
        token = res.body.token;
        done();
      });
  });

  it('post featurette', function(done){
    superagent.post('http://localhost:3000/featurette/insert')
      .send({ title: 'test' , subtitle: 'test featurette' })
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

  it('retrieves a featurette', function(done){
    superagent.get('http://localhost:3000/featurette/get/'+id)
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body._id.length).to.be.equal(24);
        expect(res.body._id).to.eql(id);
        done();
      });
  });

  it('retrieves a featurette collection', function(done){
    superagent.get('http://localhost:3000/featurette')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body.length).to.be.above(0);
        expect(res.body.map(function (item){return item._id})).to.contain(id);
        done();
      });
  });

  it('count featurettes', function(done){
    superagent.get('http://localhost:3000/featurette/count')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.count).to.be.above(0);
        done();
      });
  });

  it('retrieves paged featurettes', function(done){
    superagent.get('http://localhost:3000/featurette/paged/2/1/2')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body.length).to.be.above(0);
        // expect(res.body.map(function (item){return item._id})).to.contain(id);
        done();
      });
  });

  it('updates a featurette', function(done){
    superagent.put('http://localhost:3000/featurette/'+id)
      .send({ title: 'test' , subtitle: 'test featurette' })
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .end(function(e, res) {
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('removes a featurette', function(done){
    superagent.del('http://localhost:3000/featurette/'+id)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });
});
