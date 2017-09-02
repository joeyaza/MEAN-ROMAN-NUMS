var mongoose = require('mongoose');

var ConversionSchema = mongoose.Schema({
  from: String,
  to: String,
  date: String
});

module.exports = mongoose.model('Conversion', ConversionSchema);

