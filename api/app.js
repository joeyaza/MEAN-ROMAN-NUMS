const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const cors = require('cors');
const mongoUri = 'mongodb://localhost/mean-roman';
mongoose.connect(mongoUri);
const db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});
const routes   = require('./routes/routes');
const app = express();
app.use(cors({
  origin: 'http://localhost:4000',
  credentials: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(process.env.PORT || 3001);
console.log("app is listening .....!")

module.exports = app;
