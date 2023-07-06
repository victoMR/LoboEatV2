//sript de la pantalla de carga 
window.addEventListener("load", function() {
  const loader = document.querySelector(".loader");
  loader.style.display = "none";
});

//sript de el menu hamburger
document.addEventListener("DOMContentLoaded", function() {
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const dropdownMenu = document.querySelector(".dropdown-menu");

  hamburgerIcon.addEventListener("click", function() {
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
  });
  
      
//inicia script del cuadro
/*
  const gridItems = document.querySelectorAll(".grid-item");

  gridItems.forEach(function(item) {
    item.addEventListener("click", function() {
      const title = this.querySelector(".overlay span").textContent;//agarra el title
      const imageSrc = this.querySelector("img").src; // la imagen
      // agragar el span description de cada producto de cada provedor 
      const description = "Descripción del producto";
      const ingredients = ["Ingrediente 1", "Ingrediente 2", "Ingrediente 3"];

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
*/

  const closeButton = document.querySelector(".close-button");

  closeButton.addEventListener("click", function() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
  });

  const popupButton = document.getElementById("popup-button");

  popupButton.addEventListener("click", function() {
    // Acciones al agregar al carrito
  });
});
