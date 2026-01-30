const { Socket } = require("socket.io");
const { checkJWT } = require("../helpers");
const { ChatMessages } = require("../models");

const chatMessages = new ChatMessages();







const socketController = async (socket = new Socket(), io ) => {
    
    
    const user = await checkJWT( socket.handshake.headers['x-token']);

    if ( !user ) {  
        
        return socket.disconnect();
    }

    //console.log('Socket connected', user.name);
    
    //Agregar usuario conectado
    chatMessages.connectUser( user );

    io.emit('active-users', chatMessages.usersArr );



    //Limpiar cuando alguien se desconecta
    socket.on('disconnect', () => { 
        chatMessages.disconnectUser( user.id );
        io.emit('active-users', chatMessages.usersArr );
    });

    




}



module.exports = {socketController};