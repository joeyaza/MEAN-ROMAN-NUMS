let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let methodOverride = require('method-override');

let conversionsController = require('../controllers/conversions');

// ***** conversions ***** //

// http://127.0.0.1:3000/conversions
router.route('/conversions')

  //GET all conversions
  .get(conversionsController.getAll)

  //POST a new Conversion
  .post(conversionsController.createConversion);

router.route('/conversions/:id')

  // GET return specific conversions
  .get(conversionsController.getConversion)

  // PUT update existing conversions
  .put(conversionsController.updateConversion)

  // DELETE remove specific Conversion from DB
  .delete(conversionsController.removeConversion);

module.exports = router