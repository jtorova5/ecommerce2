
const {Router} = require("express");
const {getUsers, insertUser, updateUser, deleteUser} = require("../controller/user.controller.bd");
const sessionController = require("../controller/session.controller");

const userRouter = Router()

userRouter.get('/',getUsers)
userRouter.post('/', insertUser)
userRouter.put('/', updateUser)
userRouter.delete('/', deleteUser)
userRouter.post('/premium/:uid', sessionController.updateRole)
module.exports = userRouter