//Este codigo es igual al de callback-hell pero con promesas


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

        //el if se puede poner mas sencillo: 
        /*
        if(empleado){
            resolve(empleado);
        }else{
            reject(`No existe empleado con id ${id}`);
        }
        */

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

/*
getEmpleado(id)
    .then( empleado => console.log(empleado) )
    .catch(err => console.log(err));

getSalario(id)
    .then(salario => console.log(salario))
    .catch(err => console.log(err));
*/


//Esta es una forma un poco mas complicada para encadenar promesas 
getEmpleado(id)
    .then(empleado =>{

        getSalario(id)
            .then(salario => {
                console.log('El empleado: ', empleado, 'tiene un salario de: ', salario);
            })
            .catch( err => console.log(err))
    })
    .catch(err => console.log(err))