
const Products = require("../dao/mongoManager/dbProductManager");

const getProductsDB = async (req, res) => {
  const { limit, page, sort, ...query } = req.query;
  const products = await Products.getProduct(page, limit, sort, query);
  const { docs } = products;
  const state = products ? "success" : "error";
  if (products) {
    res.json({ ...products, status: state, payload: docs })
  } else {
    res.json(products)
  }
}

const addProductDB = async (req, res) => {
  const product = req.body;
  const newproduct = await Products.addProduct(product);
  if (newproduct) {
    res.json(newproduct)
  } else {
    res.json(newproduct)
  }
}

const getProductIdDB = async (req, res) => {
  const id = req.params.pid
  const getProductId = await Products.getProductId(id);
  if (getProductId) {
    res.json(getProductId)
  } else {
    res.json(getProductId)
  }
}

const updateProductDB = async (req, res) => {
  const id = req.params.pid
  const product = req.body
  const UpdateProductId = await Products.updateProduct(id, product);
  if (UpdateProductId) {
    res.json(UpdateProductId)
  } else {
    res.json(UpdateProductId)
  }
}

const deleteProductDB = async (req, res) => {
  const id = req.params.pid
  const deleteproduct = await Products.deleteProductId(id);
  if (deleteproduct) {
    res.json(deleteproduct)
  } else {
    res.json(deleteproduct)
  }
}

module.exports = {getProductsDB, getProductIdDB, addProductDB, updateProductDB, deleteProductDB};