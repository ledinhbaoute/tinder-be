const User = require('../models/User');

async function getAllUsers() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error(`Error getting users: ${error.message}`);
  }
}

async function addUser(user) {
  try {
    const newUser = await User.create({
      name: user.name,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      birthDay: user.birthDay,
    });
    return newUser;
  } catch (error) {
    throw new Error(`Error adding user: ${error.message}`);
  }
}

module.exports = { getAllUsers, addUser };
