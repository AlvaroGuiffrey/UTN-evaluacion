/* Funciones que se utilizan para el loguin del usuario en el sitio de compras.
  Contiene funciones que modifican el DOM y la que valida los datos del usuario,
  es cargado en la página "loginCarro.html".
  Autor: Alvaro Guiffrey
  Curso: Desarrollo Web con Javascript - Trabajo Final Integrador
  Fecha: 20/02/2020
*/

// Tareas que se hacen, con funciones, luego que se carga la página
window.onload = function() {
  modificaHeader(); // app.js
  modificaFooter(); // app.js
  mostrarMensaje("loginCarro"); // app.js
  modificarBotones();
  modificarUsuarioActivo(); // app.js
  modificarForm();
}

// Funciones
function modificarBotones() {
    // Titulos de los botones y links
    document.getElementById("salir").title = "Sale del Carro de Compras";
    document.getElementById("borrar").title = "Borra los datos del formulario";
    document.getElementById("loguear").title = "Confirma los datos del usuario";
    document.getElementById("usuarioNuevo").title = "Carga datos de un nuevo usuario";
    // href de los link
    document.getElementById("usuarioNuevo").href = "usuarioNuevo.html";
    // Funciones en botones
    document.getElementById('salir').onclick = function() { salirCarro() }
}

function modificarForm() {
    // Eventos del Formulario
    document.getElementById("loginForm").onsubmit = function() {
      return valida(this)
    }
    // Input del formulario
    var usuario = document.getElementById("usuario");
    usuario.title = "Ingrese letras y/o números. Mínimo: 6 y máximo: 12.";
    usuario.placeholder = " Su usuario";
    usuario.focus();
    usuario.required = "required";
    usuario.pattern = "[A-Za-z0-9]{6,12}";
    var contrasenia = document.getElementById("contrasenia");
    contrasenia.title = "Ingrese letras, números y/o simbolos -_*#. Mínimo: 6 y máximo: 12.";
    contrasenia.placeholder=" Su contraseña";
    contrasenia.required = "required";
    contrasenia.pattern = "[A-Za-z0-9_*#-]{6,12}";
}

function valida(f) {
  // Obtiene los usuarios guardados en LocalStorage
  var usuarios = JSON.parse(localStorage.getItem("usuarios"));
  // Verifica si existe el usuario ingresado
  if (usuarios[f.usuario.value]) {
    // Verifica si la contraseña ingresa es igual a la del usuario
    if (usuarios[f.usuario.value] == f.contrasenia.value) {
      // Cambia el valor del usuario activo en LocalStorage
      localStorage["activo"] = f.usuario.value;
      modificarUsuarioActivo()
      // Envía el formulario
      return true;
    } else {
      // Contraseña ingresada diferente a la del usuario
      // Muestra mensaje de alerta
      mensaje.className = "mensajeAlerta";
      mensaje.innerHTML = "<b>Contraseña Incorrecta.</b><br>"
                          +"<p>Vuelve a ingresar tu contraseña.</p>";
      // Vacía el valor y pone el foco en el elemento
      f.contrasenia.focus();
      f.contrasenia.value = "";
      // No envía el formulario
      return false;
    }
  // No existe el usuario ingresado en LocalStorage
  } else {
    // Alerta utilizando librería sweetalert
    swal({
      title: "¡Usuario Inexistente!",
      text: "Vuelve a ingresar tu usuario.",
      icon: "info",
      button: "Ok"
    });
    // Muestra mensaje de alerta
    mensaje.className = "mensajeAlerta";
    mensaje.innerHTML = "<b>Usuario inexistente.</b><br><p>Vuelve a ingresar tu usuario. "
                        +"¿Es tu primer visita? ingresá en <i>'Usuario Nuevo'</i>.</p>";
    // Vacía los valores y pone el foco en el elemento
    f.usuario.value = "";
    f.usuario.focus();
    f.contrasenia.value = "";
    // No envía el formulario
    return false;
  }
}
