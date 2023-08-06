// Requerimientos de librerias de npm ----------------------------------------------------------------
const { PrismaClient } = require("@prisma/client");
const ua = require("universal-analytics");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
var ruta = require("express").Router();
const dotenv = require("dotenv");

dotenv.config();

// Ruta principal ----------------------------------------------------------------
ruta.get("/", (req, res) => {
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

// Ruta de inicio de sesión para proveedores
ruta.get("/loginpro", (req, res) => {
  res.render("loginpro");
});

// Ruta de incercion de nuevo proveedor a la base
