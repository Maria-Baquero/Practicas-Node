//usamos los archivos de /models y /helpers
require('colors');

const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');




//ahora mismo los datos se pierden al cerrar la app, en siguientes pasos se guardaran 

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    do{
        opt = await inquirerMenu();

        switch (opt){
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea( desc );
            break;

            case '2':
                console.log( tareas._listado );
            break;
        }

       

        await pausa();
        
    }while (opt !== '0');



};



main();