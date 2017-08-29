var mongoose = require('mongoose');

var ConversionSchema = mongoose.Schema({
  from: String,
  to: String,
  time: String
});

module.exports = mongoose.model('Conversion', ConversionSchema);

