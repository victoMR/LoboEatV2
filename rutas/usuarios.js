// Requerimientos de librerías de npm
const { PrismaClient } = require("@prisma/client");
const ua = require("universal-analytics");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
var ruta = require("express").Router();
const dotenv = require("dotenv");
const { rutacart, items } = require("./carrito");

dotenv.config();

// Ruta principal
ruta.get("/", (req, res) => {
  try {
    const visitor = ua(process.env.CLAVE_GOOGLE_ANALYTICS);
    // Track pageview for server-side
    visitor.pageview(req.originalUrl).send();

    // Obtener la información del usuario actualmente logueado desde la sesión
    const usuario = req.session.usuario || null;

    // Renderizar la vista login.ejs y pasar la variable "usuario" al template menulogin.ejs
    res.render("login", { usuario: usuario });
  } catch (error) {
    console.error("Error rendering login:", error);
    res.status(500).redirect("/error");
  }
});

// Ruta de inicio se usa solamente cuando ya ingresamos sesión
ruta.get("/inicio", (req, res) => {
  const usuario = req.session.usuario;

  // Verificar si el usuario ha iniciado sesión correctamente
  if (!usuario) {
    // Si no hay información del usuario en la sesión, redirigir al inicio de sesión
    return res.redirect("/login");
  }

  // Renderizar la vista inicio.ejs y pasar la variable "usuario"
  res.render("inicio", { usuario });
});

// Ruta de registrar usuario
ruta.get("/register", async (req, res) => {
  res.render("register");
});

// Ruta de inserción de nuevo usuario a la base de datos
ruta.post("/register", async (req, res) => {
  const { username, name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Encripta la contraseña utilizando bcrypt

  try {
    const cliente = await prisma.cliente.create({
      data: {
        expediente_cliente: parseInt(username),
        name_cliente: name,
        password_cliente: hashedPassword,
        status_cliente: true,
      },
    });

    res.redirect("/inicio");
    console.log("Registro de cliente insertado en la base de datos");
  } catch (error) {
    console.log(
      "Error al insertar el registro de cliente en la base de datos:",
      error
    );
    res.status(500).redirect("/error");
  }
});

// Ruta de inicio de sesión
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

    const passwordMatch = await bcrypt.compare(
      password,
      cliente.password_cliente
    );
    if (!passwordMatch) {
      // La contraseña no coincide
      return res.status(400).send("Credenciales incorrectas");
    }

    // Las credenciales son válidas, se inicia sesión exitosamente
    req.session.expediente_cliente = cliente.expediente_cliente;
    // Almacenar la información del usuario en la sesión
    req.session.usuario = cliente;

    // Redirigir a la ruta de inicio
    res.redirect("/inicio");
    console.log(cliente.expediente_cliente);
    console.log("Inicio de sesión exitoso");
  } catch (error) {
    console.log("Error al verificar las credenciales:", error);
    res.status(500).redirect("/error");
  }
});

// Ruta del proveedor Vero
// Ruta para ver los productos del proveedor Vero
ruta.get("/provVero", async (req, res) => {
  try {
    // Obtener el id del usuario desde la consulta (query) de la URL
    const expediente_cliente = parseInt(req.query.expediente_cliente);

    // Obtenemos el carrito desde la sesión
    const carrito = req.session.cart || [];

    // Obtenemos los productos del proveedor Vero
    const productos = await prisma.producto.findMany({
      where: {
        category_id1: 2,
      },
    });

    // Renderizamos la vista provVero.ejs y pasamos las variables carrito y productos
    res.render("provVero", {
      carrito,
      items: productos,
      usuario: { expediente_cliente },
    });
    console.log("Acceso a provVero");
  } catch (error) {
    console.log("Error al obtener los productos del proveedor Vero:", error);
    res.status(500).redirect("/error");
  }
});

// Ruta del proveedor Almaguer
ruta.get("/provAlmaguer", async (req, res) => {
  try {
    // Obtener el id del usuario desde la consulta (query) de la URL
    const expediente_cliente = parseInt(req.query.expediente_cliente);

    const carrito = req.session.cart || [];

    const productos = await prisma.producto.findMany({
      where: {
        category_id1: 1, // Replace 1 with the real ID of the Almaguer provider in your database
      },
    });

    // Pasar la variable 'productos' a la plantilla 'provAlmaguer' junto con la variable 'items'
    res.render("provAlmaguer", {
      carrito,
      items: productos,
      usuario: { expediente_cliente },
    });
    console.log("Acceso a provAlmaguer");
  } catch (error) {
    console.log(
      "Error al obtener los productos del proveedor Almaguer:",
      error
    );
    res.status(500).redirect("/error");
  }
});

