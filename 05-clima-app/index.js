require('dotenv').config();
require('colors');

const { inquirerMenu,
    pausa,
    leerInput, 
    listarLugares, 
    mostrarListadoCheckList,
    confirmar 
} = require('./helpers/inquirer');


const Busquedas = require('./models/busquedas');



const main = async() => {

    const busquedas = new Busquedas();
    let opt = '';

    do{
        opt = await inquirerMenu();

        switch (opt){
            case 1:
                //mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                const lugares =await busquedas.ciudad( termino );
                const id = await listarLugares( lugares );
                const lugarSel = lugares.find( l => l.id === id );
                console.log(lugarSel);




                //buscar las ciudades

                //seleccionar la ciudad

                //clima

                //mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Latitud:', lugarSel.lat);
                console.log('Longitud:', lugarSel.lng);
                console.log('Temperatura:', );
                console.log('Minima:', );
                console.log('Maxima:', );
                console.log('Como esta el clima:', );

            break;

            case 2:
                console.log('Historial');
            break;

            case 0:
                console.log('Saliendo');
            break;
        }

        await pausa();


    }while (opt !== 0);


};



main();
