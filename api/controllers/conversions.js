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
  let conversion = new Conversion(request.body);
  if(Number(conversion.from)) {
    var converted = romanNumeralConverter.getRomanFromInteger(conversion.from);
  } else {
    conversion.from = conversion.from.toUpperCase();
    var converted = romanNumeralConverter.getIntegerFromRoman(conversion.from);
  }
  conversion.to = converted;
  conversion.time = new Date(parseInt(conversion._id.toString().substring(0, 8), 16) * 1000);
  conversion.save(function(error) {
    if(error) response.status(500).send(error);
    response.status(201).send(conversion);
  });
}


module.exports = {
  getAll: getAll,
  createConversion: createConversion
}