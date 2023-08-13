# Aplicación de Clima

## Funcionalidades Principales:

Buscar una ciudad para ver el clima: Esta función permite al usuario ingresar el nombre de una ciudad. A continuación, se presenta una lista de ciudades que coinciden con la entrada del usuario, obtenida de una base de datos o API. El usuario puede seleccionar una de estas ciudades para obtener información sobre el clima en esa ubicación.

Ver historial de ciudades consultadas: El usuario puede ver un historial de las ciudades que ha consultado previamente. Este historial se almacena en un archivo historial.json.

Flujo Principal de la Aplicación:

Se muestra un menú con opciones al usuario.

Si el usuario elige buscar el clima de una ciudad:

Se le solicita ingresar el nombre de la ciudad.
Se buscan coincidencias con la entrada en una base de datos o API.
Se presenta al usuario una lista de ciudades coincidentes.
El usuario selecciona una ciudad de la lista.
Se muestra la información climática y general de la ciudad seleccionada.
La ciudad seleccionada se guarda en el historial.
Si el usuario elige ver el historial:

Se lee y se muestra una lista de ciudades previamente consultadas desde el archivo historial.json.
Funciones Auxiliares:

obtenerDatosClima(latitud, longitud): Función que, dada una latitud y una longitud, hace una solicitud a la API de OpenWeather para obtener y retornar la información climática de esa ubicación.

guardarHistorial(ciudad): Guarda la ciudad consultada en el archivo historial.json para mantener un registro de las búsquedas del usuario.

leerHistorial(): Lee y retorna el contenido del archivo historial.json.

Este es un resumen del funcionamiento y las características principales de la aplicación de clima node,js.





