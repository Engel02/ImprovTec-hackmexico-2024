// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


//sacado de script.js

function redirectToGuides() {
    window.location.href = '@Url.Action("HomeController", "home")';
}

function redirectToTourists() {
    window.location.href = "";
}

document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

});





function showReview(id) {
    // Oculta todas las reseñas
    var reviews = document.querySelectorAll('.review');
    reviews.forEach(function (review) {
        review.style.display = 'none';
    });

    // Muestra la reseña correspondiente al ID recibido
    var review = document.getElementById('review' + id);
    if (review) {
        review.style.display = 'block';
    }
}

function playAudio(id) {
    var audio = document.getElementById('audio' + id);
    if (audio) {
        audio.play();
    }
}
