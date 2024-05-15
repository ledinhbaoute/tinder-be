const { where } = require('sequelize');
const User = require('../models/User');

async function getAllUsers() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error(`Error getting users: ${error.message}`);
  }
}

async function findUserByPhone(phoneNumber) {
  try {
    const user = await User.findOne({ where: { phoneNumber: phoneNumber } });
    return user;
  } catch (error) {
    throw new Error(`Error finding users: ${error.message}`);
  }
}

async function addUser(user) {
  try {
    const newUser = await User.create({
      name: user.name,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      birthDay: user.birthDay,
      interest: user.interest,
    });
    return newUser;
  } catch (error) {
    throw new Error(`Error adding user: ${error.message}`);
  }
}

module.exports = { getAllUsers, addUser, findUserByPhone };
