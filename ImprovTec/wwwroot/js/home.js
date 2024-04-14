const menuSection = document.querySelector('.menu');
// URL de la API
const apiUrl = "../json/pruebaPlaces.json";

// Función para cargar el menú desde la API
function cargarMenuDesdeAPI() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json();
        })
        .then(data => {
            // Llamamos a la función para procesar los datos y generar los elementos del menú
            generarMenu(data);
        })
        .catch(error => {
            console.error('Error al cargar el menú desde la API:', error);
        });
}

// Función para generar los elementos del menú a partir de los datos recibidos de la API
function generarMenu(menuData) {
    menuData.forEach(menuItem => {
        const divMenuPart = document.createElement('div');
        divMenuPart.classList.add('menu-part');

        const img = document.createElement('img');
        img.src = menuItem.imagenUrl;
        img.alt = 'bild';
        img.width = 150;
        img.height = 150;

        const pMenuItem = document.createElement('p');
        pMenuItem.classList.add('menu-item');
        pMenuItem.textContent = menuItem.nombre;

        const pDescription = document.createElement('p');
        pDescription.classList.add('description');
        pDescription.textContent = menuItem.descripcion;

        const buttonLlevame = document.createElement('button'); // Crear un botón "Llevame"
        buttonLlevame.classList.add('bttn-llevame');
        buttonLlevame.textContent = 'Llevame';

        buttonLlevame.addEventListener('click', function () {
            // Abrir una nueva ventana con la descripción
            window.location.href = "/Home/Historia";
        });

        divMenuPart.appendChild(img);
        console.log(img + "hola")
        divMenuPart.appendChild(pMenuItem);
        divMenuPart.appendChild(pDescription);
        divMenuPart.appendChild(buttonLlevame); // Agregar el botón "Llevame" al div
        menuSection.appendChild(divMenuPart);

    });
}

// Llamamos a la función para cargar el menú desde la API
cargarMenuDesdeAPI();
