

const ProductManager = require("../dao/fsManager/ProductManager");
const Product = new ProductManager('./assets/product.json');

const getProducts = async (req, res) => {
  const { limit: limite = "" } = req.query;
  if (!limite) {
    let productos = await Product.getProducts();
    if (productos.length == 0) {
      res.json({ msg: "There are no products" });
    } else {
      res.json(productos);
    }
  } else {
    let productos = await Product.getProducts(limite);
    res.json(productos);

  }
}

const getProductId = async (req, res) => {
  const pid = req.params.pid
  let product = await Product.getProductById(pid);
  if (!product) {
    res.json("Product not found")
  } else {
    res.json(product)


  }
}

const addProduct = async (req, res) => {
  const body = req.body;
  const add = await Product.addProduct(body);
  if (add.erro) {
    res.json(add)
  } else {
    res.json(add);
  }

}

const updateProduct = async (req, res) => {
  const id = +req.params.pid
  const body = req.body
  const update = await Product.UpdateProduct(id, body);
  if (update) {
    res.json(update)
  } else {
    res.json(update);
  }

}

const deleteProduct = async (req, res) => {
  const id = +req.params.pid
  const Delete = await Product.deleteProduct(id);
  if (Delete.erro) {
    res.json(Delete);
  } else {
    res.json(Delete);
  }
}

module.exports = {getProducts, getProductId, addProduct, updateProduct, deleteProduct};
