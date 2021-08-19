/* Funciones que se utilizan para mostrar el comprobante de la compra.
  Contiene funciones que modifican el DOM, realizan alerta, muestran el
  detalle de la compra y descargan un archivo en PDF; es cargado en la
  página "comprobanteCompra.html".
  Autor: Alvaro Guiffrey
  Curso: Desarrollo Web con Javascript - Trabajo Final Integrador
  Fecha: 20/02/2020
*/

// Tareas que se hacen, con funciones, luego que se carga la página
window.onload = function() {
  modificaHeader(); // app.js
  modificaFooter(); // app.js
  ingreso();
  mostrarMensaje("comprobanteCompra"); // app.js
  modificarBotones();
  modificarUsuarioActivo(); // app.js
  cargarDatos();
}

// Carga datos del localStorage
var activo = localStorage["activo"];

// Funciones
function ingreso() {
  // Alerta utilizando la librería sweetalert
  swal({
    title: "¡Gracias por elegirnos!",
    text: "Tu compra ha sido exitosa. Te esperamos.",
    icon: "success",
    button: "Continuar"
  });
}

function modificarBotones() {
  // Titulos de los botones y links
  document.getElementById("salir").title = "Sale del Carro de Compras";
  document.getElementById("volver").title = "Vuelve para nueva compra";
  document.getElementById("descargar").title = "Descarga comprobante en PDF";
  // Agrega funciones a los botones
  document.getElementById("salir").onclick = function() { salirCarro() };
  document.getElementById("volver").onclick = function() { vuelve("carroCompra.html") };
  document.getElementById("descargar").onclick = function() { descargarPDF() };
}

function cargarDatos() {
  // Obtiene los datos guardados en LocalStorage
  var ticketArray = JSON.parse(localStorage.getItem("datosTicket"));
  // Obtiene el elemento padre del comprobante de compra
  var tabla = document.getElementById('rengComp');
  // ------------------------------------------------
  // Usa el elemento <table> para poder descargar PDF
  // ------------------------------------------------
  tabla.border = "0"; // Sin bordes
  // Arma los renglones del comprobante de compra
  var cantU = 0, total = 0, reng = 0;
  for (var i = 0; i < ticketArray.length; i++) {
    var dato = ticketArray[i];
    var tr0 = document.createElement('tr');
    tr0.style.fontSize = "11px";
    var td0 = document.createElement('td');
    td0.colSpan = 4;
    td0.style.color = "green";
    reng = i + 1;
    td0.innerHTML = "#" + reng;
    tr0.appendChild(td0);
    tabla.appendChild(tr0);
    var tr1 = document.createElement('tr');
    tr1.style.fontSize = "11px";
    var td1 = document.createElement('td');
    td1.colSpan = 1;
    td1.innerHTML = dato[0];
    tr1.appendChild(td1);
    var td2 = document.createElement('td');
    td2.colSpan = 1;
    td2.innerHTML = dato[3] + " Un.";
    tr1.appendChild(td2);
    var td3 = document.createElement('td');
    td3.colSpan = 1;
    td3.innerHTML = "$  " + convertirMilDec(Number(dato[4]));
    tr1.appendChild(td3);
    var td4 = document.createElement('td');
    td4.colSpan = 1;
    td4.innerHTML = "$  " + convertirMilDec(Number(dato[5]));
    tr1.appendChild(td4);
    tabla.appendChild(tr1);
    var tr2 = document.createElement('tr');
    tr2.style.fontSize = "11px";
    var td5 = document.createElement('td');
    td5.colSpan = 3;
    td5.innerHTML = dato[1];
    tr2.appendChild(td5);
    var td6 = document.createElement('td');
    td6.colSpan = 1;
    td6.innerHTML = dato[2];
    tr2.appendChild(td6);
    tabla.appendChild(tr2);
    cantU += Number(dato[3]);
    total += Number(dato[5]);
  }
  var totalComp = document.getElementById("total");
  totalComp.style.fontSize = "12px";
  totalComp.innerHTML = "Son " + cantU + " unidad/es por $  " + convertirMilDec(total);
  var comComp = document.getElementById('comentario');
  comComp.innerHTML = "¡Gracias por su compra!. ";
}

function descargarPDF() {
  // Utiliza las librerias jQuery, html2canvas y jsPDF
  // Nota: la descarga realizada en PDF tiene fallas luego de unos cuatro
  // productos.
  html2canvas(document.getElementById("ticketComp"), // html2canvas
    {
      onrendered: function(canvas) {
        var imgData = canvas.toDataURL("");
        var a = document.createElement('a');
        var doc = new jsPDF('p','mm'); // jsPDF
        doc.addImage(imgData, 'JPEG', 20, 10);
        doc.save($.now() + '.pdf'); // $.now() jQuery
      }
    });
    // Credito: vike.io/es/384719/
}
