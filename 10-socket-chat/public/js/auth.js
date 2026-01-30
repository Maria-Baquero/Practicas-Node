
const myForm = document.querySelector('form');



/*
const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/auth'
    : 'https://tu-dominio.com/api/auth';    ----  Este dominio deberia ser de heroku
*/
const url = 'http://localhost:8080/api/auth';




//login de formulario
myForm.addEventListener('submit', ev => {

    ev.preventDefault();
    const formData = {};



    //leemos los elementos del formulario
    for (let el of myForm.elements) {
        if (el.name.length > 0)
            formData[el.name] = el.value;
    }




    //url = 'http://localhost:8080/api/auth/login'    
    fetch(url + '/login', {   
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {'Content-Type': 'application/json'}
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.msg) {
            // Si el backend devuelve error
            return console.error(data.msg);
        }

        // Guardamos el token en localStorage
        localStorage.setItem('token', data.token);
        window.location = 'chat.html';
        
    })
    .catch(err => {
        console.log(err)
    })
    
});





//login con google
function handleCredentialResponse(response) {

    const body = { id_token: response.credential };

    //url = 'http://localhost:8080/api/auth/google'
    fetch(url + '/google', {    
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
        .then(resp => {
            // JWT de TU backend
            localStorage.setItem('token', resp.token);
            window.location = 'chat.html';
        })
        .catch(console.warn);
}





//logout de google
const button = document.getElementById('google_signout');

button.onclick = () => {

    google.accounts.id.disableAutoSelect(),

        localStorage.clear();
    location.reload();

}