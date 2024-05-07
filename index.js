const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const sequelize = require('./config/dbConnection');
const createTable = require('./migration/createTable');
const port = process.env.PORT || 3000;
const _2afApp = require('./config/_2afApp');
const messageTemplate = require('./service/otp/messageTemplate');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully');
    await createTable();
    _2afApp()
      .then(appId => {
        process.env.APP_ID = appId;
        console.log('Received Application ID:', process.env.APP_ID);
        messageTemplate(process.env.APP_ID)
          .then(messageId => {
            process.env.MESSAGE_ID = messageId;
            console.log('Received Message ID:', process.env.MESSAGE_ID);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      })
      .catch(error => {
        console.error('Error:', error);
      });
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
