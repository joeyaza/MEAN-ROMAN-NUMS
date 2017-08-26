var mongoose = require('mongoose');
var conversion = require('./Conversion');


var ConversionSchema = mongoose.Schema({
  from: String,
  to: String
});

module.exports = mongoose.model('Conversion', ConversionSchema);

