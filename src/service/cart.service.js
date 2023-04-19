
const dbCartManager = require("../dao/mongoManager/dbCartManager");

class CartService {

    constructor(manager) {
        this.dao = manager;
    }

    CreateCarts = (cart) => dbCartManager.CreateCarts(cart);
    getCartsId = (id) => dbCartManager.getCartsId(id);
    getCarts = () => dbCartManager.getCarts();
    addProductToCarts = (cid,pid) => dbCartManager.addProductToCarts(cid,pid);
    updateToCart = (cid) => dbCartManager.updateToCart(cid);

}

module.exports = CartService;