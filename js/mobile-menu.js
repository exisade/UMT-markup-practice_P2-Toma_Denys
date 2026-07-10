const menuBtnRef = document.querySelector('[data-menu-button]');
const mobileMenuRef = document.querySelector('[data-menu]');
const menuLinks = mobileMenuRef.querySelectorAll('a, button');

// Toggle mobile menu and update accessibility state
const toggleMenu = () => {
  const expanded = menuBtnRef.getAttribute('aria-expanded') === 'true' || false;

  menuBtnRef.classList.toggle('is-active');
  menuBtnRef.setAttribute('aria-expanded', !expanded);

  mobileMenuRef.classList.toggle('is-active');
  document.body.classList.toggle('floraMenuOpen');
};

// Toggle menu when menu button is clicked
menuBtnRef.addEventListener('click', toggleMenu);

// Close menu when a link is clicked - prevents menu from staying open after navigation
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenuRef.classList.contains('is-active')) {
      toggleMenu();
    }
  });
});
