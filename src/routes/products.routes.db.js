
const {Router} = require('express');
const productsControllerDB = require('../controller/products.controller.db')


const router =  Router();

router.get ("/",  productsControllerDB.getProductsDB);
router.post("/", productsControllerDB.addProductDB);
router.get ("/:pid",  productsControllerDB.getProductIdDB);
router.put ("/:pid",  productsControllerDB.updateProductDB);
router.delete ("/:pid",  productsControllerDB.deleteProductDB);

module.exports = router;