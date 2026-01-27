const path = require('path');
const fs = require('fs');




class Ticket {

    
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}




class TicketControl {


    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.last4 = [];

       this.init();

    }



    get toJson() {
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            last4: this.last4 
        }
    }



    init() {

        const {today, tickets, last, last4} = require('../db/data.json');
       
        if(today === this.today){
            this.tickets = tickets;
            this.last = last;
            this.last4 = last4;
        }else{
           
            this.saveDB();

        }
    }




    saveDB() {

        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));



    }



    siguiente(){
        this.last += 1;

        //crea el ticket
        const ticket = new Ticket(this.last, null);

        //inserta en el arreglo de tickets
        this.tickets.push(ticket);

        //guarda en bd
        this.saveDB();

        return 'Tickets ' + ticket.numero;
    }




    atenderTicket( escritorio ) {

        if(this.tickets.length === 0 ) {
            return null;
        }

        //busca el primer ticket del arreglo
        const ticket = this.tickets[0];

        //elimina el primer elemento del array y lo devuelve
        this.tickets.shift();

        ticket.escritorio = escritorio;

        //añade un elemento nuevo al arreglo pero al inicio de este
        this.last4.unshift( ticket ) ;


        if( this.last4.length > 4){
            this.last4.splice(-1, 1);

        }

        this.saveDB();

        return ticket;

    }




}



module.exports = TicketControl;