const { Sequelize } = require('sequelize');
require('dotenv').config();

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `mysql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    dialect: 'mysql',
    define: {
      timestamps: true,
    },
  }
);

module.exports = sequelize;
