const Product = require('../models/productModel')

const options = {
    populate: 'categories',
    page: 1,
    limit: 3
};

const productService = {
    findAllProducts: async(filter)=>{
        // return await Product.find(filter).populate('categories')
        // const produ = await Product.find(filter).populate('categories')
        return await Product.paginate(filter, options)
    },
    saveProduct: async(product)=>{
        const newProduct = new Product(product)
        return await newProduct.save()
    }

}

module.exports = { productService };
