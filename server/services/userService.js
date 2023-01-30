const User = require('../models/UserModel');

const userService = {
  findAll: async (filter, page) => {
    const options = {
      page,
      limit: 3
    };
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
