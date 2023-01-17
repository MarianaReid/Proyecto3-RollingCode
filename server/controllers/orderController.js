const { ObjectId } = require("mongoose").Types;
const Order = require("../models/OrderModel");

const options = {
  populate: 'products',
  page: 1,
  limit: 3
};

const getAllOrders = async (req, res) => {
  try {
    //const orders = await Order.find({ isDeleted: false }).populate('products');
    const orders = await Order.paginate({ isDeleted: false }, options);
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

const getOneOrder = async (req, res) => {
  const id = req.params.id;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("Id is not valid");
    }
    const order = await Order.findById(id).populate('products');
    if (!order) {
      return res.status(404).json("order not found");
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

const createOrder = async (req, res) => {
  const orderSave = { ...req.body, isActive: true };
  try {
    const order = new Order(orderSave);
    await order.save();
    return res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

const updateOrder = async (req, res) => {
    const bodyOrder = req.body;
    const id = req.params.id;
  try {
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("ObjectId is not valid");
    }
    const updateOrder = await Order.findOneAndUpdate({_id: id},bodyOrder,{ new: true })

    if (updateOrder) {
        res.status(200).json(updateOrder);
      } else {
        res.status(404).json("Order not found");
      }
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

const deleteOrder = async (req, res) => {
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
    const deleteOrder = await Order.findOneAndUpdate({_id: id},deleteStatus,{ new: true })

    if (deleteOrder) {
        res.status(200).json(`Order deleted = ${deleteOrder._id}`);
      } else {
        res.status(404).json("Order not found");
      }
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

module.exports = {
  getAllOrders,
  getOneOrder,
  createOrder,
  updateOrder,
  deleteOrder
};
