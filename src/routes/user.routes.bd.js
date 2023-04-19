
const {Router} = require("express");
const {getUsers, insertUser, updateUser, deleteUser} = require("../controller/user.controller.bd");


const userRouter = Router()

userRouter.get('/',getUsers)
userRouter.post('/', insertUser)
userRouter.put('/', updateUser)
userRouter.delete('/', deleteUser)

module.exports = userRouter