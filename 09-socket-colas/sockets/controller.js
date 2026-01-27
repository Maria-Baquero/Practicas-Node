const TicketControl = require('../models/ticket-control');




const ticketControl = new TicketControl();



const socketController = (socket) => {
    

    //ultimo ticket
    socket.emit('ultimo-ticket', ticketControl.last);



    //siguiente ticket
    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();

        callback(siguiente);

        //notificar que hay nuevo ticket pendiente de asignar

    });


    socket.on('atender-ticket', ({escritorio}, callback) => {

        if(!escritorio){
            return callback({
                ok:false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket( escritorio );


        //notificar cambio en los ultimos 4


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

