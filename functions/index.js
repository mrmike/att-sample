const functions = require('firebase-functions');
const express = require('express');

const weatherHandler = require('./weather.js');
const coordsHandler = require('./database.js');

const app = express();
const router = express.Router();

router.get('/weather/:city', weatherHandler);
router.get('/coords', coordsHandler);

app.use('/api', router);

const att = functions.https.onRequest(app);
module.exports = {
  att
};
