const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utilities/utilities');

const users = new Users();



io.on('connection', (client) => {

    // escuchar el evento enterChat
    client.on('enterChat', (data, callback) => {

        if(!data.name || !data.hall){
            return callback({
                error: true,
                msg: 'Name and hall are required'
            })
        }

        client.join(data.hall);


        let persons = users.addPerson(client.id, data.name, data.hall);

        client.broadcast.to(data.hall).emit('listPerson', users.getPersons() );

        callback(users.getPersonForHall( data.hall ) );

    });



    // escuchar el evento createMessage
    client.on('createMessage', (data) => {

        let person = users.getPerson( client.id );
        let message = createMessage( person.name, data.message );
        
        client.broadcast.to(person.hall).emit('createMessage', message );

        
    });




    // desconectar
    client.on('disconnect', () => {

        let personDeleted = users.deletePerson(client.id);


        client.broadcast.to(personDeleted.hall).emit('createMessage', createMessage('Admin', `${ personDeleted.name } has left the chat`)  );

        client.broadcast.to(personDeleted.hall).emit('listPerson', users.getPersonForHall( personDeleted.hall ));

    });



    // mensajes privados
    client.on('privateMessage', data => { 

        let person = users.getPerson( client.id);

        //for : es el id de la persona que recibe el mensaje
        client.broadcast.to(data.for).emit('privateMessage', createMessage( person.name, data.message ) );

    });

   

});