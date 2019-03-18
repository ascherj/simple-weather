const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { googleMapsRequest, darkSkyRequest } = require('./utils');

// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/../public')));

app.get('/weather', (req, res) => {
  const { location } = req.query;
  let formattedAddress;

  googleMapsRequest(location)
    .then((response) => {
      formattedAddress = response.data.results[0].formatted_address;
      const { lat, lng } = response.data.results[0].geometry.location;
      console.log(`Location: ${formattedAddress}`);
      console.log(`Latitude: ${lat}`);
      console.log(`Longitude: ${lng}`);
      return darkSkyRequest(lat, lng);
    })
    .then((response) => {
      const forecast = response.data.currently;
      res.json({ forecast, formattedAddress });
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
