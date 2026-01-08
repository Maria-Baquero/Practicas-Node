//setTimeout( arg1, arg2);  --- arg2 es el tiempo de espera del callback en milisegundos

setTimeout( () => {
    console.log('Hola mundo');
}, 1000);




//--------------------------------
//esta forma es mas antigua
const getUsuarioByID = (id) => {
    const usuario = {
        id,
        nombre: 'Maria',

    }

    setTimeout( () => {
        console.log(usuario)
    },1500);

}


getUsuarioByID( 10 );



//--------------------------------
//esta forma es mas usada
const getUsuarioPorID = (id, callback) => {
    const usuario = {
        id,
        nombre: 'Maria',

    }

    setTimeout( () => {
        callback(usuario)
    },1500);

}


getUsuarioPorID( 10, ( usuario ) => {
    console.log(usuario.id);
    console.log(usuario.nombre.toUpperCase() );
} );


