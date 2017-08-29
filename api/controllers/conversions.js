let Conversion = require('../models/Conversion');
let lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;

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
    (function(num) {
      for ( i in lookup ) {
        while ( num >= lookup[i] ) {
          roman += i;
          num -= lookup[i];
        }
      }
      converted = roman;
    })(conversion.from)
  } else {
  conversion.from = conversion.from.toUpperCase();    
  (function(roman){
    console.log(roman)
          arabic = 0,
          i = roman.length;
      while (i--) {
        if ( lookup[roman[i]] < lookup[roman[i+1]] )
          arabic -= lookup[roman[i]];
        else
          arabic += lookup[roman[i]];
      }
      converted = arabic;
    })(conversion.from)
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