// Inicia script del cuadro
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

// Define una variable global para almacenar los elementos del carrito
let cartItems = [];

// Función para agregar un elemento al carrito
function addToCart(product) {
  // Agrega el producto al arreglo de elementos del carrito
  cartItems.push(product);

  // Actualiza el contador del carrito
  updateCartCount();

  // Guarda los elementos del carrito en localStorage
  saveCartToLocalStorage();
}

// Función para actualizar el contador del carrito
function updateCartCount() {
  const cartCount = document.querySelector(".cartAmount");
  cartCount.textContent = cartItems.length;
}

// Obtén todos los botones "Agregar al carrito" del popup
const addToCartButtons = document.querySelectorAll("#popup-button");

// Agrega un controlador de eventos a cada botón
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Obtén los detalles del producto desde el popup
    const popupTitle = document.getElementById("popup-title").textContent;
    const popupImage = document.getElementById("popup-image").style.backgroundImage;
    const popupDescription = document.getElementById("popup-description").textContent;
    const popupIngredients = Array.from(document.querySelectorAll("#popup-ingredients li"))
      .map((ingredient) => ingredient.textContent);

    // Crea un objeto de producto
    const product = {
      title: popupTitle,
      image: popupImage,
      description: popupDescription,
      ingredients: popupIngredients
    };

    // Agrega el producto al carrito
    addToCart(product);
  });
});

// Función para guardar los elementos del carrito en localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Función para cargar los elementos del carrito desde localStorage
function loadCartFromLocalStorage() {
  const cartItemsJson = localStorage.getItem("cartItems");
  if (cartItemsJson) {
    cartItems = JSON.parse(cartItemsJson);
    // Actualiza el contador del carrito al cargar la página
    updateCartCount();
  }
}

// Llama a la función para cargar los elementos del carrito al cargar la página
loadCartFromLocalStorage();
