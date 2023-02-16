
const productModel = require('../models/products.model')

class dbProductManager {
    
    constructor() {
        this.products = []
    }

    getProduct = async (limite) => {
        try {
            if (limite) {
                const products = await productModel.find().limit(limite);
                return products
            } else {
                const products = await productModel.find();
                return products
            }
        } catch (error) {
            return { msg: "Error getting products" }
        }
    }

    addProduct = async (product) => {
        try {
            const newproduct = await productModel.create(product);
            return ({ msg: "Product created", newproduct })
        } catch (error) {
            return { msg: "Error creating product" }
        }
    }

    getProductId = async (id) => {
        try {
            const getproductId = await productModel.findById(id);
            return getproductId
        } catch (error) {
            return { msg: "Product not found" }
        }
    }

    updateProduct = async (id, product) => {
        const { title, description, code, price, status, stock, category, thumbnail } = product
        try {
            const UpdateProduct = await productModel.findByIdAndUpdate(id, { title, description, code, price, status, stock, category, thumbnail });
            return UpdateProduct
        } catch (error) {
            return { msg: "Error updating product" }
        }

    }

    deleteProductId = async (id) => {
        try {
            const deleteproduct = await productModel.findByIdAndDelete(id);
            return deleteproduct
        } catch (error) {
            return { msg: "Error deleting product" }
        }
    }
}

module.exports = dbProductManager;