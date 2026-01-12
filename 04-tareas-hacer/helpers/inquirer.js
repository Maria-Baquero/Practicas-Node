const inquirer = require('inquirer');

require('colors');


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            { name: 'Opción 1', value: '1' },
            { name: 'Opción 2', value: '2' },
            { name: 'Opción 3', value: '3' },
            { name: 'Opción 4', value: '4' },
            { name: 'Opción 5', value: '5' },
            { name: 'Opción 6', value: '6' }
        ]
    }
];


//usando inquirer para el menu y la pausa pulsando enter

const inquirerMenu = async () => {

    console.clear();
    console.log('========================'.green);
    console.log('  Seleccione una opción  '.white);
    console.log('========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    

    return opcion;

};



const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'Enter'.green} para continuar`
        }
    ]

    await inquirer.prompt(question);
};



const leerInput = async() => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: 'Descripción:',
            validate( value ) {
                if( value.length === 0 ){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];


    const {desc} = await inquirer.prompt(question);
    return desc;
};




module.exports = {
    inquirerMenu,
    pausa,
    leerInput
};