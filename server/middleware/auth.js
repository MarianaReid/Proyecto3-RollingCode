const User = require('../models/UserModel');
const { getTokenToHeader, verifiedToken } = require('../utils/jwtService');

const isLoggedIn = async (req, res, next) => {
  const token = getTokenToHeader(req);
  if (!token) {
    return res.status(401).json('Unauthorized');
  }
  try {
    console.log("TOKEN",token);
    const decodeToken = verifiedToken(token);
    const userFound = await User.findById(decodeToken.id);
    if (!userFound) res.status(401).json('Unauthorized');
    if(!userFound.isActive) res.status(403).json('Not verfied account');
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error');
  }
};

const checkRole = (role) => {
  try {
    return async (req, res, next) => {
      const token = getTokenToHeader(req);
      if (!token) {
        res.status(401).json('Unauthorized');
      }
      const decodeToken = verifiedToken(token);
      const userFound = await User.findById(decodeToken.id);
      if (userFound && userFound.role === role) next();
      else res.status(403).json('Unauthorized');
    };
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error');
  }
};

module.exports = { isLoggedIn, checkRole };
