const Product = require('../models/productModel')

const productService = {
    findAllProducts: async (filter, page, limit) => {
        // return await Product.find(filter).populate('categories')
        // const produ = await Product.find(filter).populate('categories')
        const options = {
            page,
            limit
        };
        return await Product.paginate({ filter }, options)
    },
    saveProduct: async (product) => {
        const newProduct = new Product(product)
        return await newProduct.save()
    }

}

module.exports = { productService };
