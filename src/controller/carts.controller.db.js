
const { v4 } = require("uuid");
const BdCartManager = require("../dao/mongoManager/dbCartManager");
const BdProductManager = require("../dao/mongoManager/dbProductManager");


const createCarts = async (req, res) => {
  const cart = req.body
  const Createcart = await BdCartManager.CreateCarts(cart);
  if (!Createcart.error) {
    res.json(Createcart)
  } else {
    res.json(Createcart)
  }
}

const bdgetCartId = async (req, res) => {
  const id = req.params.cid
  const cart = await BdCartManager.getCartsId(id);
  if (!cart.error) {
    res.json(cart)
  } else {
    res.json(cart)
  }
}

const bdgetCarts = async (req, res) => {
  const cart = await BdCartManager.getCarts();
  if (!cart.error) {
    res.json(cart)
  } else {
    res.json(cart)
  }
}

const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params
  const product = await BdProductManager.getProductId(pid)
  
  if (!product) {
    return res.status(400).json({
      msg: `Product with id ${pid} does not exist`,
      ok: false,
    });
  }
  
  const cart = await BdCartManager.getCartsId(cid);
  
  if (!cart) {
    const newCart = {
      priceTotal: product.price,
      quantityTotal: 1,
      products: [{ id: product.id, title: product.title, description: product.description, price: product.price, quantity: 1 }],
      username: cid
    }
    
    const cartToSave = await BdCartManager.addProductToCarts(newCart);
    
    return res.status(200).json({
      msg: 'Cart succesfully created',
      cart: cartToSave
    })
  }
  
  const findProduct = cart.products.find((product) => product.id === pid);
  
  if (!findProduct) {
    cart.products.push({ id: product.id, title: product.title, description: product.description, price: product.price, quantity: 1 })
    cart.quantity = cart.quantity + 1
    cart.priceTotal = cart.priceTotal + product.price
  } else {
    findProduct.quantity++;
    cart.priceTotal = cart.products.reduce((acumulador, total) => acumulador + (product.price * total.quantity), 0);
  }
  cart.quantityTotal = cart.quantityTotal + 1;
  const cartToUpdate = await BdCartManager.updateToCart(cart)
  
  return res.status(201).json({
    msg: `Product added to cart: ${cid}`,
    cart: cartToUpdate,
  })
};

const deleteProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const Cart = await BdCartManager.getCartsId(cid);
  JSON.stringify(Cart)
  const findProductTocart = Cart.products.find((prod) => prod.id === pid)
  
  if (!findProductTocart) {
    return res.status(400).json({
      msg: `EProduct with id ${pid} does not exist`,
    });
  } else {
    if (findProductTocart.quantity === 1) {
      Cart.products = Cart.products.filter((prod) => prod.id !== pid);
    } else {
      findProductTocart.quantity--;
    }
    const product = await BdProductManager.getProductId(pid);
    Cart.quantityTotal = Cart.quantityTotal - 1;
    const total = Cart.products.reduce((acumulador, total) => acumulador + product.price * total.quantity, 0);
    Cart.priceTotal = total;
    const cartToUpdate = await BdCartManager.updateToCart(Cart);
    return res.status(200).json({ msg: 'Product deleted from cart', cart: cartToUpdate });
  }
}

const deleteAllProductsCart = async (req, res) => {
  const { cid, pid } = req.params;
  const Cart = await BdCartManager.getCartsId(cid);
  if (Cart.products.length > 0) {
    Cart.products = [];
    Cart.quantityTotal = 0
    Cart.priceTotal = 0
    const cartToUpdate = await BdCartManager.updateToCart(Cart)
    return res.status(201).json({
      msg: 'All product have been deleted',
      Cart: cartToUpdate
    })
  } else {
    return { msg: 'This cart has no products to delete' };
  }
}

