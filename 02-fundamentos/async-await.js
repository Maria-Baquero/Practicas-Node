
const empleados = [
    {
        id: 1,
        nombre: 'Maria'
    },
    {
        id: 2,
        nombre: 'Juan'
    },
    {
        id: 3,
        nombre: 'Pedro'
    }
];


const salarios = [
    {
        id: 1,
        salario: 1500
    },
    {
        id: 2,
        salario: 1000
    }
    
];




const getEmpleado = (id) => {

    return new Promise( (resolve, reject) => {

        const empleado = empleados.find( (e) => e.id === id)?.nombre;

        (empleado)
            ? resolve(empleado)
            : reject(`No existe el empleado con id ${id}`);
    })
    
}



const getSalario = (id) => {

    return new Promise( (resolve, reject) => {
        const salario = salarios.find ( (s) => s.id === id)?.salario;
    
    (salario)
        ? resolve(salario)
        : reject(`No existe salario disponible para el id:  ${id}`);
    
    })
}



const id = 1;


getEmpleado(id)
    .then( empleado => {
        nombre = empleado;
        return getSalario(id);
    })
    .then ( salario => console.log(`El empleado: ${nombre} tiene un salario de: ${salario}`))
    .catch( err => console.log(err) );



//Await debe estar dentro de una funcion asincrona
//async transforma una funcion para retornar una promesa
const getInfoUsuario = async (id) => {

    try{
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id);
        return console.log(`El empleado: ${empleado} tiene un salario de: ${salario}`);
    } catch (error) {
        throw error;
    }
}




getInfoUsuario(id)
    .then( msg => {
        console.log('Todo bien');
        console.log(msg);
    })
    .catch( err => {
        console.log('Todo mal');
        console.log(err);
    });