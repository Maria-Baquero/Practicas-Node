require('colors');

const { inquirerMenu,
    pausa,
    leerInput, 
    listadoTareasBorrar, 
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
                const lugar = await leerInput('Ciudad: ');
                await busquedas.ciudad( lugar );






                //buscar las ciudades

                //seleccionar la ciudad

                //clima

                //mostrar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:', lugar);
                console.log('Latitud:', );
                console.log('Longitud:', );
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
