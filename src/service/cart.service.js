
const BdCartManager = require("../dao/mongoManager/dbCartManager");

class CartService {

    constructor(manager) {
        this.dao = manager;
    }
    CreateCarts = (cart) => BdCartManager.CreateCarts(cart);
    getCartsId = (id) => BdCartManager.getCartsId(id);
    getCarts = () => BdCartManager.getCarts();
    addProductToCarts = (cid,pid) => BdCartManager.addProductToCarts(cid,pid);
    updateToCart = (cid) => BdCartManager.updateToCart(cid);
}

module.exports = CartService;