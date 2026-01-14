const fs = require('fs');
const axios = require('axios');



class Busquedas {

    historial = [];

    //aqui se guardan los datos del historial como una bd
    dbPath = './db/database.json';

    constructor() {
        this.leerDB();
    }


    get historialCapitalizado() {
        return this.historial.map( lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );
            return palabras.join(' ');
        });
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




    //usar api de openweather
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





    agregarHistorial( lugar = '' ) {

        if(this.historial.includes (lugar.toLocaleLowerCase())){
            return;
        }

        //limitar a 5 el historial
        this.historial = this.historial.splice(0,5);

        this.historial.unshift(lugar.toLocaleLowerCase());

        //grabar en DB
        this.guardarDB();


    }





    guardarDB(){

        const payload = {
            historial: this.historial
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }




    leerDB(){
        //verificar si existe
        if( !fs.existsSync(this.dbPath) ) return;

        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' } );
        const data = JSON.parse(info);
        this.historial = data.historial;

    }












}



module.exports = Busquedas;