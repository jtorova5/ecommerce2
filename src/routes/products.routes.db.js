
const {Router} = require('express');
const productsControllerBD = require('../controller/products.controller.db')
const permissions = require('../utils/middleware')


const router =  Router();

router.get ("/",  productsControllerBD.getProductsBd)
router.post("/", permissions.adminPremiumPermission ,productsControllerBD.addProductBd)
router.get ("/:pid",  productsControllerBD.getProductIdBd)
router.put ("/:pid", permissions.adminPremiumPermission , productsControllerBD.UpdateProductBd)
router.delete ("/:pid", permissions.adminPremiumPermission ,productsControllerBD.deleteProductBd)


module.exports = router