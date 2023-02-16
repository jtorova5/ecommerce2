
const dbChatsManager = require('../dao/mongoManager/dbChatsManager');
const Chats = new dbChatsManager();
// const {emitMessage} = require('../utils/socket.io')
// const {emitDeleteMs} = require('../utils/socket.io')

const sendMessage = async (req, res) => {
    const message = req.body
    const saveMessage = await Chats.sendMessage(message)
    if (!saveMessage) {
        return res.json({
            msg: 'Message could not be sent',
        });
    } else {
        emitMessage(saveMessage)
        return res.json({
            msg: 'Message sent',
            playlist: saveMessage,
        })
    }
}

const getSentMessage = async (req, res) => {
    const getMessage = await Chats.getMessage()
    if (!getMessage) {
        return res.json({
            msg: 'Messages could not been displayed',
        });
    } else {
        return res.json({
            msg: 'Chats',
            chats: getMessage
        });
    }
}

const deleteMessage = async (req, res) => {
    const id = req.params.chid
    const deleteMessage = await Chats.deleteMessage(id)
    if (!deleteMessage) {
        return res.json({
            msg: 'Message could not be deleted',
        });
    } else {
        emitDeleteMj(deleteMessage)
        return res.json({
            msg: 'Menssage deleted',
            chats: deleteMessage
        });
    }
}

module.exports = {sendMessage, getSentMessage, deleteMessage};