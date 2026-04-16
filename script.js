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

// ===== CONTACT FORM — Direct submit via Formsubmit.co (no mailto) =====
// Form handling shifted to native HTML Formsubmit integration.

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
const roles = ["IT & MIS Specialist", "Cybersecurity MS Candidate", "Full Stack Developer", "Data Architect", "Ethical Hacker", "Graduate Assistant at Technology Resource Center"];
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

// 4. Guided Audio Tour
const tourBtn = document.getElementById('start-tour-btn');
const profilePhoto = document.getElementById('profile-photo');
let isTourRunning = false;

const tourSegments = [
  { id: 'home', text: "Hello, and welcome to my professional portfolio. I am Shadman Ahsan, an IT and M.I.S Specialist, and Ethical Hacker." },
  { id: 'about', text: "I have over five years of experience architecting secure IT infrastructures, and driving digital transformation at leading organizations like Helen Keller International, and Sajida Foundation." },
  { id: 'experience', text: "Throughout my career, I've designed enterprise systems, managed server administration, and implemented robust security frameworks. Security by design is my core philosophy." },
  { id: 'education', text: "My academic journey includes a Master's degree in Cybersecurity from Southwest Minnesota State University, and an undergraduate degree in M.I.S from Independent University, Bangladesh." },
  { id: 'skills', text: "My technical stack is comprehensive, ranging from Python and Java to Cloud platforms like AWS and Google Cloud, along with deep expertise in network security architecture." },
  { id: 'projects', text: "My featured projects demonstrate my capability to build complex systems. This includes the Aegis cybersecurity platform, and Open-Claw Sentinel, an automated threat detection agent." },
  { id: 'contact', text: "Thank you for joining this tour. If you are looking for a dedicated and innovative tech professional, feel free to reach out through my contact section below. Have a great day!" }
];

function playTourSegment(index) {
  if (index >= tourSegments.length || !isTourRunning) {
    isTourRunning = false;
    if (tourBtn) tourBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>Audio Tour';
    const wrapper = profilePhoto ? profilePhoto.closest('.image-wrapper') : null;
    if (wrapper) wrapper.style.boxShadow = '';
    return;
  }
  
  const segment = tourSegments[index];
  const targetEl = document.getElementById(segment.id);
  
  if (targetEl) {
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const originalShadow = targetEl.style.boxShadow;
    targetEl.style.boxShadow = '0 0 60px rgba(37,99,235,0.3)';
    targetEl.style.transition = 'box-shadow 1s';
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(segment.text);
      msg.rate = 0.95;
      msg.pitch = 1.05; // Slightly higher pitch for clarity
      
      // Auto-select the most natural English voice available
      const voices = window.speechSynthesis.getVoices();
      let bestVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Google UK English Male')) || 
                      voices.find(v => v.name.includes('Natural') || v.name.includes('Premium')) ||
                      voices.find(v => v.name.includes('Mark') || v.name.includes('Samantha')) ||
                      voices.find(v => v.lang === 'en-US' || v.lang === 'en-GB');
                      
      if (bestVoice) msg.voice = bestVoice;
      
      msg.onend = () => {
        targetEl.style.boxShadow = originalShadow;
        setTimeout(() => playTourSegment(index + 1), 800);
      };
      msg.onerror = () => playTourSegment(index + 1);
      
      window.speechSynthesis.speak(msg);
    } else {
      setTimeout(() => playTourSegment(index + 1), 4000);
    }
  } else {
    playTourSegment(index + 1);
  }
}

function startAudioTour() {
  if (!('speechSynthesis' in window)) return alert("Your browser doesn't support Text to Speech.");
  if (isTourRunning) {
    window.speechSynthesis.cancel();
    isTourRunning = false;
    if (tourBtn) tourBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>Audio Tour';
    const wrapper = profilePhoto ? profilePhoto.closest('.image-wrapper') : null;
    if (wrapper) wrapper.style.boxShadow = '';
    return;
  }
  
  isTourRunning = true;
  if (tourBtn) tourBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px;"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>Stop Tour';
  const wrapper = profilePhoto ? profilePhoto.closest('.image-wrapper') : null;
  if (wrapper) wrapper.style.boxShadow = '0 0 100px #2563EB, inset 0 0 50px #2563EB';
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => playTourSegment(0), 1000);
}

if (tourBtn) tourBtn.addEventListener('click', startAudioTour);
if (profilePhoto) {
  profilePhoto.style.cursor = 'pointer';
  profilePhoto.addEventListener('click', startAudioTour);
}

// Close mobile navbar on link click
document.querySelectorAll('.nav-links a').forEach(link => { link.addEventListener('click', () => { document.querySelector('.nav-links').classList.remove('open'); }); });

// ===== 6. THEME MANAGER (Antigravity Toggle) =====
const themeToggle = document.getElementById('theme-toggle');

function setTheme(isLight) {
  const pulseSpan = document.querySelector('.sp-pulse');
  const detailDiv = document.querySelector('.sp-detail');

  if (isLight) {
    document.documentElement.classList.add('light-mode');
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    if (pulseSpan) pulseSpan.innerText = 'NOMINAL';
    if (detailDiv) detailDiv.innerText = '[SYSTEM STABILIZED]';
  } else {
    document.documentElement.classList.remove('light-mode');
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    if (pulseSpan) pulseSpan.innerText = 'ENGAGED';
    if (detailDiv) detailDiv.innerHTML = '[STATUS: ACTIVE - <span id="sp-val">85</span>% LIFT]';
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentlyLight = document.documentElement.classList.contains('light-mode');
    setTheme(!currentlyLight);
  });
  
  // Hydrate text based on FOUC pre-load state
  const isPreloadedLight = document.documentElement.classList.contains('light-mode');
  if (isPreloadedLight) setTheme(true);
}
