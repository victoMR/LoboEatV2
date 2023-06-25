var express = require("express");
var path = require("path");
var session= require("express-session");
var usrRuta= require("./rutas/usuarios");

var app = express();
app.set('view engine', 'ejs');
app.use("/web", express.static(path.join(__dirname,"/web")));
app.use(express.urlencoded({ extended:false }));

app.use(express.json());

app.use(session({
    secret:"vbgrntmyjgnhbserjydtmj67k68l7itmtnw546u5ejyrnbsnhmuke5764esthgsbdfagwy53q64w35arhdsgbath4wyj7465aewrghtejry",
    resave:true,
    saveUninitialized:true
}));

app.use("/",usrRuta);
  

var port=process.env.PORT || 3000;

app.listen(port,() => {
    console.log(`Servidor en http://localhost:${port}`);
});

