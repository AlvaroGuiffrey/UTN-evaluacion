/* Funciones que se utilizan para iniciar el sitio de compras.
  Para simular el mismo se guardan datos en el LocalStorage del navegador, los que
  nos permiten tener un usuario y una lista de productos (las fotos e información
  descargados del sitio de Tienda Inglesa -ROU- y los precios son ficticios).
  El script es cargado en "index.html" y las fotos (dos por producto) se encuentran
  en la carpeta "image" del sitio.
  Autor: Alvaro Guiffrey
  Curso: Desarrollo Web con Javascript - Trabajo Final Integrador
  Fecha: 20/02/2020
*/

// LocalStorage
if (typeof(Storage) !== "undefined") {
  // LocalStorage disponible
  if (localStorage.length == 0) {
    // Carga los datos de los usuarios si LocalStorage esta vacio
    cargaUsuarios();
    cargaProductos();
  }
} else {
  // LocalStorage no disponible en navegador
  alert("El navegador NO dispone de LocalStorage.");
}

// Funciones
function cargaUsuarios() {
  var usuarios = {visita:"visitaPass"};
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage["activo"] = "no";
}

function cargaProductos() {
  // Array con datos de productos
  var productos = [];
  productos = [
    "P001*Aceite de Oliva CARBONELL*Extra Virgen x 1l*Almacen*Aceites*154.25",
    "P002*Aceite de Oliva COLINAS DE GARZÓN*Extra Virgen x 500ml*Almacen*Aceites*280.40",
    "P003*Aceite de Oliva FILIPPO BERIO*Extra Virgen x 1l*Almacen*Aceites*380.38",
    "P004*Yerba CANARIAS*Paq. 1kg*Almacen*Yerbas*420.23",
    "P005*Yerba SARA Extra Suave*Paq. 1kg*Almacen*Yerbas*374.50",
    "P007*Yerba BALDO*Paq. 1kg*Almacen*Yerbas*385.15",
    "P006*Yerba CANARIAS Edición especial*Paq. 1kg*Almacen*Yerbas*435.50",
    "P008*Fideos ADRIA Tirabuzón*Paq. 500gr*Almacen*Fideos*76.40",
    "P009*Fideos BARILLA Spaghetti*Caja 500gr*Almacen*Fideos*98.80",
    "P010*Fideos ADRIA Vermicelli*Paq. 500gr*Almacen*Fideos*76.40",
    "P011*Fideos LAS ACACIAS Tirabuzón*Paq. 500gr c/veg.*Almacen*Fideos*69.15",
    "P012*Cerveza PATRICIA retornable*Bot. 340ml*Bebidas*Con alcohol*78.45",
    "P013*Cerveza BIZARRA India Pale Ale*Bot. 500ml*Bebidas*Con alcohol*104.30",
    "P014*Agua Mineral Natural SALUS*Bidón 6.25l s/Gas*Bebidas*Sin alcohol*145.35",
    "P015*Agua Mineral Natural SALUS*Bot. 2.25l c/Gas*Bebidas*Sin alcohol*70.30",
  ];
  localStorage.setItem("productos", JSON.stringify(productos));
  armarArrays();
}

function armarArrays() {
  // Lee los productos del LocalStorage y arma los arrays necesarios para el carro
  var productos = JSON.parse(localStorage.getItem("productos"));
  // Declara variables
  var aux;
  var producto;
  var categorias=[];
  var productosAlf=[];
  // Verifica si hay productos cargaProductos
  if (productos.length > 0) {
    // Arma arrays varios
    for (var i = 0; i < productos.length; i++) {
      producto = productos[i].split("*");
      // Array de categorías y subcategorías de productos
      aux = producto[3]+"*"+producto[4];
      if (categorias.indexOf(aux) == -1) {
        categorias.push(aux);
      }
      // Array de productos por orden alfabético
      aux = producto[1]+"*"+producto[2]+"*"+producto[0]+"*"+producto[3]+"*"+producto[4]+"*"+producto[5];
      productosAlf.push(aux);
    }
    // Ordeno y cargo los arrays en LocalStorage
    categorias.sort();
    localStorage.setItem("categorias", JSON.stringify(categorias));
    productosAlf.sort();
    localStorage.setItem("productosAlf", JSON.stringify(productosAlf));
  } else {
    // No hay productos en LocalStorage
    alert("No existen productos para el Carro de Compras");
  }
}

function alertaIngreso() {
  // Utiliza la librería sweetalert
  swal({
    title: "¡Advertencia!",
    text: "Para simular el 'Sitio de Compras' hemos agregado datos al LocalStorage de tu navegador.",
    icon: "info",
    button: "Ok"
  });
}

function modificarBotones() {
  // Titulos de los botones
  document.getElementById("salir").title = "Salir del Carro de Compras";
  document.getElementById("ingresar").title = "Ingresar al Carro de Compras";
  // Agrega funciones a los botones
  document.getElementById("salir").onclick = function() { salirCarro() };
  document.getElementById("ingresar").onclick = function() { ingresarCarro() };
}

function ingresarCarro() {
  location.href = "loginCarro.html";
}

window.onload = function() {
  modificaHeader(); // app.js
  modificaFooter(); // app.js
  // Muestra mensaje de bienvenida
  alertaIngreso();
  mostrarMensaje("index"); // app.js
  modificarBotones();
}
