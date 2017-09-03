let Conversion = require('../models/Conversion');
let romanNumeralConverter = require('roman-numeral-converter-mmxvi');

// GET
getAll = (request, response)=> {
  Conversion.find(function(error, conversions) {
    if(error) response.status(404).send(error);
    response.status(200).send(conversions);
  }).select('-__v');
};

//POST
createConversion = (request, response) => {
  let conversion = new Conversion(request.body);
  checkConversion(request, response, conversion);
};

arabicRoman = (conversion) => {
  converted = romanNumeralConverter.getRomanFromInteger(conversion.from);
}

romanArabic = (conversion) => {  
  converted = romanNumeralConverter.getIntegerFromRoman(conversion.from);
}

checkConversion = (request, response, conversion) => {
  Conversion.findOne({"from":conversion.from}, function(err, result){
    if (result) {
     response.status(200).send(result);
    } else {
      saveConversion(conversion, request, response);
    }
  });
}

saveConversion = (conversion, request, response) => {
  if(Number(conversion.from)) {
    arabicRoman(conversion);
  } else {
    romanArabic(conversion)
  }
  conversion.to = converted;
  conversion.date = new Date(parseInt(conversion._id.toString().substring(0, 8), 16) * 1000);
  conversion.dateArr = conversion.date.split(' ')
  conversion.date = conversion.dateArr[0]+' '+conversion.dateArr[2]+' '+ conversion.dateArr[1]+' '+conversion.dateArr[3];
  conversion.save(function(error) {
    if(error) response.status(500).send(error);
    response.status(201).send(conversion);
  });
}

//DELETE
deleteConversions = (request,response) => {
  Conversion.remove(function(error,conversions){
    if(error) response.status(404).send(error);
    response.status(200).send(conversions);
  });
}


module.exports = {
  getAll: getAll,
  createConversion: createConversion,
  deleteConversions: deleteConversions,
  romanNumeralConverter: romanNumeralConverter
}