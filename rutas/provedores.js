const { PrismaClient } = require("@prisma/client");
const ua = require("universal-analytics");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const rutaprov = require("express").Router();
const dotenv = require("dotenv");
var num_prov;

dotenv.config();

// Ruta principal
rutaprov.get("/", (req, res) => {
  try {
    const visitor = ua(process.env.CLAVE_GOOGLE_ANALYTICS);
    // Track pageview for server-side
    visitor.pageview(req.originalUrl).send();
    res.render("provedor/loginpro");
  } catch (error) {
    console.error("Error rendering login:", error);
    res.status(500).redirect("/error");
  }
});

rutaprov.post("/provedor/loginpro", async (req, res) => {
  const name_prov = req.body.name_prov;
  const password = req.body.password;
  
  let id_prov = null;

  // Verificar si el nombre de proveedor es uno de los conocidos
  if (name_prov === "Almaguer") {
    id_prov = 1;
  } else if (name_prov === "Vero") {
    id_prov = 2;
  }
  num_prov = id_prov;

  if (id_prov === null) {
    // Nombre de proveedor desconocido
    return res.status(400).send("Nombre de proveedor desconocido");
  }

  try {
    const proveedor = await prisma.provedor.findUnique({
      where: {
        id_prov: id_prov,
      },
    });

    if (!proveedor) {
      // El proveedor no existe en la base de datos
      return res.status(400).send("Credenciales incorrectas del proveedor");
    } 
    

    const passwordMatch = bcrypt.compare(
      password,
      proveedor.password
    );
    if (!passwordMatch) {
      // La contraseña no coincide
      return res.status(400).send("Credenciales incorrectas");
    }
    // Redirigir al proveedor según su nombre
    if (id_prov === 1) {
      return res.redirect("/loginpro/provedor/Almaguer");
    } else if (id_prov === 2) {
      return res.redirect("/loginpro/provedor/Vero");
    } else {
      // Redireccionar a una página de proveedor desconocido si el nombre no coincide con ninguno
      return res.redirect("/loginpro/provedor/desconocido");
    }
  } catch (error) {
    console.log("Error al verificar las credenciales del proveedor:", error);
    res.status(500).redirect("/error");
  }
});

// Rutas de inicio de sesión para proveedores (GET)
rutaprov.get("/provedor/Almaguer", async (req, res) => {
  try {
    const productos = await prisma.producto.findMany({
      where: {
        provedor: 1 // Cambiar según el proveedor
      }
    });
    console.log(productos);
    res.render("provedor/Almaguer/menu", { productos: productos });
  } catch (error) {
    console.log("Error al obtener los productos:", error);
    res.status(500).redirect("/error");
  }
});

rutaprov.get("/provedor/Vero", async (req, res) => {
  try {
    const productos = await prisma.producto.findMany({
      where: {
        provedor: 2 // Cambiar según el proveedor
      }
    });
    //console.log(productos);
    res.render("provedor/Vero/menu", { productos: productos });
  } catch (error) {
    console.log("Error al obtener los productos:", error);
    res.status(500).redirect("/error");
  }
});

rutaprov.get("/provedor/desconocido", (req, res) => {
  res.render("provedor/desconocido");
});

rutaprov.get("/provedor/provedor/editarProductos/:productoId", async (req, res) => {
 // console.log("dwf");
  const productoId = parseInt(req.params.productoId, 10);

  try {
    const producto = await prisma.producto.findUnique({
      where: {
        id_product: productoId, // Usa el número entero en la consulta
      },
    });

    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }

    // Verifica si el producto es vendido por el proveedor actual
    if (producto.provedor !== num_prov) {
      console.log("bbbbbbbb");
      console.log("producto.provedor"+producto.provedor);
      console.log("productoid"+productoId);
      console.log("numprov"+num_prov);
      return res.status(403).send("No tienes permiso para editar este producto");
    }

    res.render("provedor/editarProducto", { producto });
 
  } catch (error) {
    console.log("Error al obtener el producto:", error);
    res.status(500).redirect("/error");
  }
});

rutaprov.post("/provedor/provedor/editarProductos/update/:productoId", async (req, res) => {

  const productoId = parseInt(req.params.productoId, 10);

  const { nombre, descripcion, precio, ingredientes } = req.body;

  try {
    const producto = await prisma.producto.findUnique({
      where: {
        id_product: productoId,
      },
    });

    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }

    // Verifica si el producto es vendido por el proveedor actual
    if (producto.provedor !== num_prov) {
      return res.status(403).send("No tienes permiso para editar este producto");
    }

    await prisma.producto.update({
      where: {
        id_product: productoId,
      },
      data: {
        name_product: nombre,
        descrip_product: descripcion,
        ingredientes_product: ingredientes,
        precio_product: parseFloat(precio),
        // Agrega más campos para actualizar aquí
      },
    });

    res.redirect(`/loginpro/provedor/provedor/editarProductos/${productoId}`);
  } catch (error) {
    console.log("Error al actualizar el producto:", error);
    res.status(500).redirect("/error");
  }
});


module.exports = rutaprov;
