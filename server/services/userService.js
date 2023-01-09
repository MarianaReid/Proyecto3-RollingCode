const User = require('../models/UserModel');

const userService = {
  findAll: async (filter) => {
    return await User.find(filter);
  },
  saveUser: async (user) => {
    const newUser = new User(user);
    return await newUser.save();
  },
  find: async (data) => {
    return await User.find({email: data})
  }
};

module.exports = { userService };
