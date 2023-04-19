
const dbProductManager = require("../dao/mongoManager/dbProductManager");
const dbUsersManager = require("../dao/mongoManager/dbUsersManager");
const ProductService = require("./product.service");
const UserService = require("./user.service");

const ProductRepository = new ProductService(dbProductManager);
const userService = new UserService(dbUsersManager);

module.exports = {ProductRepository, userService}