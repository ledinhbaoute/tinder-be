const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');

const UserPhoto = sequelize.define('UserPhoto', {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = UserPhoto;
