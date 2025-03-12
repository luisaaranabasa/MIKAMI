document.addEventListener("DOMContentLoaded", function () {
  /* ============================================
     Función para animar un contador individual
  ============================================ */
  function animateCounter(counter) {
      if (counter.getAttribute("data-animated") === "true") return;
      counter.setAttribute("data-animated", "true");

      counter.innerText = '0';
      const target = +counter.getAttribute('data-target');

      const updateCounter = () => {
          const current = +counter.innerText;
          const increment = target / 200;
          if (current < target) {
              counter.innerText = Math.ceil(current + increment);
              setTimeout(updateCounter, 50);
          } else {
              counter.innerText = target;
          }
      };
      updateCounter();
  }

  /* =====================================================
     Intersection Observer para iniciar la animación
  ===================================================== */
  const counters = document.querySelectorAll('.counter');
  const observerOptions = { root: null, threshold: 0.5 };
  
  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              setTimeout(() => {
                  animateCounter(entry.target);
                  observer.unobserve(entry.target);
              }, 500);
          }
      });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));

  /* ============================================
     Menú hamburguesa
  ============================================ */
  const menuToggle = document.getElementById("menuToggle");
  const menuItems = document.getElementById("menuItems");
  if (menuToggle && menuItems) {
      menuToggle.addEventListener("click", function () {
          menuItems.classList.toggle("active");
          menuToggle.classList.toggle("active");
      });
  }

  /* ============================================
     Funciones para expandir y colapsar los cards
  ============================================ */
  const cards = document.querySelectorAll(".servicio-card");
  const collapseBtnContainer = document.getElementById("collapseBtnContainer");

  function expandCard(cardId) {
      cards.forEach(function (card) {
          if (card.getAttribute("data-card") !== cardId) {
              card.style.display = "none";
          } else {
              card.classList.add("expanded");
              card.classList.remove("col-md-4");
              card.classList.add("col-12");
              card.style.margin = "0 auto";
          }
      });
      if (collapseBtnContainer) {
          collapseBtnContainer.style.display = "block";
      }
  }

  function collapseCards() {
      cards.forEach(function (card) {
          card.style.display = "block";
          card.classList.remove("expanded");
          card.classList.remove("col-12");
          card.classList.add("col-md-4");
          card.style.margin = "";
      });
      if (collapseBtnContainer) {
          collapseBtnContainer.style.display = "none";
      }
  }

  // Asignar eventos globales para HTML
  window.expandCard = expandCard;
  window.collapseCards = collapseCards;

  // Cerrar card al hacer clic fuera del área expandida
  document.addEventListener("click", function (event) {
      const expandedCard = document.querySelector(".servicio-card.expanded");
      if (expandedCard && !expandedCard.contains(event.target) && !event.target.closest(".servicio-card")) {
          collapseCards();
      }
  });

  // Asegurar que el botón de colapsar existe antes de asignarle el evento
  const closeButton = document.querySelector(".btn-secondary");
  if (closeButton) {
      closeButton.addEventListener("click", collapseCards);
  }
});

const translations = {
    "es": {
        "about": "SOBRE MÍ",
        "method": "METODOLOGÍA",
        "services": "SERVICIOS",
        "intro-title": "TODO EMPIEZA EN TI",
        "intro-subtitle": "Comunica para conectar, influir y liderar.",
        "discover-title": "DESCUBRE TU VERDADERA VOZ",
        "discover-subtitle": "COMUNICA CON PROPÓSITO",
        "discover-text": "Transforma tu manera de comunicar y conecta con los demás desde tu esencia...",
        "start-now": "EMPIEZA AHORA"
    },
    "en": {
        "about": "ABOUT ME",
        "method": "METHODOLOGY",
        "services": "SERVICES",
        "intro-title": "EVERYTHING STARTS WITH YOU",
        "intro-subtitle": "Communicate to connect, influence, and lead.",
        "discover-title": "DISCOVER YOUR TRUE VOICE",
        "discover-subtitle": "COMMUNICATE WITH PURPOSE",
        "discover-text": "Transform the way you communicate and connect with others from your essence...",
        "start-now": "START NOW"
    }
};

let currentLang = "es";

document.getElementById("lang-toggle").addEventListener("click", function () {
    currentLang = currentLang === "es" ? "en" : "es";
    this.textContent = currentLang === "es" ? "EN" : "ES";
    document.documentElement.lang = currentLang;
    document.querySelectorAll("[data-translate]").forEach(el => {
        el.textContent = translations[currentLang][el.dataset.translate];
    });
});
