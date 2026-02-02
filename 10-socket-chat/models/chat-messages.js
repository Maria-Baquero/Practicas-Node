

class Message {
    constructor( uid, name, message ) {
        this.uid = uid;
        this.name = name;
        this.message = message;
    }
}

class ChatMessages {

    constructor() {
        this.messages = [];
        this.users = {};
    }


    //ultimo 10 mensajes
    get last10() {
        this.messages = this.messages.splice(0,10);
        return this.messages;
    }

    //usuarios conectados
    get usersArr() {
        return Object.values( this.users );
    }

    //agregar mensaje
    sendMessage( uid, name, message ) {
        this.messages.unshift( new Message( uid, name, message ));
    }

    //conectar usuario
    connectUser( user ) {
        this.users[ user.id ] = user;
    }

    //desconectar usuario
    disconnectUser( id ) {
        delete this.users[ id ];
    }

}



module.exports = {ChatMessages};