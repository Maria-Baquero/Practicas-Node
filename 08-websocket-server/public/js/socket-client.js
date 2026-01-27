const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');


//socket del cliente
const socket = io();





socket.on('connect', () => {

    console.log('conectado')

    lblOnline.style.display = "";
    lblOffline.style.display = "none";

});



socket.on('disconnect', () => {

    console.log('desconectado');
});



//cuando se reciba "enviar-mensaje", haremos el callback
socket.on('enviar-mensaje', (payload) => {

    console.log(payload);
});






btnEnviar.addEventListener('click', () => {

    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }


    //socket.emit('enviar-mensaje',payload);

    socket.emit('enviar-mensaje',payload, (id) => {  //este callback(id) hay que mandarlo desde server.js para que el cliente lo vea
        console.log('Desde el server', id);
    });
});