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

                //buscar las ciudades
                const lugares =await busquedas.ciudad( termino );

                //seleccionar la ciudad
                const id = await listarLugares( lugares );
                const lugarSel = lugares.find( l => l.id === id );
                console.log(lugarSel);  //<-------- borrar


                //buscar clima de la ciudad elegida
                const clima = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng );
                
                console.log(clima); //<-------- borrar

                //mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Latitud:', lugarSel.lat);
                console.log('Longitud:', lugarSel.lng);
                console.log('Temperatura:', clima.temp); 
                console.log('Minima:', clima.min);
                console.log('Maxima:', clima.max);
                console.log('Como esta el clima:', clima.desc);

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
