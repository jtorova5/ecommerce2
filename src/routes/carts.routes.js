
const {Router} = require('express');
const cartsController = require('../controller/carts.controller')

const router =  Router();

router.post("/", cartsController.createCarts);
router.get('/:cid', cartsController.getCarts);
router.post('/:cid/products/:pid', cartsController.addProductToCart);

module.exports = router;