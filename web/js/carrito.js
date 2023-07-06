// Variables globales
var productosEnCarrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
  // Crear objeto de producto
  var producto = {
    nombre: nombre,
    precio: precio
  };

  // Agregar producto al array de productos en el carrito
  productosEnCarrito.push(producto);

  // Renderizar el carrito
  renderizarCarrito();
}

// Función para renderizar el carrito de compras
function renderizarCarrito() {
  var carritoContainer = document.querySelector(".cart");

  // Limpiar el contenido actual del carrito
  carritoContainer.innerHTML = "Tu pedido es: <br>";

  // Recorrer los productos en el carrito y mostrarlos
  for (var i = 0; i < productosEnCarrito.length; i++) {
    var producto = productosEnCarrito[i];

    // Crear elemento para mostrar el producto
    var productoElement = document.createElement("div");
    productoElement.className = "carrito-producto";
    productoElement.textContent = producto.nombre + " - " + producto.precio;
    
    // Agregar elemento del producto al contenedor del carrito
    carritoContainer.appendChild(productoElement);
  }
}

// Obtener todos los botones "Agregar al carrito"
var agregarBotones = document.querySelectorAll(".overlay #popup-button");

// Asignar evento click a los botones
agregarBotones.forEach(function(boton) {
  boton.addEventListener("click", function() {
    // Obtener los datos del producto seleccionado
    var nombre = this.parentNode.querySelector("span").textContent;
    var precio = this.parentNode.querySelector("span").nextSibling.textContent;
    
    // Agregar producto al carrito
    agregarAlCarrito(nombre, precio);
  });
});
