const Product = require('../models/productModel')

const productService = {
    findAllProducts: async (filter, page) => {
        // return await Product.find(filter).populate('categories')
        // const produ = await Product.find(filter).populate('categories')
        const options = {
            page,
            limit: 3
        };
        return await Product.paginate({ filter }, options)
    },
    saveProduct: async (product) => {
        const newProduct = new Product(product)
        return await newProduct.save()
    }

}

module.exports = { productService };
