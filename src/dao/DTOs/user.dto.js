
class UserDTO {
    constructor(user){
        this.id = user._id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.full_name = user.first_name + ' ' + user.last_name;
        this.email = user.email;
        this.age = user.age;
        this.password = user.password;
        this.role = user.role;
        this.last_connection = user.last_connection;
        this.documents = user.documents;
    }
}

module.exports = UserDTO;