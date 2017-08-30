let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let conversionsController = require('../controllers/conversions');

// ***** conversions ***** //
router.route('/conversions')
  //GET all conversions
  .get(conversionsController.getAll)
  //POST a new Conversion
  .post(conversionsController.createConversion);
module.exports = router