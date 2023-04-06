
const UsersModel = require("../dao/models/users.model");

const getUser = () => UsersModel.find();

module.exports = {
    getUser,
}