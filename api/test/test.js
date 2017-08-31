process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Conversion = require('../controllers/conversions');
let chai = require('chai');
let expect = chai.expect;
let chaiHttp = require('chai-http');
let server = require('../app');
let conversionsController = require('../controllers/conversions');
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

describe('/POST conversion', () => {
  it('it should POST a conversion and do the correct conversion from Roman Numeral to Number ', (done) => {
    let conversion = {
        from: "x"
    }
        chai.request(server)
        .post('/conversions')
        .send(conversion)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('to').eql('10');
          done();
        });
  });
});
console.log(conversionsController)


it('Conversion should return correct answer', function() {
  conversion = {
    from: 'M'
  }
  expect(conversionsController.romanArabic(conversion)).to.equal(1000);
});