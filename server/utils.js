const axios = require('axios');

module.exports.googleMapsRequest = (location) => {
  return new Promise((resolve, reject) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GOOGLE_API_KEY}`)
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
    axios.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${lat},${lng}`)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
