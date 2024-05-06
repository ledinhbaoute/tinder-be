const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthDay: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = User;
