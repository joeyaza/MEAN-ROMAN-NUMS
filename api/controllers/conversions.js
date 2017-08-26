var Conversion = require('../models/Conversion');

// GET
function getAll(request, response) {
    console.log('here')
  Conversion.find(function(error, conversions) {
    if(error) response.status(404).send(error);

    response.status(200).send(conversions);
  }).select('-__v');
}

// POST
function createConversion(request, response) {
   console.log(request);
  var conversion = new Conversion(request.body);
  console.log(conversion)
  conversion.save(function(error) {
    if(error) response.status(500).send(error);

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