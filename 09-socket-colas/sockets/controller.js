const TicketControl = require('../models/ticket-control');




const ticketControl = new TicketControl();



const socketController = (socket) => {
    

    //cuando un cliente se conecta: 
    socket.emit('ultimo-ticket', ticketControl.last);
    socket.emit('estado-actual', ticketControl.last4);
    socket.emit('tickets-pendientes', ticketControl.tickets.length);



    //siguiente ticket
    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();

        callback(siguiente);

        //mostrar tickets pendientes
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);
        

    });




    //atender tickets
    socket.on('atender-ticket', ({escritorio}, callback) => {

        if(!escritorio){
            return callback({
                ok:false,
                msg: 'El escritorio es obligatorio'
            });
        }


        const ticket = ticketControl.atenderTicket( escritorio );



        //notificar cambio en los ultimos 4
        socket.broadcast.emit('estado-actual', ticketControl.last4);

        //mostrar tickets pendientes
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length);



        if(!ticket){
            callback({
                ok:false,
                msg: 'No hay tickets'
            });
        }else{
            callback({
                ok:true,
                ticket
            })
        }



    })


}



module.exports = {
    socketController
}

