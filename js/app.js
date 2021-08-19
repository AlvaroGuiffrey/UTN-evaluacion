/* Funciones que se utilizan en más de una oportunidad en el sitio de compras.
  Para facilitar el mantenimiento y reutilizar código se escribieron en éste
  archivo las funciones llamadas desde diferentes páginas.
  Autor: Alvaro Guiffrey
  Curso: Desarrollo Web con Javascript - Trabajo Final Integrador
  Fecha: 20/02/2020
*/

// Carga datos del localStorage que se utilizan en funciones
var activo = localStorage["activo"];

/* ------------------------------------------------------
  Modificaciones a elementos del DOM
  ------------------------------------------------------  */
// Al header
function modificaHeader() {
  document.getElementById("imgLogo").src = "image/eLearning-fondo-transparente.png";
  document.getElementById('titulo').innerHTML = "Actividad Final Integradora";
  document.getElementById('info').className = "fa fa-info-circle";
  document.getElementById('textoInfo').innerHTML = "Profesor: LIc. Lorena Bernis<br>"
                    + "Fecha Inicio: 27/12/2019<br>Fecha de Cierre: 27/02/2020<br>"
                    + "Evaluación Integradora: 20/02/2020<br>Trabajo Final: Carro de Compra";
}
// Al footer
function modificaFooter() {
  document.getElementById('mailAlumno').href = "mailto:alvaroguiffrey@gmail.com";
  document.getElementById('mailAlumno').innerHTML = "Alvaro Guiffrey";
  document.getElementById('inicioPie').href = "index.html";
  document.getElementById('iconoInicioPie').className = "fa fa-home";
  document.getElementById('iconoInicioPie').title = "Vuelve al inicio";
}

/* ------------------------------------------------------
 Funciones que se utilizan en más de un Script
 ------------------------------------------------------ */
function mostrarMensaje(origen) {
  switch (origen) {
    case "usuarioNuevo":
      // Mensaje del inicio Usuario Nuevo
      var mensaje = document.getElementById("mensaje");
      mensaje.style.display = "block";
      mensaje.className = "mensajeInfo";
      mensaje.innerHTML = "<b>¡Bienvenido!. Gracias por unirte a nosotros.</b><br>"
                          +"<p>Ingresa tu <i>'Usuario'</i> (letras y/o números) y <i>"
                          +"'Contraseña'</i> (letras, números y/o simbolos _*#- )."
                          +" Mínimo de 6 y máximo de 12 caracteres.</p>";
      break;
    case "loginCarro":
      // Mensaje del inicio Login Carro
      var mensaje = document.getElementById("mensaje");
      mensaje.style.display = "block";
      mensaje.className = "mensajeInfo";
      mensaje.innerHTML = "<b>Ingresá tu Usuario y Contraseña.</b><br>"
                          +"<p>Puedes ingresar como <i>visitante</i> con Usuario:'visita' y "
                          +"Contraseña:'visitaPass'.</p>";
      break;
    case "comprobanteCompra":
      // Mensaje del inicio Comprobante de Compra
      var mensaje = document.getElementById("mensaje");
      mensaje.style.display = "block";
      mensaje.className = "mensajeSuceso";
      mensaje.innerHTML = "<b>¡Compra exitosa!.</b> Puedes descargar el comprobante en PDF.";
      break;
    case "carroCompra":
      // Mensaje del inicio
      var mensaje = document.getElementById("mensaje");
      mensaje.style.display = "block";
      mensaje.className = "mensajeSuceso";
      mensaje.innerHTML = "<b>Inicia tu compra.</b> Necesitas seleccionar una categoría de productos.<br>";
      break;
    case "index":
      // Mensaje del inicio
      var mensaje = document.getElementById("mensaje");
      mensaje.style.display = "block";
      mensaje.className = "mensaje";
      mensaje.innerHTML = "<b>Bienvenido al sitio de compras!!!</b><br>"
                          +"<p>Puede seleccionar alguna acción con los botones.<p>"
                          +"<p>Gracias.</p>";
      break;
    case "salirCarro":
      // Mensaje del inicio de salida del Carro de Compras
      var mensaje = document.getElementById("mensaje");
      mensaje.style.display = "block";
      mensaje.className = "mensajeSuceso";
      mensaje.innerHTML = "<b>Gracias por Visitarnos!!!</b><br>"
                          +"<p>Te esperamos para una próxima compra.<p>"
                          +"<p>Saludos cordiales.</p>";
      break;
    default:

  }
}

function modificarUsuarioActivo() {
  // Busca y modifica el usuario activo
  var usuarioActivo = document.getElementById("usuarioActivo");
  usuarioActivo.title = "Usuario activo en Carro de Compras";
  // Si tiene usuario activo lo muestra
  if (activo !== "no") {
    var texto = "Usuario: "+activo;
    usuarioActivo.innerHTML = texto;
    usuarioActivo.style.display = "inline";
  }
}

function verUsuarioActivo() {
  // Si es "visita" modifico los elementos
  if (activo == "visita") {
    // Cambio mensaje
    mensaje.className = "mensajeInfo";
    mensaje.innerHTML = "<b>Como 'visita' solo puede consultar nuestros productos.</b><br>"+
                        " Para comprar debes ingresar tu 'Usuario' o registrarte como 'Nuevo Usuario'.";
    // Inactivo el boton Comprar
    document.getElementById("comprar").disabled = true;
    document.getElementById("comprar").title = "No puede realizar compra como visita.";
    // Alerta utilizando la librería sweetalert
    swal({
      title: "¡Advertencia!",
      text: "Como 'visita' no podrá realizar compras.",
      icon: "info",
      button: "Ok"
    });
  }
}

function salirCarro() {
  // Salir del Carro de Compras
  // Borra todo el LocalStorage
  localStorage.clear();
  // En local
  location.href = "salirCarro.html";
}

function vuelve(x) {
  // Vuelve a realizar otra compra con el mismo usuario activo
  location.href = x;
}

function convertirMilDec(numero) {
  // Formatea a dos decimales el numero recibido
  var imp_decimal = numero.toFixed(2);
  // Convierto el importe en cadena
  imp_decimal.toString();
  // convierto en arrays
  var valor = imp_decimal.split(".");
  var entero = valor[0].split("");
  var decimal = valor [1];
  // Calculo la cantidad de puntos separadores de miles
  var puntos = parseInt(entero.length) / 3;
  var resto = parseInt(entero.length) % 3;
  // Obtiene solo la parte entera sin redondear
  var separador = Math.floor(parseInt(puntos));
  // Si el resto es cero saca un punto separador
  if (resto == 0) { // No tiene números delante
    separador = separador - 1;
  }
  // Separo los miles hasta 3 puntos
  switch (separador.toString()) {
    case "0":
      break;
    case "1":
      entero.splice(-3, 0, ".");
      break;
    case "2":
      entero.splice(-3, 0, ".");
      entero.splice(-7, 0, ".");
      break;
    case "3":
      entero.splice(-3, 0, ".");
      entero.splice(-7, 0, ".");
      entero.splice(-11, 0, ".");
      break;
    default:
      entero.splice(-3, 0, ".");
  }
  // Convierte a string y reemplaza las , que devuelve toString
  var entero_str = entero.toString();
  var entero_mil = entero_str.replace(/,/g, "")
  var importe_mil_dec = entero_mil + "," + decimal;
  // Retorna el importe con el formato
  return importe_mil_dec;
}
