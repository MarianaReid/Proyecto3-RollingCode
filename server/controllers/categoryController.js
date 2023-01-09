const { ObjectId } = require("mongoose").Types;
const Category = require("../models/CategoryModel");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isDeleted: false }).populate('products');
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

const getOneCategory = async (req, res) => {
  const id = req.params.id;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("Id is not valid");
    }
    const category = await Category.findById(id).populate('products');
    if (!category) {
      return res.status(404).json("category not found");
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

const createCategory = async (req, res) => {
  const categorySave = { ...req.body, isActive: true };
  try {
    const category = new Category(categorySave);
    await category.save();
    return res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

const updateCategory = async (req, res) => {
    const bodyCategory = req.body;
    const id = req.params.id;
  try {
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("ObjectId is not valid");
    }
    const updateCategory = await Category.findOneAndUpdate({_id: id},bodyCategory,{ new: true })

    if (updateCategory) {
        res.status(200).json(updateCategory);
      } else {
        res.status(404).json("Category not found");
      }
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

const deleteCategory = async (req, res) => {
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
    const deleteCategory = await Category.findOneAndUpdate({_id: id},deleteStatus,{ new: true })

    if (deleteCategory) {
        res.status(200).json(`Category deleted = ${deleteCategory.name}`);
      } else {
        res.status(404).json("Category not found");
      }
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

module.exports = {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory
};
