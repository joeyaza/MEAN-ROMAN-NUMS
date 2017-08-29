process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Conversion = require('../controllers/conversions');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('/GET Conversions', () => {
  it('it should GET all the conversions', (done) => {
        chai.request(server)
        .get('/conversions')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
          done();
        });
  });
});


let conversions = {
    'X': '10',
    'MIII':  '1003',
    'MMMMLVI': '4056',
    'IV': '4',
    'CDXXIII': '423'
}
for (var prop in conversions) {
    describe('/POST conversion', () => {
    it('it should POST a conversion and do the correct conversion from Roman Numeral to Number ', (done) => {
          chai.request(server)
          .post('/conversions')
          .send(conversions[prop])
          .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('to').eql(prop);
            done();
          });
    });
  });
}