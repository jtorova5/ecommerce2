
const {Router} = require('express');
const chatsController = require('../controller/views.chat.controller');
const { ifUserExists } = require('../utils/middleware');
const permissions = require('../utils/middleware');


const router =  Router();

 router.get('/', chatsController.getsendMessage)
 router.post('/',ifUserExists, permissions.mdlwUserSession, chatsController.sendMessage);
 router.delete('/:chid', chatsController.deleteMessage);

module.exports = router;