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

it('Conversion should return correct Arabic Number for Roman Numeral', function() {
  conversion = [
    {from: 'v', answer: 5},
    {from: 'mv', answer: 1005},
    {from: 'mmx', answer: 2010},
    {from: 'xc', answer: 90}
  ]
  for (i=0;i<conversion.length;i++) {
    expect(conversionsController.romanArabic(conversion[i])).to.equal(conversion[i].answer);
  }
});

it('Conversion should return correct Roman Numeral for Arabic Number', function() {
  conversion = [
    {from: 1000, answer: 'M'},
    {from: 10, answer: 'X'},
    {from: 1010, answer: 'MX'},
    {from: 100, answer: 'C'}
  ]
  for (i=0;i<conversion.length;i++) {
    expect(conversionsController.arabicRoman(conversion[i])).to.equal(conversion[i].answer);
  }
});




