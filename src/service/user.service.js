
class UserService {
    constructor(dao) {
        this.dao = dao;
    }

    getUser =() => this.dao.get()

    insertUser =(user) => this.dao.insert(user)

    updateUser =(user,id) => this.dao.update(user,id)

    delete =(id)=>this.dao.delete(id)
}

module.exports = UserService