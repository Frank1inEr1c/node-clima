const fs = require('fs');

const axios = require('axios');
require('dotenv').config();

class Busquedas {
    historial = [];
    dbPath = './db/database.json';
    constructor() {
        
    }

    get paramMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        };
    }

    get paramsWeather() {
        return {
            'access_token': process.env.OPENWEATHER_KEY,
            'limit': 5,
            'language': 'es'
        };
    }

    async ciudad(lugar = '') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramMapBox
            });

            const resp = await instance.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                longitud: lugar.center[0],
                latitud: lugar.center[1]                
            }));
        } catch (error) {
            throw new Error('No se pudo determinar la ciudad');
        }
    }
    
    async climaLugar(latitud, longitud){
        try {            
            const instance = axios.create({                
                //baseUrl: `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&appid=${apiKey}`,
                baseUrl: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather,latitud, longitud}
            })

            const resp = await instance.get();
            console.log("-------------->"+resp);
            return {
                descripcion: weather[0].description,
                temperaturaMinima: main.temp_min,
                temperaturaMaxima: main.temp_max,
                temperatura: main.temperatura        
            }
        } catch (error) {
            console.log(error);
        }
    }

    async agregarHistorial(lugar=''){
        //PREVENIR DUPLICADOS
        if(this.historial.includes(lugar.toLocaleLowerCase())) return;
        this.historial.unshift(lugar.toLocaleLowerCase());
        //GRABAR EN BD
        this.guardarBD();

    }
    
    guardarBD(){
        const payload = {
            historial:this.historial
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }
}

module.exports = Busquedas;
