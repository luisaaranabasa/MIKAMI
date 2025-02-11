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
