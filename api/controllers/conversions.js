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
  var conversion = new Conversion(request.body);
  if(Number(conversion.from)) {
    var converted = romanNumeralConverter.getRomanFromInteger(conversion.from);
  } else {
    var converted = romanNumeralConverter.getIntegerFromRoman(conversion.from);
  }
  conversion.to = converted;
  conversion.save(function(error) {
    if(error) response.status(500).send(error);
    response.status(201).send(conversion);
    getConversion(conversion._id)
  });
}

// GET ONE
function getConversion(id) {
  console.log(id)
  Conversion.findById({_id: id}, function(conversion) {
    console.log(conversion)
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