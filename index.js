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
    secret:process.env.SECRETO_SESSION,
    resave:true,
    saveUninitialized:true
}));

app.use("/",usrRuta);
  

var port=process.env.PORT || 3000;

app.listen(port,() => {
    console.log(`Servidor en http://localhost:${port}`);
});

