//uso de writeFileSync de fs para crear un archivo de texto con promesas

const fs = require('fs');
const colors = require('colors');

//Se puede hacer asi: 
/*
const crearArchivo = (base = 5) => {

    return new Promise((resolve, reject) => {

        let salida = '';

        for (let i = 1; i <= 10; i++) {
            salida += `${base} x ${i} = ${base * i}\n`;
        }

        console.log(salida);


        //Creamos un archivo de texto con la tabla de multiplicar
        fs.writeFileSync(`tabla-${base}.txt`, salida);

        resolve(`Tabla-${base}.txt`);
        
    });
}
*/


//O asi: 
//con poner async antes de la funcion, ya devuelve una promesa

const crearArchivo = async (base = 5, listar = false, hasta = 10) => {

    try {
        let salida = '';

        for (let i = 1; i <= hasta; i++) {
            salida += `${base} x ${i} = ${base * i}\n`;
        }

        console.log(salida.green); //usando colors para poner verde la salida   

        //salida es la carpeta donde se guardara el archivo creado con el nombre tabla-x.txt
        fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);

        return (`Tabla-${base}.txt`);
    } catch (err) {
        throw err;
    }

}



module.exports = {
    crearArchivo
};


//este archivo se importa en app.js