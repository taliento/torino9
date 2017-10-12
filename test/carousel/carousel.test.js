var common = require("../common");
var superagent = common.superagent;
var expect = common.expect;


describe('carousel rest api', function() {
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

  it('post slide', function(done){
    superagent.post('http://localhost:3000/carousel/insert')
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
    superagent.get('http://localhost:3000/carousel/get/'+id)
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body._id.length).to.be.equal(24);
        expect(res.body._id).to.eql(id);
        done();
      });
  });

  it('retrieves a slide collection', function(done){
    superagent.get('http://localhost:3000/carousel')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body.length).to.be.above(0);
        expect(res.body.map(function (item){return item._id})).to.contain(id);
        done();
      });
  });

  it('count slides', function(done){
    superagent.get('http://localhost:3000/carousel/count')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.count).to.be.above(0);
        done();
      });
  });

  it('retrieves paged slides', function(done){
    superagent.get('http://localhost:3000/carousel/paged/2/1/2')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body.length).to.be.above(0);
        // expect(res.body.map(function (item){return item._id})).to.contain(id);
        done();
      });
  });

  it('updates a slide', function(done){
    superagent.put('http://localhost:3000/carousel/'+id)
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
    superagent.del('http://localhost:3000/carousel/'+id)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });
});
