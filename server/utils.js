const axios = require('axios');
const { GOOGLE_API_KEY, DARK_SKY_API_KEY } = require('../config/keys');

module.exports.googleMapsRequest = (location) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${GOOGLE_API_KEY}`)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports.darkSkyRequest = (lat, lng) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${lat},${lng}`)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
