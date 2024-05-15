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
    unique: true,
  },
  birthDay: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  interest: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
