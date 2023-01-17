const User = require('../models/UserModel');

const options = {
  page: 1,
  limit: 3
};

const userService = {
  findAll: async (filter) => {
    return await User.paginate({filter}, options);
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