// Ruta para editar datos de usuario (GET)
ruta.get("/editusr/:expediente_cliente", async (req, res) => {
  try {
    // Obtener el expediente del usuario actualmente logueado desde la sesión
    const expediente_cliente = parseInt(req.params.expediente_cliente);

    if (isNaN(expediente_cliente)) {
      return res
        .status(500)
        .send("Error: El expediente del cliente no es un número válido.");
    }

    const usuario = await prisma.cliente.findUnique({
      where: {
        expediente_cliente: expediente_cliente,
      },
    });

    if (!usuario) {
      // El usuario no existe en la base de datos
      return res.status(404).send("Usuario no encontrado");
    }

    res.render("editusr", { usuario }); // Pasar la variable "usuario" a la plantilla "editusr.ejs"
  } catch (error) {
    console.log("Error al obtener el usuario:", error);
    res.status(500).redirect("/error");
  }
});

// Ruta para procesar el formulario de modificación de usuario (POST)
ruta.post("/modificarUsuario", async (req, res) => {
  const { id, name, password, newPassword } = req.body;

  try {
    const cliente = await prisma.cliente.findUnique({
      where: {
        expediente_cliente: parseInt(id),
      },
    });

    if (!cliente) {
      // El usuario no existe en la base de datos
      return res.status(404).send("Usuario no encontrado");
    }

    const passwordMatch = await bcrypt.compare(
      password,
      cliente.password_cliente
    );
    if (!passwordMatch) {
      // La contraseña actual no coincide
      return res.status(400).send("La contraseña actual es incorrecta");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const updatedUsuario = await prisma.cliente.update({
      where: {
        expediente_cliente: parseInt(id),
      },
      data: {
        name_cliente: name,
        password_cliente: hashedNewPassword, // Actualiza la contraseña con la nueva contraseña encriptada
      },
    });

    if (!updatedUsuario) {
      // El usuario no existe en la base de datos
      return res.status(404).send("Usuario no encontrado");
    }

    res.redirect("/inicio");
    console.log("Usuario actualizado correctamente");
  } catch (error) {
    console.log("Error al actualizar el usuario:", error);
    res.status(500).redirect("/error");
  }
});

// Ruta sobre nosotros
ruta.get("/aboutus", async (req, res) => {
  try {
    // Obtener el expediente del usuario actualmente logueado desde la sesión
    const expediente_cliente = parseInt(req.session.expediente_cliente);

    if (isNaN(expediente_cliente)) {
      return res
        .status(500)
        .send("Error: El expediente del cliente no es un número válido.");
    }

    // Buscar al usuario en la base de datos usando el expediente_cliente
    const usuario = await prisma.cliente.findUnique({
      where: {
        expediente_cliente: expediente_cliente,
      },
    });

    if (!usuario) {
      // El usuario no existe en la base de datos
      return res.status(404).send("Usuario no encontrado");
    }

    // Renderizar la vista aboutus.ejs y pasar la variable "usuario" al template
    res.render("aboutus", { usuario });
  } catch (error) {
    console.log("Error al obtener el usuario:", error);
    res.status(500).redirect("/error");
  }
});

// Ruta de carrito de compras
ruta.get("/verCarrito", async (req, res) => {
  try {
    const expediente_cliente = parseInt(req.session.expediente_cliente);

    if (isNaN(expediente_cliente)) {
      return res
        .status(500)
        .send("Error: El expediente del cliente no es un número válido.");
    }

    const usuario = await prisma.cliente.findUnique({
      where: {
        expediente_cliente: expediente_cliente,
      },
    });

    if (!usuario) {
      return res.status(404).send("Usuario no encontrado");
    }

    const carrito = req.session.cart || [];

    // Incluir la variable "usuario" en el objeto que se pasa a la vista
    res.render("verCarrito", { usuario, carrito });
  } catch (error) {
    console.log("Error al obtener el usuario:", error);
    res.status(500).redirect("/error");
  }
});

// Ruta de inicio de sesión (GET)
ruta.get("/login", (req, res) => {
  try {
    // Obtener la información del usuario actualmente logueado desde la sesión
    const usuario = req.session.usuario || null;

    // Renderizar la vista login.ejs y pasar la variable "usuario" al template menulogin.ejs
    res.render("login", { usuario: usuario });
  } catch (error) {
    console.error("Error rendering login:", error);
    res.status(500).redirect("/error");
  }
});

ruta.get("/error", (req, res) => {
  res.render("error");
});

module.exports = ruta;
