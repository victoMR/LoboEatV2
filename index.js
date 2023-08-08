// This code snippet sets up an Express server with various middleware and routes. It configures the view engine, sets up static file serving, parses request bodies, configures session middleware, and listens on a specified port.
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const carritoRouter = require("./rutas/carrito");
const methodOverride = require("method-override");
const rutaProvedor = require("./rutas/provedores");
const $ = require("jquery");


dotenv.config();

const app = express();
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.use("/web", express.static(path.join(__dirname, "/web")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configura el middleware de sesiones antes de las rutas
app.use(
  session({
    secret: process.env.SECRETO_SESSION,
    resave: true,
    saveUninitialized: true,
  })
);

// Importa las rutas después de configurar el middleware de sesiones
const usrRuta = require("./rutas/usuarios");
app.use(carritoRouter); // Use the router directly, not the router property
app.use("/", usrRuta);

//Provedor
app.use("/loginpro", rutaProvedor);


var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
