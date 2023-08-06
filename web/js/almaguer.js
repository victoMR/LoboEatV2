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

const gridItems = document.querySelectorAll(".grid-item");

gridItems.forEach(function (item) {
  item.addEventListener("click", function () {
    const title = this.querySelector("span:nth-of-type(2)").textContent;
    const imageSrc = this.querySelector("img").src;

    const description = this.querySelector("span:nth-of-type(1)").textContent;
    const ingredients = this.querySelector(
      "span:nth-of-type(3)"
    ).textContent.split(", ");

    const popupTitle = document.getElementById("popup-title");
    const popupImage = document.getElementById("popup-image");
    const popupDescription = document.getElementById("popup-description");
    popupDescription.textContent = description;
    const popupIngredients = document.getElementById("popup-ingredients");

    popupTitle.textContent = title;
    popupImage.innerHTML = `<img src="${imageSrc}" alt="Descripción de la imagen" />`;
    popupDescription.textContent = description;
    if (description) {
      popupDescription.classList.remove("hidden");
    } else {
      popupDescription.classList.add("hidden");
    }

    popupIngredients.innerHTML = "";
    ingredients.forEach(function (ingredient) {
      const li = document.createElement("li");
      li.textContent = ingredient;
      popupIngredients.appendChild(li);
    });

    const popup = document.getElementById("popup");
    popup.style.display = "block";
    popup.focus();
    popup.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

const closeButton = document.querySelector(".close-button");

closeButton.addEventListener("click", function () {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
});

var popupButton = document.getElementById("popup-button");

// Este código asume que estás utilizando jQuery para realizar la solicitud AJAX

$(document).ready(function () {
  // Hacer una solicitud AJAX al servidor para obtener la lista de productos
  $.ajax({
    url: "/api/productos", // Cambia la URL a la ruta que devuelve la lista de productos desde el servidor
    method: "GET",
    dataType: "json",
    success: function (data) {
      // Una vez que se recibe la lista de productos del servidor, generar los botones de "Add to cart"
      generateAddToCartButtons(data);
    },
    error: function (error) {
      console.error("Error al obtener la lista de productos:", error);
    },
  });
});

function generateAddToCartButtons(items) {
  // Obtener el contenedor de los botones de "Add to cart"
  const addToCartContainer = document.querySelector(".grid-container");

  // Limpiar el contenido del contenedor (por si ya había botones generados previamente)
  addToCartContainer.innerHTML = "";

  // Generar los botones de "Add to cart" dinámicamente para cada producto
  items.forEach((producto) => {
    const addButton = document.createElement("div");
    addButton.classList.add(
      "grid-item",
      "animate__animated",
      "animate__rubberBand"
    );

    const link = document.createElement("a");
    link.href = `/agregar/${producto.id_product}`;
    link.classList.add("btn", "btn-primary", "col-5", "rounded-4");

    const icon = document.createElement("i");
    icon.classList.add("bi", "bi-basket3-fill");

    link.appendChild(icon);
    addButton.appendChild(link);

    // Obtener el último elemento en la lista de productos (el contenedor del último producto)
    const lastProductContainer = addToCartContainer.lastElementChild;

    // Insertar el botón en el mismo nivel que el último producto
    addToCartContainer.insertBefore(
      addButton,
      lastProductContainer.nextElementSibling
    );
  });
}
