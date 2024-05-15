const User = require('../models/User');
const UserPhoto = require('../models/UserPhoto');

async function createTable() {
  try {
    await User.sync();
    await UserPhoto.sync();
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

module.exports = createTable;
