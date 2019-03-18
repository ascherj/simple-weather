const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost/simple-weather';

mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;

db.on('error', () => console.error('error connecting to mongodb'));
db.once('open', () => console.log('successfully connected to mongodb'));

module.exports = db;
