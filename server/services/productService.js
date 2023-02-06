const Product = require('../models/productModel')

const productService = {
    findAllProducts: async (query , page, limit) => {
        // return await Product.find(filter).populate('categories')
        // const produ = await Product.find(filter).populate('categories')
        const options = {
            page,
            limit,
        };

        console.log(query);

        return await Product.paginate(query, options)
    },
    saveProduct: async (product) => {
        const newProduct = new Product(product)
        return await newProduct.save()
    }

}

module.exports = { productService };
