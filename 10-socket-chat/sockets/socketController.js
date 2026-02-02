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


    //Enviar mensajes y usuarios conectados
    io.emit('active-users', chatMessages.usersArr );


    //recibir los ultimos 10 mensajes
    io.emit('receive-message', chatMessages.last10 );


    //conectar socket a sala privada
    socket.join( user.id ); //sala global, sala del usuario



    //Limpiar cuando alguien se desconecta
    socket.on('disconnect', () => { 
        chatMessages.disconnectUser( user.id );
        io.emit('active-users', chatMessages.usersArr );
    });

    

    //Escuchar mensaje personal (chat.js)
    socket.on('send-message', ({ uid, message }) => {

        if(uid){
            //mensaje privado
            socket.to(uid).emit('private-message', { from: user.name, message });

        }else{
            chatMessages.sendMessage( user.id, user.name, message );
            io.emit('receive-message', chatMessages.last10 );
        }


        chatMessages.sendMessage( user.id, user.name, message, uid );

        io.emit('receive-message', chatMessages.last10 );
        }
    );




    
}



module.exports = {socketController};