const updateCart = async (req, res) => {
  const { cid } = req.params;
  const body = req.body;
  const Cart = await Carts.getCartsId(cid);
  
  if (!Cart) {
    return res.status(200).json({
      msg: 'Cart not found',
    });
  }
  Cart.products = [];
  Cart.cantidadTotal = 0;
  Cart.totalPrice = 0;
  
  const product = await BdProductManager.getProductId(body.id);
  
  if (!product) {
    return res.status(400).json({
      msg: `Product with id ${pid} does not exist`,
      ok: false,
    });
  }
  Cart.products.push({ id: product.id, quantity: body.quantity })
  
  Cart.quantityTotal = body.quantity;
  Cart.priceTotal = product.price * body.quantity;
  
  const cartToUpdate = await BdCartManager.updateToCart(Cart);
  
  return res.status(201).json({
    msg: `Product added to cart: ${cid}`,
    cart: cartToUpdate,
  });
}

const updateQuantityOnCart = async (req, res) => {
  const { cid, pid, } = req.params;
  const { quantity: quantity } = req.body;
  const Cart = await BdCartManager.getCartsId(cid);
  const product = await BdProductManager.getProductId(pid);
  if (!Cart) {
    return res.status(400).json({
      msg: "Cart not found",
      ok: false,
    })
  }
  
  const findProductTocart = Cart.products.find((prod) => prod.id === pid);
  
  if (!findProductTocart) {
    return res.status(400).json({
      msg: "Product not found",
      ok: false,
    })
  }
  
  if (quantity == undefined) {
    return res.status(400).json({
      msg: "Quantity to update",
      ok: false,
    })
  } else {
    if (quantity < 0) {
      return res.status(400).json({
        msg: "Quantity must be bigger than 0",
        ok: false,
      });
    } else {
      findProductTocart.quantity = quantity
      if (findProductTocart.quantity > quantity) {
        cart.priceTotal = cart.priceTotal - product.price * findProductTocart.quantity
      } else {
        cart.priceTotal = cart.priceTotal + product.price * findProductTocart.quantity
      }
    }
  }
  Cart.priceTotal = Cart.products.reduce((acumulador, total) => acumulador + total.price * total.quantity, 0)
  Cart.quantityTotal = Cart.products.reduce((Acumulador,ProductoActual) => Acumulador + ProductoActual.quantity, 0)
  const cartToUpdate = await BdCartManager.updateToCart(Cart)
  return res.status(201).json({
    msg: "Quantity updated",
    Cart: cartToUpdate
  })
}

const purchase = async (req, res) => {
  let total = 0;
  const id = req.params.cid
  const carts = await BdCartManager.getCartsId(id);

  const cartsTicket = []
  const cartsReject = []

  for (let i = 0; i < carts.products.length; i++) {
    const productBd = await BdProductManager.getProductId(carts.products[i].id);

    if (productBd.stock >= carts.products[i].quantity) {
      const newproduct = {
        title: productBd.title,
        description: productBd.description,
        code: productBd.code,
        price: productBd.price,
        status: productBd.status,
        stock: productBd.stock - carts.products[i].quantity,
        category: productBd.category,
        thumbnail: productBd.thumbnail,
      };
      await BdProductManager.UpdateProduct(productBd.id, newproduct);
      total += productBd.price * carts.products[i].quantity;
      cartsTicket.push(carts.products); 
      console.log('ok');
    } else (productBd.stock <= carts.products[i].quantity); {
      cartsReject.push(productBd); 
      console.log('Products rejected, try again',cartsReject);
    }
  }

  const cart = await BdCartManager.purchase({code:v4(),amount:total,purchaser:id,products:cartsTicket}); 
  if (!cart.error) {
    res.json(cart)
  } else {
    res.json(cart)
  }
}

module.exports = { createCarts, bdgetCarts, bdgetCartId, addProductToCart, deleteProductToCart, deleteAllProductsCart, updateCart, updateQuantityOnCart, purchase}