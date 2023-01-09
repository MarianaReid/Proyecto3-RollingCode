const mongoose = require('mongoose');

const conectDb = () => {
  try {
    mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log('Data Base Connected');
  } catch (error) {
    console.log(error);
  }
}

module.exports = conectDb;