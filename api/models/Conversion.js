var mongoose = require('mongoose');
var conversion = require('./Conversion');


var ConversionSchema = mongoose.Schema({
  roman: String,
  arabic: Number
});

module.exports = mongoose.model('Conversion', ConversionSchema);

