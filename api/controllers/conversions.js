let Conversion = require('../models/Conversion');
let lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;

// GET
function getAll(request, response) {
  Conversion.find(function(error, conversions) {
    if(error) response.status(404).send(error);
    response.status(200).send(conversions);
  }).select('-__v');
}

function arabicRoman(conversion) {
  roman = '';
  for ( i in lookup ) {
    while ( conversion.from >= lookup[i] ) {
       roman += i;
      conversion.from -= lookup[i];
    }
  }
  converted = roman;
  return converted;
}

function romanArabic(conversion) {
  conversion.from = conversion.from.toUpperCase();    
  arabic = 0,
  i = conversion.from.length;
  while (i--) {
      if ( lookup[conversion.from[i]] < lookup[conversion.from[i+1]] )
        arabic -= lookup[conversion.from[i]];
      else
        arabic += lookup[conversion.from[i]];
  }
  converted = arabic;
  arabic = 0;
  return converted;
}


// POST
function createConversion(request, response) {
  let conversion = new Conversion(request.body);
  if(Number(conversion.from)) {
    arabicRoman(conversion);
  } else {
    romanArabic(conversion)
}
  conversion.to = converted;
  conversion.time = new Date(parseInt(conversion._id.toString().substring(0, 1), 16) * 1000);
  conversion.timeArr = conversion.time.split(' ')
  conversion.time = conversion.timeArr[0]+' '+conversion.timeArr[2]+' '+ conversion.timeArr[1]+' '+conversion.timeArr[3];
  conversion.save(function(error) {
    if(error) response.status(500).send(error);
    response.status(201).send(conversion);
  });
}

module.exports = {
  getAll: getAll,
  createConversion: createConversion,
  romanArabic: romanArabic,
  arabicRoman: arabicRoman
}