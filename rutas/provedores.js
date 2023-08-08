const { PrismaClient } = require("@prisma/client");
const ua = require("universal-analytics");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const rutaprov = require("express").Router();
const dotenv = require("dotenv");

dotenv.config();

// Ruta principal
rutaprov.get("/", (req, res) => {
  try {
    const visitor = ua(process.env.CLAVE_GOOGLE_ANALYTICS);
    // Track pageview for server-side
    visitor.pageview(req.originalUrl).send();
    res.render("loginpro");
  } catch (error) {
    console.error("Error rendering login:", error);
    res.status(500).redirect("/error");
  }
});

rutaprov.get("/prueba",(req, res) => {
  res.send("hola")
});

// Ruta de inicio de sesión para proveedores (POST)
// rutaprov.post("/provedor/loginpro", async (req, res) => {
//   const { num_prov, password } = req.body;

//   try {
//     const proveedor = await prisma.proveedor.findUnique({
//       where: {
//         num_prov: parseInt(num_prov),
//       },
//     });
rutaprov.post("/provedor/loginpro", async (req, res) => {
  const { num_prov, password } = req.body;

  try {
    const proveedor = await prisma.proveedor.findUnique({
      where: {
        num_prov: parseInt(num_prov),
      },
    });

    if (!proveedor) {
      // El proveedor no existe en la base de datos
      return res.status(400).send("Credenciales incorrectas del proveedor");
    }

    const passwordMatch = await bcrypt.compare(password, proveedor.password);
    if (!passwordMatch) {
      // La contraseña no coincide
      return res.status(400).send("Credenciales incorrectas");
    }

    // Las credenciales son válidas, se inicia sesión exitosamente
    req.session.num_prov = proveedor.num_prov;
    // Almacenar la información del proveedor en la sesión
    req.session.proveedor = proveedor;

    // Redirigir al proveedor según su número de proveedor
    if (proveedor.num_prov === 202301) {
      return res.redirect("/provedor/Almaguer");
    } else if (proveedor.num_prov === 202202) {
      return res.render("/provedor/Vero/menu");
    } else {
      // Redireccionar a una página de proveedor desconocido si el número no coincide con ninguno
      return res.redirect("/provedor/desconocido");
    }
  } catch (error) {
    console.log("Error al verificar las credenciales del proveedor:", error);
    res.status(500).redirect("/error");
  }
});

// Ruta de inicio de sesión para proveedores (GET)
// Ruta de inicio de sesión para proveedores (GET)
rutaprov.get("/provedor/loginpro", (req, res) => {
  // Pasa la variable "usuario" al renderizar la plantilla "provedor/loginpro.ejs"
  res.render("provedor/loginpro", { usuario: req.session.num_prov });
});

// Resto de las rutas relacionadas con proveedores
// Puedes agregar aquí las rutas para cada proveedor específico

module.exports = rutaprov;
