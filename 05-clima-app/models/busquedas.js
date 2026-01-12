const axios = require('axios');



class Busquedas{

    historial = [ 'Madrid', 'New York', 'Paris' ];

    constructor(){
        //leer bd si existe
    }



    async ciudad( lugar = '' ){
        //peticion http

        const resp = await axios.get('https://dummyjson.com/users');
        console.log(resp.data);

        return [];
    }


}



module.exports = Busquedas;