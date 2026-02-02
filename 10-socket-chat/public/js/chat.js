

let user = null;
let socket = null;


const txtUid =  document.querySelector('#txtUid');
const txtMessagge =  document.querySelector('#txtMessage');
const ulUsers =  document.querySelector('#ulUsers');
const ulMessages =  document.querySelector('#ulMessages');
const btnOut =  document.querySelector('#btnOut');






const validateToken = async() => {

    const token = localStorage.getItem('token') || '';
    if ( token.length <= 10 ) {
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }


    const resp = await fetch('http://localhost:8080/api/auth/', {
        headers: { 'x-token': token }
    });


    const { user: userDB, token: tokenDB } = await resp.json();

    //console.log(userDB, tokenDB);
    
    localStorage.setItem('token', tokenDB);
    user = userDB;
    document.title = user.name;

    await connectSocket();


} 



const connectSocket = async() => {

    //conectar el socket
    socket = io({
        extraHeaders: {
            'x-token': localStorage.getItem('token')
        }
    });


    //socket conectado
    socket.on('connect', () => {
        console.log('Sockets online');
    }
    );


    //socket desconectado
    socket.on('disconnect', () => {
        console.log('Sockets offline');
    });


    //escuchar mensajes
    socket.on('receive-message', printMessages);


    //escuchar usuarios activos
    socket.on('active-users', printUsers);


    //escuchar mensaje privado
    socket.on('private-message', (payload) => {
        console.log('Private message: ', payload);
    });



}


//mostrar usuarios en pantalla
const printUsers = ( users = [] ) => {

    let usersHtml = '';

    users.forEach( ({ name, uid }) => {

        usersHtml += `
            <li>
                <p> 
                    <h5 class="text-success">${ name }</h5>
                    <span class="fs-6 text-muted">${ uid }</span>
                </p>
            </li>
        `;
    });

    
    ulUsers.innerHTML = usersHtml;
}




//guardar mensaje al pulsar enter
txtMessagge.addEventListener('keyup', ({ keyCode }) => {


    const message = txtMessagge.value;

    const uid = txtUid.value;

    if( keyCode !== 13 ) { return; }


    if( message.length === 0 ) { return; }

    //console.log( {message,uid} );

    socket.emit( 'send-message',  { message, uid } );

   

});




//mostrar mensajes en pantalla
const printMessages = ( messages = [] ) => {

    let messagesHtml = '';

    messages.forEach( ({ name, message }) => {
        messagesHtml += `
            <li>
                <p> 
                    <h5 class="text-primary">${ name }</h5>
                    <span>${ message }</span>
                </p>
            </li>
        `;
    });

    
    ulMessages.innerHTML = messagesHtml;
}













const main = async () => {

    await validateToken();
}




main();

//const socket = io();