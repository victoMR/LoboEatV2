// Requerimientos de librerias de npm ----------------------------------------------------------------
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
var ruta=require("express").Router();

// Ruta principal ----------------------------------------------------------------
ruta.get("/",(req,res) => {
    res.render("login");
});
// Ruta de inicio se usa solamente cuando ya ingresamos seccion ----------------------------------------------------------------
ruta.get("/inicio",(req,res) => {
    res.render("inicio");
});
// Ruta de reegistrar usuario ----------------------------------------------------------------
ruta.get("/register", async(req, res) => {
  res.render("register"); 
});
// Ruta de incercion de nuevo usuario a la base  ----------------------------------------------------------------
ruta.post("/register", async (req, res) => {
  const { username, name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Encripta la contraseña utilizando bcrypt

  try {
    const cliente = await prisma.cliente.create({
      data: {
        expediente_cliente: parseInt(username),
        name_cliente: name,
        password_cliente: hashedPassword,
        status_cliente: true
      }
    });

    res.redirect("/inicio");
    console.log("Registro de cliente insertado en la base de datos");
  } catch (error) {
    console.log("Error al insertar el registro de cliente en la base de datos:", error);
    res.status(500).send("Error interno del servidor");
  }
});
// Ruta de inicio para poner las credenciales ----------------------------------------------------------------
ruta.post("/inicio", async (req, res) => {
  const { login, password } = req.body;

  try {
    const cliente = await prisma.cliente.findUnique({
      where: {
        expediente_cliente: parseInt(login),
      },
    });

    if (!cliente) {
      // El cliente no existe en la base de datos
      return res.status(400).send("Credenciales incorrectas");
    }

    const passwordMatch = await bcrypt.compare(password, cliente.password_cliente);
    if (!passwordMatch) {
      // La contraseña no coincide
      return res.status(400).send("Credenciales incorrectas");
    }

    // Las credenciales son válidas, se inicia sesión exitosamente
    res.render("inicio");
    console.log("Inicio de sesión exitoso");
  } catch (error) {
    console.log("Error al verificar las credenciales:", error);
    res.status(500);
    res.redirect("/error")
  }
});
// Ruta del proivedor Vero ----------------------------------------------------------------  
ruta.get("/provVero", async (req,res) => {
  try {
    const productos = await prisma.producto.findMany({
      where: {
        id_prov1: 2, // Reemplaza ID_DEL_PROVEEDOR_VERO con el ID real del proveedor Vero en tu base de datos
      },
    });
    res.render("provVero", { productos });
    console.log("Accesoo a vero");
  } catch (error) {
    console.log("Error al obtener los productos del proveedor Vero:", error);
    res.status(500).send("Error interno del servidor");
  }
});
// Ruta del proivedor Almaguer ----------------------------------------------------------------  
ruta.get("/provAlmaguer",async (req,res) => {
  try {
    const productos = await prisma.producto.findMany({
      where: {
        id_prov1: 1, // Reemplaza ID_DEL_PROVEEDOR_VERO con el ID real del proveedor Vero en tu base de datos
      },
    });
    res.render("provAlmaguer", { productos });
    console.log("Acceso a provAlmaguer");
  } catch (error) {
    console.log("Error al obtener los productos del proveedor Almaguer:", error);
    res.status(500).send("Error interno del servidor");
  }
});
// Ruta sobre nosotros ----------------------------------------------------------------  
ruta.get("/aboutus",(req,res) => {
    res.render("aboutus");
});
// Ruta de inico de seccion ----------------------------------------------------------------  
ruta.get("/login",(req,res) => {
  res.render("login");
});
// Ruta de carrito de compras ----------------------------------------------------------------  
ruta.get("/shopingCart",(req,res) => {
  res.render('shopingCart')
});
ruta.get("/error",(req,res) => {
  res.render("error");
});

module.exports = ruta;