
const Products = require("../dao/mongoManager/dbProductManager");
const dbCartsManager = require("../dao/mongoManager/dbCartManager");
const { find } = require("../dao/models/products.model");

const createCarts = async (req, res) => {
  const cart = req.body
  const Createcart = await dbCartsManager.createCarts(cart);
  if (!Createcart.error) {
    res.json(Createcart)
  } else {
    res.json(Createcart)
  }
}

const bdgetCartId = async (req, res) => {
  const id = req.params.cid
  console.log(id)
  const cart = await dbCartsManager.getCartsId(id);
  if (!cart.error) {
    res.json(cart)
  } else {
    res.json(cart)
  }
}

const bdgetCarts = async (req, res) => {
  const cart = await dbCartsManager.getCarts();
  if (!cart.error) {
    res.json(cart)
  } else {
    res.json(cart)
  }
}

const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params
  const product = await Products.getProductId(pid)

  if (!product) {
    return res.status(400).json({
      msg: `Product with id ${pid} does not exist`,
      ok: false,
    })
  }

  const cart = await dbCartsManager.getCartsId(cid);

  if (!cart) {
    const newCart = {
      priceTotal: product.price,
      quantityTotal: 1,
      products: [{ id: product.id, title: product.title, description: product.description, price: product.price, quantity: 1 }],
      username: cid
    }
    const cartToSave = await dbCartsManager.addProductToCarts(newCart);
    return res.status(200).json({
      msg: 'Cart successfully created',
      cart: cartToSave
    })
  }

  const findProduct = cart.products.find((product) => product.id === pid);

  if (!findProduct) {
    cart.products.push({ id: product.id, title: product.title, description: product.description, price: product.price, quantity: 1 })
    cart.quantity = cart.quantity + 1
    const cartToUpdate = await dbCartsManager.updateToCart(cart)
    return res.status(201).json({
      msg: `Product added to cart: ${cid}`,
      cart: cartToUpdate,
    })
  }
}

const deleteProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const Cart = await dbCartsManager.getCartsId(cid);
  const findProductTocart = Cart.products.find((prod) => prod.id === pid)

  if (!findProductTocart) {
    return res.status(400).json({
      msg: `Product with id:${pid} does not exist`,
      ok: false,
    });
  } else {
    if (findProductTocart.quantity === 1) {
      const index = Cart.products.findIndex((prod) => prod.id === pid);
      Cart.products.splice(index, 1);
    } else {
      findProductTocart.quantity--;
    }
    Cart.quantityTotal = Cart.quantityTotal - 1;
    const total = Cart.products.reduce((acumulador, total) => acumulador + total.price * total.quantity, 0);
    Cart.priceTotal = total;
    const cartToUpdate = await dbCartsManager.updateToCart(Cart);
    return res.status(200).json({ msg: 'Product removed from cart', cart: cartToUpdate });
  }
}

const deleteAllProductsCart = async (req, res) => {
  const { cid, pid } = req.params;
  const Cart = await dbCartsManager.getCartsId(cid);
  if (Cart.products.length > 0) {
    const cartToDelete = Cart.deleteMany({});
    return { msg: 'All products have been removed from the cart' }
  } else {
    return { msg: 'This cart has no products to delete' };
  }
}
const updateCart = async (req, res) => {
  const cartToUpdate = await dbCartsManager.updateToCart(Cart);
}


const updateQuantityToCart = async (quantity) => {
  try {
    const cart = await cartsModel.findOneAndUpdate({ quantity })
  } catch (error) {
    return { msg: 'Error updating cart quantity' }
  }
}


module.exports = { createCarts, bdgetCarts, bdgetCartId, addProductToCart, deleteProductToCart, deleteAllProductsCart, updateCart, updateQuantityToCart };