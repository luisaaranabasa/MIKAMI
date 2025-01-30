document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const menuItems = document.getElementById('menuItems');

  menuToggle.addEventListener('click', () => {
    menuItems.classList.toggle('active');
  });
});

function cambiarVideo() {
  var video = document.getElementById("homeVideo");
  var source = video.getElementsByTagName("source")[0];

  if (window.innerWidth < 768) {
      source.src = "css/media/video/homeresponsive.mp4";
  } else {
      source.src = "css/media/video/home.mp4";
  }

  video.load(); // Recarga el video con la nueva fuente
}

// Ejecutar cuando la página cargue y cuando se redimensione la ventana
window.onload = cambiarVideo;
window.onresize = cambiarVideo;

