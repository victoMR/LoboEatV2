
  // Inicializar el carrusel de Owl Carousel
  $(document).ready(function () {
    $(".provider-container").owlCarousel({
      items: 1,
      loop: true,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 3000, // Ajusta el tiempo entre las imágenes (3 segundos en este ejemplo)
      autoplayHoverPause: true,
      responsive: {
        1024: {
          items: 1, // Mostrar solo 1 imagen a partir de 1024px de ancho (no se aplicará en esta sección)
        },
        0: {
          items: 1, // Mostrar solo 1 imagen en dispositivos móviles (hasta 1023px de ancho)
        },
      },
    });
  });
  
