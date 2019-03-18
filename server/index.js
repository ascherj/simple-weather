const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { GOOGLE_API_KEY } = require('../config/google');
const { DARK_SKY_API_KEY } = require('../config/darksky');
const utils = require('./utils');

const googleMapsClient = require('@google/maps').createClient({
  key: GOOGLE_API_KEY,
  Promise: Promise
});

// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/../public')));

app.get('/weather', (req, res) => {
  const address = req.query.location;

  googleMapsClient.geocode({ address })
    .asPromise()
    .then((response) => {
      const { lat, lng } = response.json.results[0].geometry.location;
      console.log(`Location: ${address}`);
      console.log(`Latitude: ${lat}`);
      console.log(`Longitude: ${lng}`);
      return utils.darkSkyRequest(lat, lng);
    })
    .then((response) => {
      const forecast = response.data.currently;
      res.json(forecast);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
