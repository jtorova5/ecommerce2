
const ProductManager = require("../dao/mongoManager/dbProductManager");
const dbCartsManager = require("../dao/mongoManager/dbCartManager");

const views = async (req, res) => {
    const page = req.query.page
    const products = await ProductManager.getProduct(page);
    const view = products.docs.map((products) => ({ title: products.title, description: products.description, price: products.price, stock: products.stock, thumbnail: products.thumbnail}));
    if(req.session.user) {
        res.render('home', { products: view, hasPrevPage: products.hasPrevPage, hasNextPage: products.hasNextPage, page: products.page, totalPages: products.totalPages, prevPage: products.prevPage, nextPage: products.nextPage, name: req.session.user.first_name,
            lastName: req.session.user.last_name});
    } else {
        res.render('login');
    }
}

const viewCart = async (req, res) => {
    const {cid} = req.params
    const carts = await dbCartsManager.renderCartId(cid);
    const view = carts.map((carts) => ({ priceTotal: carts.priceTotal, quantityTotal: carts.quantityTotal}));
    res.render('cart', {carts: view})
}

const login = async (req, res) => {
    if(req.session.user) {
        res.render('profile',{name:req.session.user.first_name});
    } else {
        res.render('login');
    }
}

const register = async (req, res) => {
    if(req.session.user) {
        res.render('profile',{name:req.session.user.first_name});
    } else {
        res.render('register');
    }
}

const profile = async (req, res) => {
    if(req.session.user) {
        res.render('profile', {
            name: req.session.user.first_name,
            lastName: req.session.user.last_name,
            email: req.session.user.email,
            age: req.session.user.age
        })
    } else {
        res.render('login',);
    }
}

const logout = async (req, res) => {
    req.session.destroy();
    res.render('logout');
}

module.exports = {views, viewCart, login, register, profile, logout,}