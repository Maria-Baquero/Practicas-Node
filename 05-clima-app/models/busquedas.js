const axios = require('axios');



class Busquedas {

    historial = ['Madrid', 'New York', 'Paris'];

    constructor() {
        //leer bd si existe
    }


    //usar api de location iq
    async ciudad(lugar = '') {

        //peticion http

        try {
            const instance = axios.create({
                baseURL: `https://us1.locationiq.com/v1`,
                params: {
                    key: process.env.LOCATIONIQ_KEY,
                    format: 'json',
                    limit: 5,
                    'accept-language': 'es'
                }
            });

            const resp = await instance.get('/search', {
                params: { q: lugar }
            });

            return resp.data.map(lugar => ({
                id: lugar.place_id,
                nombre: lugar.display_name,
                lat: lugar.lat,
                lng: lugar.lon
            }));

        } catch (error) {
            return [];
        }
    }


}



module.exports = Busquedas;