
//inicia script del cuadro
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
