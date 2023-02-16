
const ProductManager = require("../dao/mongoManager/dbProductManager");
const CartController = require("./carts.controller.db");

const views = async (req, res) => {
    let products = await ProductManager.getProduct();
    res.render("home", { products });
}

const viewCart = async (req, res) => {
    let carts = await CartController.getCartId();
    res.render("cart", { carts });
}

module.exports = {views, viewCart};