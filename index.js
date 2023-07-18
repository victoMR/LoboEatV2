const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const session = require('express-session');
const usrRuta = require('./rutas/usuarios');

dotenv.config();

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


var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});

app.use("/", usrRuta);

