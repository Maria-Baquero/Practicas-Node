const {crearArchivo} = require('./helpers/multiplicar');

//esta forma de utilizar argv con yargs esta obsoleta en esta version de node y yargs: 
//  const argv = require('yargs').argv;
//ahora se hace asi:
const yargs = require('yargs');
const argv = yargs(process.argv.slice(2)).argv;


//forma mas actual de obtener argumentos desde la linea de comandos con yargs

console.log(process.argv);
console.log(argv);
console.log('base: yargs', argv.base);


