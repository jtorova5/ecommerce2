
const cartsModel = require('../models/carts.model')

class dbCartsManager {

    constructor() {
        this.carts = []
    }

    createCarts = async (cart) => {
        try {
            const Createcart = await cartsModel.create(cart);
            return Createcart
        } catch (error) {
            return { msg: "Error creating carts" }
        }
    }

    getCartsId = async (id) => {
        try {
            const cart = await cartsModel.findById(id);
            return cart
        } catch (error) {
            return undefined;
        }
    }

    getCarts = async () => {
        try {
            const cart = await cartsModel.find();
            return cart
        } catch (error) {
            return { msg: "Error displaying cart" }
        }
    }

    addProductToCarts = async (cid, product) => {
        const cart = await cartsModel.findById(cid);
        console.log(JSON.stringify(product))
        const result = cart.products.findIndex((prod) => prod.id == product.id)
        console.log(result)
        if (result === -1){
            
        }else {

        }
    }

    updateToCart = async (cart) => {
        const cartUpdated = await cartsModel.findByIdAndUpdate(cart.id, cart,{new: true,});
        return cartUpdated;
    }
}

module.exports = dbCartsManager;