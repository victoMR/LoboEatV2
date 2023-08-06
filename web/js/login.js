//login.js
// Espera a que se cargue el documento antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
  // Obtiene los elementos del DOM necesarios
  const tipoUsuarioSwitch = document.getElementById("tipoUsuarioSwitch");
  const usuarioForm = document.getElementById("usuarioForm");
  const proveedorForm = document.getElementById("proveedorForm");

  // Añade un evento de cambio al interruptor de tipo de usuario
  tipoUsuarioSwitch.addEventListener("change", function () {
    if (this.checked) {
      // Si el interruptor está activado
      // Aplica las clases de animación para ocultar el formulario de usuario y mostrar el formulario de proveedor
      usuarioForm.classList.add("animate__animated", "animate__flipOutX");
      usuarioForm.classList.remove("animate__flipInX");
      proveedorForm.classList.add("animate__animated", "animate__flipInX");
      proveedorForm.classList.remove("animate__flipOutX");
    } else {
      // Aplica las clases de animación para mostrar el formulario de usuario y ocultar el formulario de proveedor
      usuarioForm.classList.add("animate__animated", "animate__flipInX");
      usuarioForm.classList.remove("animate__flipOutX");
      proveedorForm.classList.add("animate__animated", "animate__flipOutX");
      proveedorForm.classList.remove("animate__flipInX");
    }
  });

  // Añade otro evento de cambio al interruptor de tipo de usuario
  tipoUsuarioSwitch.addEventListener("change", function () {
    // Si el interruptor está activado
    if (this.checked) {
      // Oculta el formulario de usuario y muestra el formulario de proveedor
      usuarioForm.classList.add("collapse");
      proveedorForm.classList.remove("collapse");
    } else {
      // Muestra el formulario de usuario y oculta el formulario de proveedor
      usuarioForm.classList.remove("collapse");
      proveedorForm.classList.add("collapse");
    }
  });
});
