/* Funciones que se utilizan en el carro de compras del sitio.
  Obtiene datos del LocalStorage y contiene funciones que modifican el DOM y
  las necesarias para el menú, para la lista de productos y para el ticket
  de la compra; es cargado en la página "carroCompra.html".
  Autor: Alvaro Guiffrey
  Curso: Desarrollo Web con Javascript - Trabajo Final Integrador
  Fecha: 20/02/2020
*/

// Tareas que se hacen, con funciones, luego que se carga la página
window.onload = function () {
  modificaHeader(); // app.js
  modificaFooter(); // app.js
  mostrarMensaje("carroCompra"); // app.js
  modificarBotones();
  modificarUsuarioActivo(); // app.js
  verUsuarioActivo(); // app.js
  modificarForm();
  cargarMenu();
}

// Declara e inicializa variables del script
var cantLineas = 0;
var cantUnidades = 0;
var totalLineas = 0;
var ticketArray = [];
var lineaArray = [];
var p, producto;
// Obtiene datos del LocalStorage
var productos = JSON.parse(localStorage.getItem("productosAlf"));
var activo = localStorage["activo"];

// Funciones
function mostrar(x) {
  // Muestra y oculta elementos del menú
  var elemento = document.getElementById(x);
  if (elemento.style.display == "none") {
    elemento.style.display = "block";
  } else {
    elemento.style.display = "none";
  }
}

function cambiarIcon(elemento) {
  // Cambio los íconos del menú del carro de productos
  switch(elemento.id) {
    case 'tituloMenu':
      var iconMenu = document.getElementById('tituloIcono');
      if (iconMenu.className == "fa fa-bars") {
        iconMenu.className = "fa fa-times";
      } else {
        iconMenu.className = "fa fa-bars";
      }
      break;
    case "cat1":
      var iconCat1 = document.getElementById('cat1Icono');
      if (iconCat1.className == "fa fa-angle-double-down") {
        iconCat1.className = "fa fa-angle-double-up";
      } else {
        iconCat1.className = "fa fa-angle-double-down";
      }
      break;
    case "cat2":
      var iconCat2 = document.getElementById('cat2Icono');
      if (iconCat2.className == "fa fa-angle-double-down") {
        iconCat2.className = "fa fa-angle-double-up";
      } else {
        iconCat2.className = "fa fa-angle-double-down";
      }
      break;
  }
}

function modificarBotones() {
    // Titulos de los botones y links
    document.getElementById("salir").title = "Sale del Carro de Compras";
    document.getElementById("volver").title = "Vuelve al login de usuario";
    document.getElementById("comprar").title = "Confirma la compra realizada";
    // Atributos y estilos de los botones
    document.getElementById("comprar").type = "submit";
    document.getElementById("comprar").style.display = "none";
    // Agrega funciones a los botones
    document.getElementById("salir").onclick = function() { salirCarro() };
    document.getElementById("volver").onclick = function() { vuelve("loginCarro.html") };
}

function modificarForm() {
  // Eventos del Formulario
  document.getElementById("ticketForm").onsubmit = function() {
    return datosTicket()
  }
}

function cargarMenu() {
  var ulOcultas = document.querySelectorAll('.ulOculta');
  for (var i = 0; i < ulOcultas.length; i++) {
    ulOcultas[i].style.display = "none";
  }
}

function cargarProductos(x) {
  // Carga y muestra los productos seleccionados
  var categorias = x.split("/");
  var categoria = categorias[0];
  var subCategoria = categorias[1];
  // Cambia el título de la lista de productos agregando las categorías
  var texto = "Lista de productos: "+x;
  document.getElementById("tituloP").innerHTML = texto;
  // Cambia el mensaje
  mensaje.className = "mensajeSuceso";
  var texto_mensaje = "<b>¡Seleccionó una categoría con éxito!.</b>";
  if (activo !== "visita") {
    texto_mensaje += " Continúe agregando productos.";
  }
  mensaje.innerHTML = texto_mensaje;
  // -------------------------------------------------------------------------
  // Arma y muestra la lista de productos de acuerdo a las categorías seleccionada
  // -------------------------------------------------------------------------
  // Carga el elemento padre de la lista de productos
  var padre = document.getElementById("productos");
  // Carga todos los hijos en el array
  var reng = document.querySelectorAll(".responsive");
  // Si hay productos anteriores los elimina de la lista
  if (reng.length > 0) {
    for (var i = 0; i < reng.length; i++) {
      padre.removeChild(reng[i]);
    }
  }
  // Recorre el array de productos y crea los items de la lista
  for (var i = 0; i < productos.length; i++) {
    producto = productos[i];
    p = producto.split("*");
    if (p[4] == subCategoria || subCategoria == "Todos") {
      // Crea los elementos, carga los datos y personaliza el item
      var item = document.createElement("div");
      item.className = "responsive";
      var prod = document.createElement("div");
      prod.className = "producto";
      // Imagen utilizando la librería lightbox2
      var imagenM = document.createElement("a");
      imagenM.id = 'imagen'+i;
      imagenM.href = "image/"+p[2]+"-M.jpg";
      imagenM.setAttribute('data-lightbox', 'imagen'+i);
      imagenM.setAttribute('data-title', p[0]+" / "+p[1])
      // Imagen de producto
      var imagen = document.createElement("img");
      imagen.src = "image/"+p[2]+".jpg";
      imagen.title = "Clik para agrandar imagen";
      imagenM.appendChild(imagen);
      // Agrega la imagen al producto
      prod.appendChild(imagenM);
      // Fin imagen
      var detalle = document.createElement("div");
      detalle.className = "detalle";
      var nombre = document.createElement("p");
      nombre.className = "nombre";
      nombre.innerHTML = p[0];
      detalle.appendChild(nombre);
      var presentacion = document.createElement("p");
      presentacion.className = "presentacion";
      presentacion.innerHTML = p[1];
      detalle.appendChild(presentacion);
      var codigo = document.createElement("p");
      codigo.className = "codigo";
      codigo.innerHTML = "Código: "+p[2];
      detalle.appendChild(codigo);
      var precio = document.createElement("p");
      precio.className = "precio";
      precio.innerHTML = "<b>$ "+ convertirMilDec(Number(p[5])) +"</b>";
      detalle.appendChild(precio);
      // Si usuario activo es diferente a visita carga botón de cantidad
      if (activo !== "visita") {
        var botonP = document.createElement("div");
        botonP.className = "grupoBotones botonP";
        botonP.title = "Ingrese la cantidad que agrega al Ticket de Compra";
        var cantidad = document.createElement("input");
        cantidad.type = "number";
        cantidad.className = "botonP contador";
        cantidad.id = "cant-"+p[2];
        cantidad.name = p[2];
        cantidad.value = "1";
        cantidad.min = "1";
        cantidad.max = "12";
        cantidad.title = "Ingrese la cantidad que agrega al Ticket de Compra";
        botonP.appendChild(cantidad);
        var carro = document.createElement("button");
        carro.className = "botonP";
        carro.id = "boton-"+p[2];
        carro.title = "Envía al Ticket de Compra";
        carro.onclick = function() {cargaTicket(this)};
        //carro.onclick = cargaTicket(this);
        var icomCarro = document.createElement("i");
        icomCarro.className = "fa fa-cart-plus";
        carro.appendChild(icomCarro);
        botonP.appendChild(carro);
        detalle.appendChild(botonP);
      }
      // Termina de agregar los elementos creados
      prod.appendChild(detalle);
      item.appendChild(prod);
      padre.appendChild(item);
    }
  }
}

