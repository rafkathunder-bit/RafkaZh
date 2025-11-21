// Elements
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const toggleBtn = document.querySelector('.mode-toggle');
const body = document.body;
const nav = document.getElementById('primary-navigation');

// Initialize dark mode from localStorage
const saved = localStorage.getItem('prefers-dark');
if (saved === 'true') {
    body.classList.add('dark');
    if (toggleBtn) toggleBtn.textContent = '☀️';
}

// Toggle dark mode
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark');
        localStorage.setItem('prefers-dark', isDark);
        toggleBtn.textContent = isDark ? '☀️' : '🌙';
        toggleBtn.setAttribute('aria-pressed', String(isDark));
    });
}

// Burger open/close
function setNavOpen(open) {
    if (open) {
        navLinks.classList.add('open');
        burger.classList.add('open');
        burger.setAttribute('aria-expanded','true');
    } else {
        navLinks.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded','false');
    }
}

burger.addEventListener('click', () => {
    setNavOpen(!navLinks.classList.contains('open'));
});

// Close nav when a link is clicked (mobile)
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => setNavOpen(false));
});

// Close nav on ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setNavOpen(false);
});

// Small enhancement: allow customizing the displayed name via query param ?name=...
try {
    const params = new URLSearchParams(location.search);
    const name = params.get('name');
    if (name) document.getElementById('name').textContent = name;
} catch (e) {}
