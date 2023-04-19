
const dbProductManager = require("../dao/mongoManager/dbProductManager");

class ProductService {

    constructor(manager) {
        this.dao=manager;
    }

    get = (page,limit,sort,query) => this.dao.getProduct(page,limit,sort,query)
    add =  (product) => this.dao.addProduct(product) 
    getId = (id) => this.dao.getProductId(id) 
    UpdateProduct = (id,product) => dbProductManager.UpdateProduct(id,product) 
    DeleteProductId = (id) => dbProductManager.DeleteProductId(id); 

}

module.exports = ProductService;