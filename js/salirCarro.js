/* Funciones que se utilizan para la salida del sitio de compras.
  Es cargado en la página "salirCarro.html".
  Autor: Alvaro Guiffrey
  Curso: Desarrollo Web con Javascript - Trabajo Final Integrador
  Fecha: 20/02/2020
*/

window.onload = function() {
  modificaHeader(); // app.js
  modificaFooter(); // app.js
  alertaSalir();
  mostrarMensaje("salirCarro"); // app.js
}

// Funciones
function alertaSalir() {
  // Alerta utilizando librería sweetalert
  swal({
    title: "¡Datos eliminados!",
    text: "Se eliminaron todos los datos utilizados del LocalStorage del navegador.",
    icon: "success",
    button: "Ok"
  });
}
