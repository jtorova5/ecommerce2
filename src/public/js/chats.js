
const socket = io()

// const listChatsElement = document.getElementById('list-chats')
// listChatsElement.innerHTML ="" 

// socket.on('init-chats', ( chats ) => {
//      chats.forEach((chat) => {
//      listChatsElement.innerHTML += `<div id=${chat._id} style="display:flex; justify-content:${chat.userEmail == userEmail ? 'start' : 'end'}"><p style="background-color:#dcf8c6;width: fit-content;padding: 10px;border-radius: 5px;">${chat.userEmail}: ${chat.message}</p></div>`;
// 	 })
// })

// socket.on('add-message', (newMessage) => {
// 	listChatsElement.innerHTML += `<div id="${newMessage._id}" style="display:flex; justify-content:${newMessage.userEmail == userEmail ? 'start' : 'end'}"><p style="background-color:#dcf8c6;">${newMessage.userEmail}: ${newMessage.message}</p></div>`;
// })

// const chatBox = document.getElementById('chatBox');

// chatBox.addEventListener('keyup', (e) => {
//     if (e.key == 'Enter' && e.target.value != '') {
//         let message = e.target.value;
//         socket.emit('message', {
//             user,
//             message,
//         });
//         e.target.value = '';
//     }
// });

const listChatsElement = document.getElementById('list-chats')
listChatsElement.innerHTML = ""
socket.on('init-chats', (chats) => {
    chats.forEach((chat) => {
        listChatsElement.innerHTML += `<li id=${chat._id} >${chat.userEmail} - ${chat.message}</li>`
    })
})

socket.on('add-message', (newMessage) => {
    listChatsElement.innerHTML += `<li id="${newMessage._id}">${newMessage.userEmail} - ${newMessage.message}</li>`
})

socket.on('delete-message'), (message) => {
    //console.log (message)
    //const message = document.getElementById(`${message._id}`)
    // message.remove(); 
}