

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

    socket = io({
        extraHeaders: {
            'x-token': localStorage.getItem('token')
        }
    });



    socket.on('connect', () => {
        console.log('Sockets online');
    }
    );

    
    socket.on('disconnect', () => {
        console.log('Sockets offline');
    });


    socket.on('receive-message', () => {

    });


    socket.on('active-users', printUsers);



    socket.on('private-message', () => {

    });



}


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






const main = async () => {

    await validateToken();
}




main();

//const socket = io();