
const {Router} = require('express')
const viewControllers = require('../controller/views.controller')

const router = Router();

router.get('/products/', viewControllers.views);
router.get('/carts/:cid', viewControllers.viewCart);


module.exports = router;