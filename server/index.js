const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { googleMapsRequest, darkSkyRequest } = require('./utils');

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

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
