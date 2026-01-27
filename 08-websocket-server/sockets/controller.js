


const socketController = (socket) => {


    console.log('Cliente conectado', socket.id);


    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    })


    //aqui escuchamos cuando el cliente emite el mensaje
    socket.on('enviar-mensaje', (payload, callback) => {

        //aqui cuando el servidor de socket lo envia
        //mandar mensaje a todos los clientes conectados

        const id = 123456789;
        callback(id);

        //this.io.emit('enviar-mensaje', payload);

        //this.io se sustituye por socket, asi solo enviara el mensaje al usuario de este socket,sino da error
        //socket.emit('enviar-mensaje', payload);

        //broadcast hace que la confirmacion del servidor se mande al cliente que envia el mensaje, pero los datos(mensaje, id, etc) lo reciben todos los demas usuarios
        socket.broadcast.emit('enviar-mensaje', payload);

    })

}





module.exports = {
    socketController
}