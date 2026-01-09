const yargs = require('yargs');
const argv = yargs(process.argv.slice(2))
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Es la base de la tabla de multiplicar'
    })
    .option('l', {
        alias: 'listar',
        type: 'boolean',
        demandOption: true,
        describe: 'Muestra la tabla en consola',
        default: false
    })
    .option('h', {
        alias: 'hasta',
        type: 'number', 
        demandOption: false,
        describe: 'Indica hasta que número se va a multiplicar',
        default: 20
    })
    .check((argv, options) => {
        if (isNaN(argv.b)) {
            throw 'La base tiene que ser un número';
        } 
        return true;
    })
    .argv;


module.exports = argv;
 
