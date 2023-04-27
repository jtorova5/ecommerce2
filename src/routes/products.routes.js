
const {Router} = require('express');
const productsController = require('../controller/products.controller');
const { mdlwOnlyAdmin } = require('../utils/middleware');

const router =  Router();

router.get ("/",  productsController.getProducts)
router.get ("/:pid",  productsController.getProductId)
router.post("/",mdlwOnlyAdmin, productsController.addProduct)
router.put ("/:pid",mdlwOnlyAdmin,  productsController.UpdateProduct)
router.delete ("/:pid",mdlwOnlyAdmin,  productsController.deleteProduct)

module.exports = router;