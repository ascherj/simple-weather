const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

const app = express();

app.use(express.static(path.join(__dirname, '/../react-client/dist')));

app.get('/locations', (req, res) => {
  // items.selectAll((err, data) => {
  //   if (err) {
  //     res.sendStatus(500);
  //   } else {
  //     res.json(data);
  //   }
  // });
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
