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

describe('/POST conversion', () => {
  it('it should POST a conversion and do the correct conversion from Roman Numeral to Number ', (done) => {
  let conversions = [
    {from: "x", answer: '10'}, {from: "MIII", answer: '1003'}, {from: "MMMMLVI", answer: '4056'}, {from: "IV", answer: '4'},
    {from: "CDXXIII", answer: '423'}
  ]
  for (let i=0;i<conversions.length;i++) {
          chai.request(server)
          .post('/conversions')
          .send(conversions[i])
          .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('to').eql(conversions[i].anwser);
        });
    };
    done();
  });
});