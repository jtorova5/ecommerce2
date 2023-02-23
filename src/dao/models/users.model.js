
const mongoose = require('mongoose');
const usersCollection = "usersLogin";

const UserSchema = new mongoose.Schema({
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  });
  
  const UsersModel = mongoose.model(usersCollection, UserSchema);

  module.exports = UsersModel;