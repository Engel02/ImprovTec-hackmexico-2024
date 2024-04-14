// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var map;
var service;

// Función de inicialización del mapa
function initMap() {
    // Crea un nuevo mapa
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 }, // Centra el mapa en una ubicación inicial (se actualizará con la ubicación actual del usuario)
        zoom: 11 // Nivel de zoom inicial
    });

    // Crea un objeto de servicio de lugares de Google Maps
    service = new google.maps.places.PlacesService(map);

    // Obtiene la ubicación actual del usuario
    obtenerUbicacion();
}

// Función para obtener la ubicación actual del usuario
function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Centra el mapa en la ubicación actual del usuario
            map.setCenter(pos);

            // Marca la ubicación actual del usuario en el mapa con un punto azul
            marcarUbicacionActual(pos)

            // Busca monumentos históricos con 4 estrellas cerca de la ubicación actual del usuario
            buscarMonumentosHistoricos(pos);
        }, function () {
            // Manejo de errores en caso de que la geolocalización falle
            handleLocationError(true, map.getCenter());
        });
    } else {
        // El navegador no soporta geolocalización
        handleLocationError(false, map.getCenter());
    }
}

function marcarUbicacionActual(pos) {
    var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: 'Tu ubicación',
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' // Icono azul para el marcador
    });
}

// Función para buscar monumentos históricos con 4 estrellas cerca de una ubicación
function buscarMonumentosHistoricos(location) {
    // Define la consulta de búsqueda utilizando la sintaxis de la API de Places
    var request = {
        location: location,
        radius: '5000', // Radio de búsqueda en metros (5 km)
        query: 'monumentos históricos', // Consulta de búsqueda: monumentos históricos
        minRating: 4 // Calificación mínima: 4 estrellas
    };

    // Envía la solicitud de búsqueda
    service.textSearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Itera sobre los resultados y crea marcadores para cada lugar encontrado
            for (var i = 0; i < results.length; i++) {
                crearMarcador(results[i]);
            }
        }
    });
}

// Función para crear un marcador en el mapa para un lugar dado
function crearMarcador(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name
    });
}

// Función para manejar errores de geolocalización
function handleLocationError(browserHasGeolocation, pos) {
    var infoWindow = new google.maps.InfoWindow;
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: No se pudo obtener la ubicación del usuario' :
        'Error: Tu navegador no soporta geolocalización');
    infoWindow.open(map);
}
