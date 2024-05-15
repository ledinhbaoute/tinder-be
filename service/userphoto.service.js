const { where } = require('sequelize');
const UserPhoto = require('../models/UserPhoto');

async function addUserPhoto(userId, uri) {
  try {
    const photo = await UserPhoto.create({
      user_id: userId,
      photo: uri,
    });
    return photo;
  } catch (error) {
    throw new Error(`Error adding photo: ${error.message}`);
  }
}

module.exports = { addUserPhoto };
