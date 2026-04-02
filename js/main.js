// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navBtn = document.getElementById('navBtn');

if (navToggle) {
  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    navBtn.classList.toggle('active');
  });
}

// ===== Sticky navbar: transparent → solid on scroll =====
const navbar = document.getElementById('navbar');

if (navbar) {
  function handleNavScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();
}

// ===== Parallax background sections =====
const parallaxSections = document.querySelectorAll('.parallax-section');

function updateParallax() {
  parallaxSections.forEach(function (section) {
    const bg = section.querySelector('.parallax-bg');
    if (!bg) return;
    const rect = section.getBoundingClientRect();
    const viewH = window.innerHeight;
    // Only animate when section is in or near view
    if (rect.bottom < 0 || rect.top > viewH) return;
    const progress = (viewH - rect.top) / (viewH + rect.height);
    const offset = (progress - 0.5) * 80; // ±40px travel
    bg.style.transform = 'translate3d(0, ' + offset + 'px, 0)';
  });
}

if (parallaxSections.length) {
  window.addEventListener('scroll', updateParallax, { passive: true });
  window.addEventListener('resize', updateParallax, { passive: true });
  updateParallax();
}

// ===== Scroll reveal: elements fade up into view =====
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(function (el) {
  revealObserver.observe(el);
});

// ===== Image fade-in on load =====
document.querySelectorAll('img').forEach(function (img) {
  if (img.complete) {
    img.classList.add('img-loaded');
  } else {
    img.addEventListener('load', function () {
      img.classList.add('img-loaded');
    });
  }
});
