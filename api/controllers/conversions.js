let Conversion = require('../models/Conversion');
let romanNumeralConverter = require('roman-numeral-converter-mmxvi')
// GET
function getAll(request, response) {
  Conversion.find(function(error, conversions) {
    if(error) response.status(404).send(error);

    response.status(200).send(conversions);
  }).select('-__v');
}

// POST
function createConversion(request, response) {
  // var conversion = new Conversion(request.body);
  console.log(request.body)
  // if(Number(a)) {
  //   var a = romanNumeralConverter.getRomanFromInteger(cont);
  // } else {
  //   var a = romanNumeralConverter.getIntegerFromRoman(cont);
  // }
  var conversion = new Conversion({"from": "V",
    "to": '10'});
  conversion.save(function(error) {
    if(error) response.status(500).send(error);
  console.log(conversion)
    response.status(201).send(conversion);
  });
}

// GET
function getConversion(request, response) {
  var id = request.params.id;

  Conversion.findById({_id: id}, function(error, conversion) {
    if(error) response.status(404).send(error);

    response.status(200).send(conversion);
  }).select('-__v');
}

function updateConversion(request, response) {
  var id = request.params.id;

  Conversion.findById({_id: id}, function(error, conversion) {
    if(error) response.status(404).send(error);

    if(request.body.image) conversion.image = request.body.image;
    if(request.body.text) conversion.text = request.body.text;

    conversion.save(function(error) {
      if(error) response.status(500).send(error);

      response.status(200).send(conversion);
    });
  }).select('-__v');
}

function removeConversion(request, response) {
  var id = request.params.id;

  Conversion.remove({_id: id}, function(error) {
    if(error) response.status(404).send(error);

    response.status(200);
  }).select('-__v');
}

module.exports = {
  getAll: getAll,
  createConversion: createConversion,
  getConversion: getConversion,
  updateConversion: updateConversion,
  removeConversion: removeConversion
}