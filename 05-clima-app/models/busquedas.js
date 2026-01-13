const axios = require('axios');



class Busquedas {

    historial = ['Madrid', 'New York', 'Paris'];

    constructor() {
        //leer bd si existe
    }


    //parametros de instancias axios  -get
    //locationIQ
    get paramsLocationIQ() {
        return {
            key: process.env.LOCATIONIQ_KEY,
            format: 'json',
            limit: 5,
            'accept-language': 'es'
        }
    }


    //openWeather
    get paramsOpenWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            lang: 'es',
            units: 'metric'
        }
    }




    //usar api de location iq
    async ciudad(lugar = '') {

        //peticion http

        try {
            //instancia axios.create()
            const instance = axios.create({
                baseURL: `https://us1.locationiq.com/v1`,
                params: this.paramsLocationIQ
            });

            //resp.data
            const resp = await instance.get('/search', {
                params: { q: lugar }
            });

            //return { id, nombre, latitud, longitud }
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





    async climaLugar(lat, lon) {

        try {

            //instancia axios.create()
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
                params: { ...this.paramsOpenWeather, lat, lon }
            });


            //resp.data
            const resp = await instance.get();

            const { weather, main } = resp.data;
            const desc = weather[0].description;
            const { temp, temp_min: min, temp_max: max } = main;

            //return { desc, min, max, temp }
            return {
                desc: desc,
                min: min,
                max: max,
                temp: temp
            };



        } catch (error) {
            console.log(error);
        }
    }
}



module.exports = Busquedas;