function cargaTicket(boton) {
  // Si cantLineas es igual a cero: crea los totales del ticket y cambia mensaje
  if (cantLineas == 0) {
    // vacia el array del tiquet
    ticketArray = [];
    // Crea los totales del ticket
    var linea_t_reng = document.createElement("p");
    linea_t_reng.id = "linea_t_reng";
    var linea_t_total = document.createElement("p");
    linea_t_total.id = "linea_t_total";
    var dir_total = document.getElementById("totales");
    dir_total.appendChild(linea_t_reng);
    dir_total.appendChild(linea_t_total);
    dir_total.style.display = "block";
    // Cambia el mensaje
    mensaje.className = "mensajeSuceso";
    mensaje.innerHTML = "<b>¡Agrego con exito!.</b>"+
                        " Continúe con su compra.";
    // Muestra el boton de compra
    document.getElementById('comprar').style.display = "block";
  }
  // Conforma el id de cantidad y obtiene datos
  var boton = boton.getAttribute("id").split("-");
  var reng = "cant-"+boton[1];
  var xx = document.getElementById(reng);
  // Crea, carga los datos y personaliza la linea
  var indice = 999999;
  // Busca los datos en array de productos y carga el índice
  for (var i = 0; i < productos.length; i++) {
    producto = productos[i];
    p = producto.split("*");
    if (p[2] == xx.getAttribute("name")) {
      indice = i;
    }
  }
  if (indice == 999999) {
    // No encontro el registro en productos
    alert("Producto inexistente: " + xx.getAttribute("name"));
  } else {
    // Encontró el registro en productos, arma líneas del ticket
    p = productos[indice].split("*");
    var prod_t = document.createElement("div");
    prod_t.className = "linea";
    //prod_t.id = "prod-"+cantLineas;
    var linea_t = document.createElement("p");
    //linea_t.id = "lin-"+cantLineas;
    var cant = xx.value;
    //var precio = parseInt(p[5]);
    var precio = p[5];
    var importe = cant * precio;
    linea_t.innerHTML = xx.value + " - " + p[2] + " $ " + convertirMilDec(Number(precio))
                        + " = $ "+ convertirMilDec(importe);
    var nombre_t = document.createElement("p");
    //nombre_t.id = "det-"+cantLineas;
    nombre_t.innerHTML = p[0];
    // Carga el elemento padre del ticket de compra y agrega elementos
    var lineas = document.getElementById("lineas");
    prod_t.appendChild(linea_t);
    prod_t.appendChild(nombre_t);
    lineas.appendChild(prod_t);
    // Carga al array del ticket
    lineaArray = []
    lineaArray.push(p[2]);
    lineaArray.push(p[0]);
    lineaArray.push(p[1]);
    lineaArray.push(cant);
    lineaArray.push(precio);
    lineaArray.push(importe);
    ticketArray.push(lineaArray);
    // Suma a totales
    cantLineas++;
    cantUnidades = cantUnidades + Number(cant);
    totalLineas = totalLineas + importe;
    var txt_renglon = " renglón";
    if (cantLineas > 1) {
      txt_renglon = " renglones";
    }
    var txt_un = " unidad.";
    if (cantUnidades > 1) {
      txt_un = " unidades.";
    }
    // Modifica el valor de los totales
    document.getElementById("linea_t_reng").innerHTML = "Son " + cantLineas + txt_renglon + " y "
                                                        + cantUnidades + txt_un;
    document.getElementById("linea_t_total").innerHTML = "Por un total de <b>$ "
                                                         + convertirMilDec(totalLineas) + "</b>";
  }
}

function datosTicket() {
  // Guarda los datos de la compra en LocalStorage
  localStorage.setItem("datosTicket", JSON.stringify(ticketArray));
  // Envía el formulario
  return true;
}
