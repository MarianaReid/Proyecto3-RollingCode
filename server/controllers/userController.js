const { ObjectId } = require("mongoose").Types;
const { userService } = require('../services/userService');
const { encryptedData, compareData } = require('../utils/bcryptService');
const { token } = require('../utils/jwtService');
const User = require('../models/UserModel');
const { sendEmail } = require('../services/sengrid');
const { templateRegister } = require("../utils/templateEmails");

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page,10) || 1;
    const limit = parseInt(req.query.limit,10) || 3;
    const users = await userService.findAll({isDeleted: false}, page, limit);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

//Cuando el usuario se registra
const createUser = async (req, res) => {
  const { password } = req.body
  try {
    const encryptPass = await encryptedData(password);
    const userSave = {
      ...req.body, 
      password: encryptPass,
    }
    const newUser = await userService.saveUser(userSave);
    const JwtToken = token({id: newUser._id, role: newUser.role});
    await sendEmail({
      subject: 'Bienvenidos al Restaurante 🕋', 
      text: 'Gracias por registrarte', 
      htmlMsg: templateRegister(newUser.name, newUser._id), 
      userEmail: newUser.email,
    })
    return res.status(201).json({token: JwtToken, userData: {name: newUser.name, role: newUser.role, isVerified: newUser.isActive}});
  } catch (e) {
    if (e.code === 11000) {
      return res.status(409).json('This email has already been registered');
    }
    return res.status(500).json('Internal Server Error');
  }
};

//Cuando el usuario se loguea
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({email})
    if (!foundUser) {
      return res.status(404).json('User not found');
    }
    if (!foundUser.isActive) {
      return res.status(403).json('Not verfied account');
    }
    const correctPassword = await compareData(password, foundUser.password);
    if (!correctPassword) {
      return res.status(400).json('Invalid Credentials');
    }
    const JwtToken = token({id: foundUser._id, role: foundUser.role});
    res.status(200).json({token: JwtToken, userData: {name: foundUser.name, role: foundUser.role, isVerified: foundUser.isActive}});
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
}

//Eliminar el Usuario
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const todayDate = new Date();
  const deleteStatus = {
    deletedAt: todayDate,
    isDeleted: true,
    isActive: false,
  }
  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("ObjectId is not valid");
    }
    const deleteUser = await User.findOneAndUpdate({_id: id }, deleteStatus);
    if (deleteUser) {
      res.status(200).json(`The user: ${deleteUser._id} was successfully deleted`);
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
}

//Traer un solo usuario
const getOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("ObjectId is not valid");
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json("User not found");
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
}

//Editar un usuario
const updateUser = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("ObjectId is not valid");
    }
    const updateUser = await User.findOneAndUpdate({_id: id }, body, { new: true });
    if (updateUser) {
      res.status(200).json(updateUser);
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
}

const activeAccount = async (req, res) => {
  const { id } = req.params;
  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("ObjectId is not valid");
    }
    const activeUser = await User.findOneAndUpdate({_id: id }, {isActive: true}, { new: true });
    if (activeUser) {
      res.status(200).json(activeUser);
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
}

module.exports = {
  getAllUsers,
  createUser,
  login,
  deleteUser,
  getOneUser,
  updateUser,
  activeAccount,
};
