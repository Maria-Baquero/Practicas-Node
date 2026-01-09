const {crearArchivo} = require('./helpers/multiplicar');
const  colors = require('colors');
const argv = require('./config/yargs');

//seguimos con yargs pero ahora con opciones mas avanzadas (config/yargs.js)


console.log(process.argv);

console.log(argv);

crearArchivo(argv.b, argv.l, argv.h)
    .then(nombreArchivo => console.log(nombreArchivo.rainbow, 'creado'))
    .catch(err => console.log(err));