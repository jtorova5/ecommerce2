
const {Router} = require('express');
const productsController = require('../controller/products.controller');

const router =  Router();

router.get ("",  productsController.getProducts);
router.get ("/:pid",  productsController.getProductId);
router.post("/", productsController.addProduct);
router.put ("/:pid",  productsController.updateProduct);
router.delete ("/:pid",  productsController.deleteProduct);

module.exports = router;