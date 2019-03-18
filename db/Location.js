require('../db/index');
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  location: {
    type: String,
    unique: true,
  },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
