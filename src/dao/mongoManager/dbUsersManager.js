

const UsersModel = require('../models/users.model');

class BdUserManager {

  get = ()  => UsersModel.find()
  
  insert = (user) => UsersModel.create(user)

  update = (user,id) => UsersModel.findByIdAndUpdate(id,user)

  delete = (id) => UsersModel.findByIdAndDelete(id);

  lastConnection = async (user, lastconnection) => {
    user.last_connection = lastconnection;
    let result = await UsersModel.findByIdAndUpdate(user._id, {last_connection: lastconnection});
    return result;
  };
}

module.exports = new BdUserManager();