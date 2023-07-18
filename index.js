var express = require("express");
var path = require("path");
var session= require("express-session");
var usrRuta= require("./rutas/usuarios");
require("dotenv").config();

var app = express();
app.set('view engine', 'ejs');
app.use("/web", express.static(path.join(__dirname,"/web")));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(session({
    secret: process.env.SECRETO_SESSION,
    resave: true,
    saveUninitialized: true
}));

function findAvailablePort(ports, callback) {
  if (ports.length === 0) {
    throw new Error('No available ports found');
  }

  var port = ports.shift();
  app.listen(port, function(error) {
    if (error && error.code === 'EADDRINUSE') {
      findAvailablePort(ports, callback);
    } else {
      callback(port);
    }
  });
}

var portSequence = [8000, 8001, 8002, 8003, 8004, 8005];

findAvailablePort(portSequence, function(port) {
  console.log(`Servidor en http://localhost:${port}`);
});

app.use("/", usrRuta);

