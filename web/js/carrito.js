
// Lista para almacenar los productos en el carrito
const carrito = [];

// Obtener el botón "Agregar al carrito"
const agregarAlCarritoButtons = document.querySelectorAll(".popup-button");

// Agregar evento de clic a cada botón "Agregar al carrito"
agregarAlCarritoButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const productoId = event.target.dataset.productid; // Obtener el ID del producto desde el atributo 'data-productid'
    const productoNombre = event.target.dataset.productname; // Obtener el nombre del producto desde el atributo 'data-productname'
    const productoPrecio = parseFloat(event.target.dataset.productprice); // Obtener el precio del producto desde el atributo 'data-productprice'

    // Agregar el producto al carrito
    carrito.push({
      id: productoId,
      nombre: productoNombre,
      precio: productoPrecio,
      cantidad: 1, // Puedes establecer la cantidad inicial a 1
    });

    // Actualizar la cantidad de elementos en el carrito en el icono del carrito
    const cartAmount = document.querySelector(".cartAmount");
    cartAmount.textContent = carrito.length;
  });
});