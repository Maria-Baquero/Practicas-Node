var socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('name') || !params.has('hall')){
    window.location = 'index.html';
    throw new Error('Name and hall are required');
}



var user = { 
    name: params.get('name'),
    hall: params.get('hall')
};



// conectar
socket.on('connect', function() {
    console.log('Conectado al servidor');

    // ingresar al chat
    socket.emit('enterChat', user, function(resp){
        console.log('users connected', resp);
    });
});




// desconectar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});



//crear mensaje - envia informacion
socket.emit('createMessage', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});


//crear mensaje - escucha información
socket.on('createMessage', function(message) {

    console.log('Server:', message);

});



//escuchar cambios en la lista de personas
socket.on('listPerson', function(persons) {

    console.log('List of persons: ', persons);

});




//mensajes privados
socket.on('privateMessage', function(message) {
    
    console.log('Private message: ', message);
});