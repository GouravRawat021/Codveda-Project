document.addEventListener('DOMContentLoaded', function () {

  // Mobile navigation toggle
  let hamburger = document.getElementById('hamburger');
  let navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    
    let isOpen = navLinks.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  let navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Smooth scrolling with sticky header offset
  let anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      let targetId = link.getAttribute('href');
      if (targetId === '#') return;

      let targetElement = document.querySelector(targetId);

      if (targetElement) {
        event.preventDefault();
        
        let headerOffset = 70;
        let elementPosition = targetElement.getBoundingClientRect().top;
        let scrollPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Basic form submission handler
  let form = document.getElementById('contact-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    let emailInput = document.getElementById('email');
    
    form.innerHTML =
      '<p style="color: #16a34a; font-weight: 600; font-size: 1.1rem;">' +
      '✅ Thanks! We\'ll send your guide to ' + emailInput.value +
      '</p>';
  });
});
