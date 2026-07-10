const scrollToTopBtn = document.getElementById("floraScrollBtn");

// Show/hide button based on scroll position
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("is-visible");
  } else {
    scrollToTopBtn.classList.remove("is-visible");
  }
});

// Handle scroll to top when button is clicked
scrollToTopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
