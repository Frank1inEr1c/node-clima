// Importaciones necesarias
const fs = require('fs');
const { leerInput, inquirerMenu, pausa, listadoLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busqueda');
const axios = require('axios');
require('dotenv').config();

// Ruta al archivo donde se guarda el historial de consultas.
const HISTORIAL_PATH = './db/historial.json';

const main = async () => {
    let opt;
    const busquedas = new Busquedas();

    do {
        // Mostrar el menú principal y obtener la opción seleccionada
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const lugar = await leerInput('Datos del Clima en Ciudad: ');
                const lugares = await busquedas.ciudad(lugar);
                const id = await listadoLugares(lugares);
                if (id === '0') continue;

                const lugarSel = lugares.find(l => l.id === id);

                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.latitud);
                console.log('Lng:', lugarSel.longitud);

                try {
                    const datosClima = await obtenerDatosClima(lugarSel.latitud, lugarSel.longitud);
                    console.log('Temperatura:', datosClima.temperatura);
                    console.log('Mínima:', datosClima.temperaturaMinima);
                    console.log('Máxima:', datosClima.temperaturaMaxima);
                    console.log('El clima actual es:', datosClima.descripcion.bgGreen);

                    const fechaActual = new Date().toLocaleDateString();
                    guardarHistorial(lugarSel.nombre, `${datosClima.temperatura}°C`, fechaActual);
                } catch (error) {
                    console.log('Error al obtener datos climáticos');
                }
                break;

            case 2:
                const historial = leerHistorial();
                console.log(' '.repeat(132).bgGreen);
                console.log('  NO.'.padEnd(6).yellow + '     LUGAR'.padEnd(90).rainbow + 'TEMPERATURA'.padEnd(15).rainbow + 'FECHA'.padEnd(15).rainbow);
                console.log(' '.repeat(132).bgGreen);
                historial.forEach((entrada, i) => {
                    const idx = `${i + 1}.`.padEnd(5);
                    console.log('  '.bgGreen + idx.bgGreen + entrada.ciudad.padEnd(90) + entrada.temperatura.padEnd(15).yellow + entrada.fecha.padEnd(15) +' '.padEnd(5).bgGreen);
                }
                );
                console.log(' '.repeat(132).bgGreen);
                break;
        }

        if (opt !== 0) await pausa();

    } while (opt !== 0);
};

const obtenerDatosClima = async (latitud, longitud) => {
    const apiKey = process.env.OPENWEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&units=metric&lang=es&appid=${apiKey}`;

    const resp = await axios.get(url);
    return {
        temperatura: resp.data.main.temp,
        temperaturaMinima: resp.data.main.temp_min,
        temperaturaMaxima: resp.data.main.temp_max,
        descripcion: resp.data.weather[0].description
    };
};


const guardarHistorial = (ciudad, temperatura, fecha) => {
    let historial = [];
    if (fs.existsSync(HISTORIAL_PATH)) {
        historial = JSON.parse(fs.readFileSync(HISTORIAL_PATH, 'utf-8'));
    }

    const existe = historial.find(l => l.ciudad === ciudad);
    if (!existe) {
        historial.push({ ciudad, temperatura, fecha });
        fs.writeFileSync(HISTORIAL_PATH, JSON.stringify(historial));
    }
};

const leerHistorial = () => {
    if (fs.existsSync(HISTORIAL_PATH)) {
        return JSON.parse(fs.readFileSync(HISTORIAL_PATH, 'utf-8'));
    }
    return [];
};

// Ejecutar la función principal
main();
