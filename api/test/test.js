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

describe('/POST conversion', () => {
  it('it should POST a conversion and do the correct conversion from Roman Numeral to Number ', (done) => {
    let conversion = {
        from: "X"
    };
    chai.request(server)
    .post('/conversions')
    .send(conversion)
     .end((error, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('from');
        response.body.should.have.property('to');
        response.body.should.have.property('date');
        response.body.should.have.property('from').eql('X');
        response.body.should.have.property('to').eql('10');
      done();
     });
  });
});

describe('/GET Conversions', () => {
  it('it should GET all the conversions', (done) => {
    chai.request(server)
    .get('/conversions')
     .end((error, response) => {
       response.status.should.equal(200);
       response.body.should.be.a('array');
       response.body[0].should.have.property('_id');
       response.body[0].should.have.property('date');
       response.body[0].should.have.property('to');
       response.body[0].should.have.property('from');
       done();
     });
  });
});


describe('/DELETE conversions', () => {
  it('Should delete all conversions ', (done) => {
    chai.request(server)
    .delete('/conversions')
    .end((err, res) => {
        res.should.have.status(200);
      done();
    });
  });
});


it('Conversion should return correct Arabic Number for Roman Numeral', function() {
  conversion = [
    {from: 'V', answer: 5},
    {from: 'MV', answer: 1005},
    {from: 'MMX', answer: 2010},
    {from: 'XC', answer: 90}
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