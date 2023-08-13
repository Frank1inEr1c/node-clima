const axios = require('axios');

class Busquedas{
    historial = ['Zona sur','El Alto','Achacachi'];
    constructor(){

    }
    async ciudad(lugar=''){
        try {
            // Peticion HTTP
            //console.log('ciudad',lugar);
            
            const resp = await axios.get('https://reqres.in/api/users?page=2');
            console.log(resp.data);
            return[]; // retorna los lugares

        } catch(error){
            return [];
        }
    }
}

module.exports = Busquedas;