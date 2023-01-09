const Product= require('../models/productModel')

const productService = {
    findAllProducts: async(filter)=>{
        return await Product.find(filter).populate('categories')
    },
    saveProduct: async(product)=>{
        const newProduct = new Product(product)
        return await newProduct.save()
    }

}

module.exports = { productService };
