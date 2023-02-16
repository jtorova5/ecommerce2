
const chatModel = require('../models/chats.model')

class dbChatsManager {

    sendMessage = async (message) => {
        try {
            const saveMessage = await chatModel.create(message)
            return saveMessage
        } catch (error) {
            return { msg: 'Message could not be saved' }
        }
    }

    getMessage = async () => {
        try {
            const messages = await chatModel.find()
            return messages
        } catch (error) {
            return { msg: 'Message could not be displayed' }
        }
    }

    deleteMessage = async (id) => {
        try {
            const deleteMj = await chatModel.findByIdAndDelete(id)
            return deleteMj
        } catch (error) {
            return { msg: 'Messages could not be displayed' }
        }
    }
}

module.exports = dbChatsManager;