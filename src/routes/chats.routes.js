
const { Router } = require('express');
const chatsController = require('../controller/views.chat.controller')

const router = Router();

router.get('/', chatsController.getSendMessage)
router.post('/', chatsController.sendMessage);
router.delete('/:chid', chatsController.deleteMessage);

module.exports = router;