require('colors');


const inquirerMenu = async () => {

    console.clear();

    const { select } = await import('@inquirer/prompts');

    console.log('========================'.green);
    console.log('  Seleccione una opción  '.white);
    console.log('========================\n'.green);

    const opcion = await select({
        message: '¿Qué desea hacer?',
        choices: [
            { name: 'Opción 1', value: 'opt1' },
            { name: 'Opción 2', value: 'opt2' },
            { name: 'Opción 3', value: 'opt3' }
        ]
    });

    return opcion;

};



module.exports = {
    inquirerMenu
};