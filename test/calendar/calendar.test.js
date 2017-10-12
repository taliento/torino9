var common = require("../common");
var superagent = common.superagent;
var expect = common.expect;
var apiUrl = common.apiUrl;


describe('calendar rest api', function() {
  var id;

  var token;

  var now = new Date();

  before(function(done) {
    superagent.post(apiUrl+'/users/authenticate')
      .send({ username: 'dade', password: 'asdasd' })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        expect(err).to.eql(null);
        token = res.body.token;
        done();
      });
  });

  it('post event', function(done){
    superagent.post(apiUrl+'/calendar/insert')
      .send({ title: 'test' , date: { year:now.getFullYear(), month:now.getMonth(), day:now.getDate() } })
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

  it('retrieves an event', function(done){
    superagent.get(apiUrl+'/calendar/get/'+id)
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body._id.length).to.be.equal(24);
        expect(res.body._id).to.eql(id);
        done();
      });
  });

  it('retrieves month events', function(done){
    superagent.get(apiUrl+'/calendar/month/'+now.getMonth()+'/'+now.getFullYear())
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql('object');
        expect(res.body.length).to.be.above(0);
        expect(res.body.map(function (item){return item._id})).to.contain(id);
        done();
      });
  });

  it('retrieves event collection', function(done){
    superagent.get(apiUrl+'/calendar')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.body.length).to.be.above(0);
        expect(res.body.map(function (item){return item._id})).to.contain(id);
        done();
      });
  });

  it('updates an event', function(done){
    superagent.put(apiUrl+'/calendar/'+id)
      .send({ title: 'test2' , date: { year:now.getFullYear(), month:now.getMonth(), day:now.getDate() } })
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .end(function(e, res) {
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });

  it('removes an event', function(done){
    superagent.del(apiUrl+'/calendar/'+id)
      .set('Authorization', 'Bearer ' + token)
      .set('Accept', 'application/json')
      .end(function(e, res){
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });
});
