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
                const lugares = await busquedas.ciudad( termino );

                //seleccionar la ciudad
                const id = await listarLugares( lugares );
                if (id === '0') continue;

                //conseguir info de la ciudad
                const lugarSel = lugares.find( l => l.id === id );

                //guardar en BD
                busquedas.agregarHistorial(lugarSel.nombre);
                

                //buscar clima de la ciudad elegida
                const clima = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng );
                
                

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
                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${ i + 1}.`.green;
                    console.log( `${ idx } ${ lugar }` );
                });
            break;

            case 0:
                console.log('Saliendo');
            break;
        }

        await pausa();


    }while (opt !== 0);


};



main();
