const User = require('../models/User');

async function createTable() {
  try {
    await User.sync();
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

module.exports = createTable;
