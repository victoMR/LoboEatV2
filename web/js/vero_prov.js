document.addEventListener("DOMContentLoaded", function () {
    const hamburgerIcon = document.querySelector(".hamburger-icon");
    const dropdownMenu = document.querySelector(".dropdown-menu");
  
    // Mostrar el menú al hacer clic en el ícono
    hamburgerIcon.addEventListener("click", function (event) {
      event.stopPropagation(); // Evita que el evento se propague a otros elementos
      dropdownMenu.classList.toggle("show");
    });
  
    // Ocultar el menú al hacer clic fuera del ícono
    document.addEventListener("click", function (event) {
      if (
        !event.target.matches(".hamburger-icon") &&
        !event.target.closest(".dropdown-menu")
      ) {
        dropdownMenu.classList.remove("show");
      }
    });
  });