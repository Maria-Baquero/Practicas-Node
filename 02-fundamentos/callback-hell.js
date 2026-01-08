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



const getEmpleado = (id, callback) => {
    const empleado = empleados.find( (e) => e.id === id);

    if ( empleado){
        callback(null, empleado.nombre);   //pondremos null para que no imprima "Error"  ya que err no puede estar vacio(linea 57)
                                        //Ponemos .nombre para que solo muestre el nombre del empleado o mostrará el id y el nombre.
    }else{
        callback(`Empleado con id ${id} no existe`);
    }
}




const getSalario = (id, callback) => {
    const salario = salarios.find ( (s) => s.id === id)?.salario;  // La ? pregunta si existe el salario buscado o no (igual que en php) (Mejor esta forma)

    if(salario){
        callback(null, salario);
    }else{
        callback(`El salario con id ${id} no se encuentra disponible`);
    }

}


//usamos la funcion
getEmpleado(1, (err, empleado) => {   //tenemos que añadir err o js no sabe si se manda el empleado o un error 

    if(err){
        console.log('Error');
        return console.log(err);
    }

    getSalario(1, (err, salario) => {   //metemos este callback dentro del otro para que funcione la variable "empleado" (linea 71)

    if(err){
        console.log('Error');
        return console.log(err);
    }

    console.log('El empleado:', empleado, 'tiene un salario de: ', salario);

    })
});




