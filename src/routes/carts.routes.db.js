
const {Router} = require('express');
const cartsControllerBd = require('../controller/carts.controller.db');
const { mdlwUserSession } = require('../utils/middleware');
const permissions = require('../utils/middleware');


const router =  Router();

router.post('/', cartsControllerBd.createCarts)
router.get('/', cartsControllerBd.bdgetCarts)
router.get('/:cid',cartsControllerBd.bdgetCartId)
router.put('/:cid/',cartsControllerBd.updateCart)
router.delete ('/:cid/', cartsControllerBd.deleteAllProductsCart);
router.post('/:cid/product/:pid', permissions.mdlwUserSession, permissions.adminPremiumPermission, cartsControllerBd.addProductToCart);
router.delete('/:cid/product/:pid', permissions.mdlwUserSession, cartsControllerBd.deleteProductToCart);
router.put('/:cid/product/:pid',cartsControllerBd.updateQuantityOnCart)

router.get ('/:cid/purchase', permissions.mdlwUserSession ,cartsControllerBd.purchase)


module.exports = router;