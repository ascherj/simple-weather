const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const { googleMapsRequest, darkSkyRequest } = require('../server/utils');

const app = express();
const router = express.Router();

const routerBasePath =
  process.env.NODE_ENV === 'dev' ? '/' : '/.netlify/functions/server';

router.get('/weather', (req, res) => {
  const { location } = req.query;
  let formattedAddress;

  googleMapsRequest(location)
    .then((response) => {
      formattedAddress = response.data.results[0].formatted_address;
      const { lat, lng } = response.data.results[0].geometry.location;
      return darkSkyRequest(lat, lng);
    })
    .then((response) => {
      const { currently, hourly } = response.data;
      res.json({ currently, hourly, formattedAddress });
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routerBasePath, router);
app.use(express.static(path.join(__dirname, '../public')));

module.exports = app;
module.exports.handler = serverless(app);
