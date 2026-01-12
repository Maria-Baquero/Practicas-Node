const fs = require('fs');

const archivo = './db/data.json';


//esta funcion guardara las tareas en un archivo json
const guardarDB = (data) => {

    

    fs.writeFileSync(archivo, JSON.stringify(data));
}


const leerDB = () => {
    
    if (!fs.existsSync(archivo)) {
        return null;
    }

    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const data = JSON.parse(info);


    console.log(data);
    return data;
};


const info = fs.readFileSync(archivo, { encoding: 'utf-8' });


module.exports = {
    guardarDB,
    leerDB
}