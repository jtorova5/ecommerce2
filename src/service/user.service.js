
const userModel = require('../dao/models/users.model');

class UserService {
    constructor(dao) {
        this.dao = dao;
    }
    getUser = (email) => userModel.find(email);
    insertUser =(user) => this.dao.insert(user)
    updateUser =(user,id) => this.dao.update(user,id)
    delete =(id)=>this.dao.delete(id)
}

module.exports = UserService