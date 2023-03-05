const { ObjectId } = require("mongoose").Types;
const Cart = require("../models/CartModel");

const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find({ isDeleted: false }).populate('users');
    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

const getOneCart = async (req, res) => {
  const id = req.params.id;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("Id is not valid");
    }
    const cart = await Cart.findById(id).populate('users');
    if (!cart) {
      return res.status(404).json("cart not found");
    } else {
      res.status(200).json(cart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

const createCart = async (req, res) => {
  const cartSave = { ...req.body, isActive: false };
  try {
    const cart = new Cart(cartSave);
    await cart.save();
    return res.status(201).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

const updateCart = async (req, res) => {
    const bodyCart = req.body;
    const id = req.params.id;
  try {
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("ObjectId is not valid");
    }
    const updateCart = await Cart.findOneAndUpdate({_id: id},bodyCart,{ new: true })

    if (updateCart) {
        res.status(200).json(updateCart);
      } else {
        res.status(404).json("Cart not found");
      }
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

const deleteCart = async (req, res) => {
    const id = req.params.id;
    const deleteStatus = {
        deletedAt: new Date(),
        isDeleted: true,
        isActive: false
      }
  try {
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("ObjectId is not valid");
    }
    const deleteCart = await Cart.findOneAndUpdate({_id: id},deleteStatus,{ new: true })

    if (deleteCart) {
        res.status(200).json(`Cart deleted = ${deleteCart._id}`);
      } else {
        res.status(404).json("Cart not found");
      }
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

module.exports = {
  getAllCarts,
  getOneCart,
  createCart,
  updateCart,
  deleteCart
};
