/* ===== JS ===== */

// ===== PROJECT FILTERS =====
document.querySelectorAll('.pf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('#projects-grid .project-card').forEach(card => {
      const cats = (card.dataset.category || '').split(' ');
      if (filter === 'all' || cats.includes(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== REVEAL ON SCROLL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navAnchors.forEach(a => {
    a.classList.remove('active-nav');
    if (a.getAttribute('href') === `#${current}`) a.classList.add('active-nav');
  });
});

// ===== CERTIFICATION TABS =====
const tabs = document.querySelectorAll('.cert-tab');
const panels = document.querySelectorAll('.cert-panel');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
  });
});

// ===== CONTACT FORM (mailto fallback) =====
function handleForm(e) {
  e.preventDefault();
  const name = document.getElementById('cf-name').value;
  const email = document.getElementById('cf-email').value;
  const subject = document.getElementById('cf-subject').value || 'Portfolio Contact';
  const message = document.getElementById('cf-message').value;
  const feedback = document.getElementById('form-feedback');

  const mailto = `mailto:shadman_ahsan@yahoo.com?subject=${encodeURIComponent(subject + ' — from ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
  window.location.href = mailto;

  feedback.textContent = '✅ Opening your email client... Thank you!';
  setTimeout(() => feedback.textContent = '', 5000);
}

// ===== SMOOTH HERO PARALLAX =====
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  const heroImage = document.querySelector('.hero-image');
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
    heroContent.style.opacity = 1 - scrolled / window.innerHeight;
    heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});

// ===== SKILL TAG HOVER RIPPLE =====
document.querySelectorAll('.skill-tags span').forEach(tag => {
  tag.addEventListener('mouseover', function () {
    this.style.transform = 'scale(1.05)';
  });
  tag.addEventListener('mouseout', function () {
    this.style.transform = 'scale(1)';
  });
});

// ===== YEAR IN FOOTER =====
const yr = document.querySelector('.footer-bottom p');
if (yr) yr.textContent = yr.textContent.replace('2025', new Date().getFullYear());

// ===== TYPING EFFECT FOR HERO SUBTITLE =====
const subtitleEl = document.querySelector('.hero-subtitle');
if (subtitleEl) {
  const texts = [
    'IT & MIS Specialist · Cybersecurity MS Candidate · Full Stack Developer',
    'Supporting 200+ Users · 5+ Years Experience · Marshall, MN',
    'Helen Keller Int\'l · Sajida Foundation · Accomium',
  ];
  let textIdx = 0;
  setInterval(() => {
    textIdx = (textIdx + 1) % texts.length;
    subtitleEl.style.opacity = '0';
    setTimeout(() => {
      subtitleEl.textContent = texts[textIdx];
      subtitleEl.style.opacity = '1';
    }, 400);
  }, 3500);
  subtitleEl.style.transition = 'opacity 0.4s ease';
}

// ===== STAT COUNT-UP ANIMATION =====
function animateCount(el, target, duration = 1200) {
  const start = performance.now();
  const isPlus = el.textContent.includes('+');
  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = Math.floor(eased * target);
    el.textContent = val + (isPlus ? '+' : '');
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.textContent.replace('+', '').trim();
      animateCount(el, parseInt(raw));
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => statObserver.observe(el));

/* ===========================
   PREMIUM UX ANIMATIONS
=========================== */

// 1. Scroll Progress Bar
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const progressBar = document.getElementById('scroll-progress');
  if(progressBar) progressBar.style.width = scrolled + '%';
});

// 2. Dynamic Cursor Glow
const cursorGlow = document.getElementById('cursor-glow');
if(cursorGlow) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
}

// 3. Typewriter Effect
const roles = ["IT & MIS Specialist", "Cybersecurity MS Candidate", "Full Stack Developer", "Data Architect", "Graduate Assistant at Technology Resource Center"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeWriterElement = document.getElementById('typewriter');

function typeWriter() {
  if(!typeWriterElement) return;
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typeWriterElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeWriterElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000; // Pause at end of word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500; // Pause before new word
  }
  
  setTimeout(typeWriter, typeSpeed);
}
document.addEventListener('DOMContentLoaded', typeWriter);
