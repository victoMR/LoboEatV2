document.addEventListener('DOMContentLoaded', function() {
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  // Mostrar el menú al hacer clic en el ícono
  hamburgerIcon.addEventListener('click', function(event) {
    event.stopPropagation(); // Evita que el evento se propague a otros elementos
    dropdownMenu.classList.toggle('show');
  });

  // Ocultar el menú al hacer clic fuera del ícono
  document.addEventListener('click', function(event) {
    if (!event.target.matches('.hamburger-icon') && !event.target.closest('.dropdown-menu')) {
      dropdownMenu.classList.remove('show');
    }
  });
});


const gridItems = document.querySelectorAll(".grid-item");

gridItems.forEach(function(item) {
  item.addEventListener("click", function() {
    const title = this.querySelector("span:nth-of-type(2)").textContent;
    const imageSrc = this.querySelector("img").src;

    const description = this.querySelector("span:nth-of-type(1)").textContent;
    const ingredients = this.querySelector("span:nth-of-type(3)").textContent.split(", ");

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
    ingredients.forEach(function(ingredient) {
      const li = document.createElement("li");
      li.textContent = ingredient;
      popupIngredients.appendChild(li);
    });

    const popup = document.getElementById("popup");
    popup.style.display = "block";
    popup.focus();
    popup.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

const closeButton = document.querySelector(".close-button");

closeButton.addEventListener("click", function() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
});

const popupButton = document.getElementById("popup-button");

let increment = (popupButton) => {
  console.log(popupButton);
};

let decrement = () => {
  console.log("Quitar producto");
};
let update = () => {};


