/* ============================================================
   WhiteCrest Immigration — Main Script
   ============================================================ */

(function () {
  'use strict';

  /* ------- Sticky header ------- */
  const header = document.getElementById('site-header');
  let lastScroll = 0;

  function handleScroll() {
    const currentScroll = window.scrollY;
    header.classList.toggle('scrolled', currentScroll > 40);

    // Hide header on scroll-down, show on scroll-up (mobile feel)
    if (currentScroll > 600) {
      header.classList.toggle('header-hidden', currentScroll > lastScroll);
    } else {
      header.classList.remove('header-hidden');
    }
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ------- Mobile nav toggle ------- */
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('main-nav');

  toggle.addEventListener('click', function () {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
    document.body.classList.toggle('nav-open');
  });

  // Close mobile nav on link click
  nav.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    });
  });

  /* ------- Smooth scroll for anchor links ------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = header.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ------- Scroll-reveal animation ------- */
  const revealElements = document.querySelectorAll(
    '.service-card, .why-card, .process-step, .testimonial-card, .about-content, .about-image, .contact-info, .contact-form-wrapper, .faq-item'
  );

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(function (el) {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  /* ------- FAQ accordion (toggle open) ------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (this.open) {
        // Close other open items
        document.querySelectorAll('.faq-item[open]').forEach(function (other) {
          if (other !== item) other.removeAttribute('open');
        });
      }
    });
  });

  /* ------- Contact form (UI-only) ------- */
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Thank you! We will be in touch.';
    btn.disabled = true;
    btn.classList.add('btn-success');
    setTimeout(function () {
      btn.textContent = originalText;
      btn.disabled = false;
      btn.classList.remove('btn-success');
      form.reset();
    }, 4000);
  });

  /* ------- Active nav highlight ------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNav() {
    const scrollPos = window.scrollY + header.offsetHeight + 100;
    sections.forEach(function (section) {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector('.nav-link[href="#' + id + '"]');
      if (link) {
        link.classList.toggle('active', scrollPos >= top && scrollPos < bottom);
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();
})();
