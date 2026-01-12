//este archivo se usa con /models/tarea.js y tareas.js  , y /helpers/inquirer.js

require('colors');
const { pausa } = require('./helpers/inquirer');

const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');


const main = async () => {


    let opt = '';

    do {
        //creamos un objeto de la clase Tareas
        const tareas = new Tareas();

        //creamos una nueva tarea
        const tarea = new Tarea('Comprar comida');

        //guardamos la tarea en el listado de tareas para simular una base de datos en memoria
        tareas._listado[tarea.id] = tarea;

        console.log(tareas);
        console.log(tarea);

        await pausa();

    } while (opt !== '0');



};



main();
