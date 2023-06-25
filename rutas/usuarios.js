var ruta=require("express").Router();

ruta.get("/",(req,res) => {
    res.render("login");
});
ruta.get("/inicio",(req,res) => {
    res.render("inicio");
});
ruta.post("/inicio", (req, res) => {
  const { login, password } = req.body;
  const passwordRegex = /^(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{10,}$/;
 //LoboEat@2023 is a example

  if (login === "2022143069" && passwordRegex.test(password)) {
    res.render("inicio");
    console.log("God requests ");
  } else if (password.length < 8) {
    res.status(400).send('<script>alert("La contraseña debe tener al menos 10 caracteres."); window.location.href = "/login";</script>');
  } else if (!passwordRegex.test(password)) {
    res.status(400).send('<script>alert("La contraseña debe contener al menos un carácter especial."); window.location.href = "/login";</script>');
  } else {
    console.log("error");
    // Aquí puedes redirigir al usuario a una página de error o mostrar un mensaje de error en la página de inicio de sesión.
    res.status(400).send('<script>alert("Credenciales incorrectas, comunícate con el SIIC."); window.open("https://www.utsjr.edu.mx/", "_blank");</script>');
    console.log("Bad request come to siic");
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
module.exports = ruta;