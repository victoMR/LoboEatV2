var multer = require('multer');

function subirArchivo() {
  var storage = multer.diskStorage({
    destination: './web/images',
    filename: function (req, file, cb) {
      var archivo = file.originalname;
      cb(null, archivo);
    }
  });

  const upload = multer({ storage });

  // Devuelve la función que configura el middleware
  return upload.single('imagen');
}

module.exports = subirArchivo;
