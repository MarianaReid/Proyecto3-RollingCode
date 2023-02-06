const { ObjectId } = require("mongoose").Types;
const { productService } = require("../services/productService");
const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 3;
    const search = req.query.search;
    const query = {
      isDeleted: false,
      name: new RegExp(search, "i"),
    };
    const products = await productService.findAllProducts(query, page, limit);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

const getOneProduct = async (req, res) => {
  const id = req.params.id;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("Id is not valid");
    }
    const product = await Product.findById(id).populate('categories');
    if (!product) {
      return res.status(404).json("product not found");
    } else {
      res.status(200).json(product);
    }
  } catch (error) { }
};

const createProduct = async (req, res) => {
  const productSave = { ...req.body, isActive: true };
  console.log(productSave);
  try {
    const newProduct = await productService.saveProduct(productSave);
    return res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

const updateProduct = async (req, res) => {
  const bodyProduct = req.body;
  const id = req.params.id;
  try {

    if (!ObjectId.isValid(id)) {
      return res.status(400).json("ObjectId is not valid");
    }
    const updateProduct = await Product.findOneAndUpdate({ _id: id }, bodyProduct, { new: true })

    if (updateProduct) {
      res.status(200).json(updateProduct);
    } else {
      res.status(404).json("product not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const deleteStatus = {
    deletedAt: new Date(),
    isDeleted: true,
    isActive: false,
  }
  try {

    if (!ObjectId.isValid(id)) {
      return res.status(400).json("ObjectId is not valid");
    }
    const deletedProduct = await Product.findOneAndUpdate({ _id: id }, deleteStatus, { new: true })

    if (deletedProduct) {
      res.status(200).json(`product deleted = ${deletedProduct.name}`);
    } else {
      res.status(404).json("product not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
