/* ============================================
   HARSHITA SHEKHAWAT – PORTFOLIO SCRIPT
============================================ */

// ---- THEME TOGGLE ----
(function () {
    const html = document.documentElement;
    const btn  = document.getElementById('themeToggle');
    const KEY  = 'portfolio-theme';

    // Apply saved or default theme
    const saved = localStorage.getItem(KEY) || 'dark';
    html.setAttribute('data-theme', saved);

    if (!btn) return;

    btn.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next    = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem(KEY, next);

        // Bounce animation on the button
        btn.style.transform = 'scale(0.85) rotate(20deg)';
        setTimeout(() => { btn.style.transform = ''; }, 300);
    });
})();

// ---- TYPEWRITER EFFECT ----
const roles = [
    'Software Developer',
    'ASP.NET Core Expert',
    'Angular Developer',
    'Full Stack Developer',
    'Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function typeWriter() {
    if (!typewriterEl) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000; // pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 300;
    }

    setTimeout(typeWriter, speed);
}

typeWriter();


// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNav();
});


// ---- MOBILE MENU TOGGLE ----
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});


// ---- ACTIVE NAV HIGHLIGHT ----
const sections = document.querySelectorAll('section[id]');
function updateActiveNav() {
    const scrollY = window.scrollY;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-item[href="#${id}"]`);
        if (navLink) {
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                document.querySelectorAll('.nav-item').forEach(l => l.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}


// ---- FADE IN ON SCROLL ----
const fadeElements = document.querySelectorAll('.timeline-card, .skill-category, .project-card, .about-grid, .contact-grid');

fadeElements.forEach(el => {
    el.classList.add('fade-in');
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, idx * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Also observe section headers
document.querySelectorAll('.section-header, .timeline-col-header, .achievements-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});


// ---- CONTACT FORM ----
const scriptURL = 'https://script.google.com/macros/s/AKfycbyNuBWCRlO42697m1OVqyl6X9_HX8AIpiccjtdsliKwSOZXGhr_iMASSre_w36kzf66zw/exec';

function handleSubmit(event) {
    event.preventDefault();

    const form = document.getElementById('contact-form');
    const loader = document.getElementById('form-loader');
    const success = document.getElementById('form-success');

    // Show loader
    form.style.display = 'none';
    loader.style.display = 'block';
    success.style.display = 'none';

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(() => {
            loader.style.display = 'none';
            success.style.display = 'block';
            form.reset();
            // Show form again after 5 seconds
            setTimeout(() => {
                success.style.display = 'none';
                form.style.display = 'block';
            }, 5000);
        })
        .catch(error => {
            loader.style.display = 'none';
            form.style.display = 'block';
            alert('Something went wrong. Please try again or email me directly at harshitashekhawat138@gmail.com');
            console.error('Error!', error.message);
        });
}


// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


// ---- CURSOR GLOW EFFECT (optional subtle effect) ----
const glow1 = document.querySelector('.hero-glow-1');
document.addEventListener('mousemove', (e) => {
    if (!glow1) return;
    const x = (e.clientX / window.innerWidth) * 20 - 10;
    const y = (e.clientY / window.innerHeight) * 20 - 10;
    glow1.style.transform = `translate(${x}px, ${y}px)`;
});