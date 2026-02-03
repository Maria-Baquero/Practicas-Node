const { io } = require('../server');
const { Usuarios } = require('../classes/users');
const { crearMensaje } = require('../utilities/utilities');

const usuarios = new Usuarios();



io.on('connection', (client) => {

    // escuchar el evento enterChat
    client.on('entrarChat', (data, callback) => {

        if(!data.nombre || !data.sala){
            return callback({
                error: true,
                msg: 'name and sala are required'
            })
        }

        client.join(data.sala);


        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonas() );
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${ data.nombre } joined the room`));
        callback(usuarios.getPersonasPorSala( data.sala ) );

    });



    // escuchar el evento createMessage
    client.on('crearMensaje', (data, callback) => {

        let persona = usuarios.getPersona( client.id );
        let mensaje = crearMensaje( persona.nombre, data.mensaje );
        
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje );
        callback(mensaje);
    });




    // desconectar
    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona(client.id);


        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${ personaBorrada.nombre } has left the chat`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala( personaBorrada.sala ));

    });



    // mensajes privados
    client.on('mensajePrivado', data => { 

        let persona = usuarios.getPersona( client.id);

        //para: es el id de la persona que recibe el mensaje
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje( persona.nombre, data.mensaje ) );

    });

   

});