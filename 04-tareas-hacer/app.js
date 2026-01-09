require('colors');

//con inquirer esta linea ya no es necesaria:
//const { mostrarMenu, pausa } = require('./helpers/mensajes');

const { inquirerMenu } = require('./helpers/inquirer');


console.clear();



const main = async() => {


    let opt = '';

    //esto es para hacer el menu infinito,
    // cada vez que se termine de hacer una accion volvera a mostrarse el menu


    //esta forma se hace con el archivo mensajes.js
    /*
    do{
        opt = await mostrarMenu();
        console.log({ opt });
        
        if( opt !== '0') await pausa();

    }while (opt !== '0');
    */



    //esta forma se hace con el archivo inquirer.js
    do{
        opt = await inquirerMenu();
        console.log({ opt });
        
    }while (opt !== '0');



};



main();