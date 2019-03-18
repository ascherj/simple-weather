const axios = require('axios');
const { DARK_SKY_API_KEY } = require('../config/darksky');

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
