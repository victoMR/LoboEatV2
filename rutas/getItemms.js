const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to fetch product items from the database
async function getProductItems() {
  try {
    const items = await prisma.producto.findMany(); // Replace 'producto' with the actual model name in your Prisma schema
    return items;
  } catch (error) {
    console.log("Error fetching product items:", error);
    throw error;
  }
}

module.exports = {
  getProductItems,
};
