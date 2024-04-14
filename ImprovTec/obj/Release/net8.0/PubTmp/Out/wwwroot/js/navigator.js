// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

let map;

// Función de inicialización del mapa
function initMap() {
    // Crea un nuevo mapa
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 }, // Centra el mapa en una ubicación inicial (se actualizará con la ubicación actual del usuario)
        zoom: 15 // Nivel de zoom inicial
    });

    // Obtiene la ubicación actual del usuario y traza la ruta a las coordenadas específicas
    obtenerUbicacion();
}

// Función para obtener la ubicación actual del usuario
function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Centra el mapa en la ubicación actual del usuario
            map.setCenter(pos);

            // Crea un marcador para la ubicación actual del usuario
            new google.maps.Marker({
                position: pos,
                map: map,
                title: 'Tu ubicación actual'
            });

            // Muestra el botón de inicio de viaje
            document.getElementById('startButton').style.display = 'block';
            // Manejador de clic en el botón de inicio de viaje
            document.getElementById('startButton').addEventListener('click', function () {
                trazarRuta(pos, { lat: 19.498605766126836, lng: -99.14186323313841 });
                // Poner la página en blanco después de 2 segundos
                setTimeout(function () {
                    document.body.innerHTML = '';
                    
                }, 2000);
            });
        }, function () {
            // Manejo de errores en caso de que la geolocalización falle
            handleLocationError(true, map.getCenter());
        });
    } else {
        // El navegador no soporta geolocalización
        handleLocationError(false, map.getCenter());
    }
}

// Función para trazar la ruta desde una ubicación inicial hasta una ubicación final
function trazarRuta(origen, destino) {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const request = {
        origin: origen,
        destination: destino,
        travelMode: google.maps.TravelMode.WALKING
    };

    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
        }
    });
}

// Función para manejar errores de geolocalización
function handleLocationError(browserHasGeolocation, pos) {
    const infoWindow = new google.maps.InfoWindow;
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: No se pudo obtener la ubicación del usuario' :
        'Error: Tu navegador no soporta geolocalización');
    infoWindow.open(map);
}
