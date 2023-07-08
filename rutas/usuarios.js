const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
var ruta=require("express").Router();

ruta.get("/",(req,res) => {
    res.render("login");
});
ruta.get("/inicio",(req,res) => {
    res.render("inicio");
});

ruta.get("/register", async(req, res) => {
  res.render("register"); // Asegúrate de que la ruta sea correcta y coincida con la ubicación del archivo
});

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
    res.status(500).send("Error interno del servidor");
  }
});



  
ruta.get("/provVero",(req,res) => {
    res.render("provVero");
});
ruta.get("/provAlmaguer",(req,res) => {
    res.render("provAlmaguer");
});
ruta.get("/aboutus",(req,res) => {
    res.render("aboutus");
});
ruta.get("/login",(req,res) => {
  res.render("login");
});
ruta.get("/shopingCart",(req,res) => {
  res.render("shopingCart");
});
module.exports = ruta;