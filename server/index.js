const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { GOOGLE_API_KEY } = require('../config/google');

const googleMapsClient = require('@google/maps').createClient({
  key: GOOGLE_API_KEY,
});

// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/../public')));

app.get('/locations', (req, res) => {
  // items.selectAll((err, data) => {
  //   if (err) {
  //     res.sendStatus(500);
  //   } else {
  //     res.json(data);
  //   }
  // });
});

app.get('/weather', (req, res) => {
  const address = req.body.location;

  googleMapsClient.geocode({ address }, (err, data) => {
    const { lat, lng } = data.json.results[0].geometry.location;
    console.log(`Address: ${address}`);
    console.log(`Latitude: ${lat}`);
    console.log(`Longitude: ${lng}`);
    res.send('received location data');
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
