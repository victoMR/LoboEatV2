const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getProductItems } = require('./getItemms');

// Function to add an item to the cart
function addToCart(req, item) {
    if (!req.session.cart) {
      req.session.cart = [];
    }
  
    const existingItem = req.session.cart.find((product) => product.id === item.id_product);
  
    if (existingItem) {
      // If the item already exists in the cart, increase its quantity
      existingItem.cantidad++;
    } else {
      // If the item does not exist, add it to the cart with quantity 1
      item.cantidad = 1;
      req.session.cart.push(item);
    }
  }
  

// Function to fetch product details from the database
async function getProductDetails(productId) {
  const product = await prisma.producto.findUnique({
    where: {
      id_product: parseInt(productId),
    },
  });
  return product;
}

router.get("/agregar/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const producto = await getProductDetails(productId);

    if (!producto) {
      // Product not found in the database
      return res.status(404).send("Product not found");
    }

    // Add the product to the cart
    addToCart(req, producto);
    res.redirect("/verCarrito"); // Redirect to the cart after adding
  } catch (error) {
    console.log("Error fetching product details:", error);
    res.status(500).redirect("/error");
  }
});

// Route to view the cart
router.get("/verCarrito", async (req, res) => {
  const cartItems = req.session.cart || [];

  try {
    // Fetch the items from the database
    const items = await getProductItems();

    res.render("shopingCart", { carrito: cartItems, items: items });
  } catch (error) {
    console.log("Error fetching product items:", error);
    res.status(500).redirect("/error");
  }
});

router.get("/eliminarProductoCarrito/:id", (req, res) => {
    const id = req.params.id;
  
    // Find the index of the product in the cart based on its ID
    const productIndex = req.session.cart.findIndex((product) => product.id_product.toString() === id);
  
    if (productIndex !== -1) {
      if (req.session.cart[productIndex].cantidad > 1) {
        // If the quantity is greater than 1, decrease the quantity
        req.session.cart[productIndex].cantidad--;
      } else {
        // If the quantity is 1, remove the product from the cart
        req.session.cart.splice(productIndex, 1);
      }
    }
  
    res.redirect("/verCarrito"); // Redirect back to the cart page
  });
  

module.exports = router;
