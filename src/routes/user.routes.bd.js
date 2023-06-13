
const {Router} = require("express");
const {getUsers, insertUser, updateUser, deleteUser} = require("../controller/user.controller.bd");
const sessionController = require("../controller/session.controller");
const { saveDocs} = require("../utils/multer");


const userRouter = Router()

userRouter.get('/',getUsers)
userRouter.post('/', insertUser)
userRouter.put('/', updateUser)
userRouter.delete('/', deleteUser)
userRouter.post('/premium/:uid', sessionController.updateRole)
userRouter.post('/:uid/documents', saveDocs ,sessionController.uploadDocs);
module.exports = userRouter