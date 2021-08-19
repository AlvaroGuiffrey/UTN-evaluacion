/* Funciones que se utilizan para ingresar un nuevo usuario en el sitio de compras.
  Contiene funciones que modifican el DOM y la que valida los datos del usuario
  (tres valores), es cargado en la página "usuarioNuevo.html".
  Autor: Alvaro Guiffrey
  Curso: Desarrollo Web con Javascript - Trabajo Final Integrador
  Fecha: 20/02/2020
*/

// Tareas que se hacen, con funciones, luego que se carga la página
window.onload = function() {
  modificaHeader(); // app.js
  modificaFooter(); // app.js
  mostrarMensaje("usuarioNuevo"); // app.js
  modificarBotones();
  modificarUsuarioActivo();
  modificarForm();
}

// Funciones
function modificarBotones() {
    // Titulos de los botones y links
    document.getElementById("salir").title = "Sale del Carro de Compras";
    document.getElementById("volver").title = "Vuelve al login de usuario";
    document.getElementById("borrar").title = "Borra los datos del formulario";
    document.getElementById("agregar").title = "Agrega los datos del usuario";
    // Agrega funciones a los botones
    document.getElementById("salir").onclick = function() { salirCarro() };
    document.getElementById("volver").onclick = function() { vuelve("loginCarro.html") };
}

function modificarForm() {
    // Eventos del Formulario
    document.getElementById("loginForm").onsubmit = function() {
      return valida(this)
    }
    // Input del formulario
    var usuario = document.getElementById("usuario");
    usuario.title = "Ingrese letras y/o números. Mínimo: 6 y máximo: 12.";
    usuario.placeholder = " Su nuevo usuario";
    usuario.focus();
    usuario.required = "required";
    usuario.pattern = "[A-Za-z0-9]{6,12}";
    var contrasenia = document.getElementById("contrasenia");
    contrasenia.title = "Ingrese letras, números y/o simbolos -_*#. Mínimo: 6 y máximo: 12.";
    contrasenia.placeholder=" Su nueva contraseña";
    contrasenia.required = "required";
    contrasenia.pattern = "[A-Za-z0-9_*#-]{6,12}";
    var contrasenia1 = document.getElementById("contrasenia1");
    contrasenia1.title = "Ingrese letras, números y/o simbolos -_*#. Mínimo: 6 y máximo: 12.";
    contrasenia1.placeholder=" Repite la contraseña";
    contrasenia1.required = "required";
    contrasenia1.pattern = "[A-Za-z0-9_*#-]{6,12}";
    // Comentario del formulario
    var comentario = document.getElementById("comentario");
    comentario.style.fontSize = "10px";
    comentario.style.color = "blue";
    comentario.innerHTML = "(*) Repite la nueva contraseña ingresada."
}

function valida(f) {
  // Obtiene los usuarios guardados en LocalStorage
  var usuarios = JSON.parse(localStorage.getItem("usuarios"));
  // Verifica si no existe el usuario ingresado
  if (!usuarios[f.usuario.value]) {
    // Verifica si la contraseña ingresa es igual a la repetida
    if (f.contrasenia.value == f.contrasenia1.value) {
      // Agrega el usuario en LocalStorage
      usuarios[f.usuario.value] = f.contrasenia.value;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      // Envía el formulario
      return true;
    } else {
      // Contraseñas ingresadas son diferente
      // Muestra mensaje de alerta
      mensaje.className = "mensajeAlerta";
      mensaje.innerHTML = "<b>Contraseñas diferentes.</b><br>"
                          +"<p>Vuelve a ingresar tus contraseñas.</p>";
      // Vacía el valor y pone el foco en el elemento
      f.contrasenia.focus();
      f.contrasenia.value = "";
      f.contrasenia1.value = "";
      // No envía el formulario
      return false;
    }
  // Existe el usuario ingresado en LocalStorage
  } else {
    // Alerta utilizando librería sweetalert
    swal({
      title: "¡Usuario ya existe!",
      text: "Debes ingresar otro usuario diferente.",
      icon: "info",
      button: "Ok"
    });
    // Muestra mensaje de alerta
    mensaje.className = "mensajeAlerta";
    mensaje.innerHTML = "<b>¡Usuario ya existe!.</b><br>"
                        +"<p>Debes ingresar otro usuario diferente. El 'usuario' ingresado ya existe.</p>";
    // Vacía los valores y pone el foco en el elemento
    f.usuario.value = "";
    f.usuario.focus();
    f.contrasenia.value = "";
    f.contrasenia1.value = "";
    // No envía el formulario
    return false;
  }
}
