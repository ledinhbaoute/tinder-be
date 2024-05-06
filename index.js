const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const sequelize = require('./config/dbConnection');
const createTable = require('./migration/createTable');
const port = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully');
    await createTable();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
})();

const userRoute = require('./routes/userRoute');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(userRoute);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});

app.listen(port);

console.log('RESTful API server started on: ' + port);
