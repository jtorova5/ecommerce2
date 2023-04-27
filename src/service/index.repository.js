
const BdProductManager = require("../dao/mongoManager/dbProductManager");
const BdUsersManager = require("../dao/mongoManager/dbUsersManager");  
const ProductService = require("./product.service");
const UserService = require("./user.service");

const ProductRepository = new ProductService(BdProductManager);
const userService = new UserService(BdUsersManager);

module.exports = {ProductRepository, userService}