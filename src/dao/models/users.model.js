
const mongoose = require('mongoose');
const usersCollection = "usersLogin";

const roles = ['admin', 'superadmin', 'user']

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
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts',
  },
  role: {
    type: String,
    enum: roles,
    required: true,
    default: 'user',
  },
});

const UsersModel = mongoose.model(usersCollection, UserSchema);

module.exports = UsersModel;