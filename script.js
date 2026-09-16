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
    'SMSU · Helen Keller Int\'l · Sajida Foundation · Accomium',
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
const roles = [
  "IT & MIS Specialist 💻",
  "Cybersecurity MS Candidate 🛡️",
  "Full Stack Developer 🚀",
  "Data Infrastructure Architect 🏗️",
  "Ethical Hacker 🔐",
  "Strategic Gamer 🎮",
  "Musical Beat Explorer 🎧",
  "Cinematic Storyteller 🎬"
];
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

// 4. Guided Audio Tour (Natural Human Male Voice)
const tourBtn = document.getElementById('start-tour-btn');
const profilePhoto = document.getElementById('profile-photo');
let isTourRunning = false;
let currentTourAudio = null;

const tourSegments = [
  { id: 'home', audio: 'assets/audio/tour_home.mp3', text: "Hello, and welcome to my professional portfolio. I am Shadman Ahsan, an Enterprise Systems, DevOps, and Full-Stack Software Engineer." },
  { id: 'about', audio: 'assets/audio/tour_about.mp3', text: "I have over five years of experience architecting secure IT infrastructures and driving digital transformation at leading organizations like Southwest Minnesota State University, Helen Keller International, and Sajida Foundation." },
  { id: 'experience', audio: 'assets/audio/tour_experience.mp3', text: "Throughout my career, I've designed enterprise systems, managed server administration, and implemented robust security frameworks. Security by design is my core philosophy." },
  { id: 'skills', audio: 'assets/audio/tour_skills.mp3', text: "My technical stack is comprehensive, ranging from Python, TypeScript, and FastAPI to Cloud platforms like Kubernetes, Docker, and Google Cloud, along with deep expertise in network security architecture." },
  { id: 'projects', audio: 'assets/audio/tour_projects.mp3', text: "My featured projects demonstrate my capability to build complex systems. This includes enterprise platforms, full-stack applications, and automated cybersecurity tools." },
  { id: 'education', audio: 'assets/audio/tour_education.mp3', text: "My academic background includes a Master of Science in Cybersecurity from Southwest Minnesota State University, and a Bachelor's degree in Computer Science and Engineering from Independent University, Bangladesh." },
  { id: 'contact', audio: 'assets/audio/tour_contact.mp3', text: "Thank you for joining this tour. If you are looking for a dedicated and innovative tech professional, feel free to reach out through my contact section below. Have a great day!" }
];

function stopCurrentTourAudio() {
  if (currentTourAudio) {
    try {
      currentTourAudio.pause();
      currentTourAudio.currentTime = 0;
    } catch (e) {}
    currentTourAudio = null;
  }
  if ('speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
}

function playTourSegment(index) {
  if (index >= tourSegments.length || !isTourRunning) {
    isTourRunning = false;
    stopCurrentTourAudio();
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
    targetEl.style.boxShadow = '0 0 60px rgba(37,99,235,0.35)';
    targetEl.style.transition = 'box-shadow 1s';

    const onSegmentFinished = () => {
      targetEl.style.boxShadow = originalShadow;
      if (isTourRunning) {
        setTimeout(() => playTourSegment(index + 1), 600);
      }
    };

    stopCurrentTourAudio();

    // 1. Primary: High-fidelity natural human male studio audio
    const audio = new Audio(segment.audio);
    currentTourAudio = audio;

    audio.onended = () => {
      currentTourAudio = null;
      onSegmentFinished();
    };

    const fallbackToSpeechSynthesis = () => {
      currentTourAudio = null;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(segment.text);
        
        const setMaleVoice = () => {
          const voices = window.speechSynthesis.getVoices();
          // Strictly select authentic Male voices
          const maleVoice = voices.find(v => 
            (v.name.includes('Natural') || v.name.includes('Neural')) && 
            (v.name.includes('Guy') || v.name.includes('Christopher') || v.name.includes('Eric') || v.name.includes('Brian') || v.name.includes('David') || v.name.includes('Mark'))
          ) || voices.find(v => 
            v.name.includes('Google UK English Male') || 
            v.name.includes('Microsoft David') || 
            v.name.includes('Microsoft Mark') || 
            v.name.includes('Daniel') || 
            v.name.includes('Oliver') ||
            (v.name.toLowerCase().includes('male') && !v.name.toLowerCase().includes('female'))
          );

          if (maleVoice) msg.voice = maleVoice;
          msg.rate = 0.94;
          msg.pitch = 0.92; // Natural, warm human male pitch
        };

        if (window.speechSynthesis.getVoices().length > 0) {
          setMaleVoice();
        } else {
          window.speechSynthesis.onvoiceschanged = setMaleVoice;
        }

        msg.onend = onSegmentFinished;
        msg.onerror = onSegmentFinished;
        window.speechSynthesis.speak(msg);
      } else {
        setTimeout(onSegmentFinished, 4000);
      }
    };

    audio.onerror = fallbackToSpeechSynthesis;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        fallbackToSpeechSynthesis();
      });
    }
  } else {
    playTourSegment(index + 1);
  }
}

function startAudioTour() {
  if (isTourRunning) {
    isTourRunning = false;
    stopCurrentTourAudio();
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
  setTimeout(() => playTourSegment(0), 600);
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
  if (isLight) {
    document.documentElement.classList.add('light-mode');
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.remove('light-mode');
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentlyLight = document.documentElement.classList.contains('light-mode');
    setTheme(!currentlyLight);
  });
  
  // Hydrate text based on FOUC pre-load state
  const isPreloadedDark = document.documentElement.classList.contains('dark-mode');
  setTheme(!isPreloadedDark);
}
