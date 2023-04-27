
const BdChatsManager = require('../dao/mongoManager/dbChatsManager')
const Chats = new BdChatsManager()

const sendMessage = async(req, res)=>{
    const message = req.body
   
    const saveMessage = await Chats.sendMessage(message)
    if (!saveMessage){
      return res.json({
        msg: '',
     });      
    }else{
        emitMessage(saveMessage)     
        return res.json({
          msg: 'Message sent',
          playlist:saveMessage,
        })  
    }
}

const getsendMessage = async(req, res)=>{
    const getMessage = await Chats.getMessage()
  if (!getMessage){
      return res.json({
      msg: 'Message could not be displayed',
   });      
  }else{
    return res.json({
      msg: 'Chats',
      chats:getMessage
    });    
 }
}

const deleteMessage = async (req, res)=>{
  const id = req.params.chid
  const deleteMessaje = await Chats.deleteMessage(id)
  if (!deleteMessaje){
      return res.json({
      msg: 'Message could not be deleted',
   });      
  }else{
    emitDeleteMj(deleteMessaje)
    return res.json({
      msg: 'Message deleted',
      chats:deleteMessaje
    });      
 }
}

module.exports ={sendMessage, getsendMessage, deleteMessage}