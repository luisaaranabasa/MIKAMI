document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const menuItems = document.getElementById('menuItems');

  menuToggle.addEventListener('click', () => {
    menuItems.classList.toggle('active');
  });
});