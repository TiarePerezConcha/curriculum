// Main Interactive Logic for Tiare Pérez Concha Portfolio

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileMenu();
});

// --- Theme Switcher (Light / Dark Mode) ---
function initThemeToggle() {
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    const htmlElement = document.documentElement;

    // Load saved theme preference or default to Dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        htmlElement.classList.remove('dark');
        updateToggleIcons('light');
    } else {
        htmlElement.classList.add('dark');
        updateToggleIcons('dark');
    }

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                updateToggleIcons('light');
            } else {
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                updateToggleIcons('dark');
            }
        });
    });
}

function updateToggleIcons(currentTheme) {
    const icons = document.querySelectorAll('.theme-toggle-btn i');
    const labels = document.querySelectorAll('.theme-toggle-btn .theme-label');

    icons.forEach(icon => {
        if (currentTheme === 'dark') {
            icon.className = 'fa-solid fa-sun text-amber-400';
        } else {
            icon.className = 'fa-solid fa-moon text-indigo-600';
        }
    });

    labels.forEach(label => {
        if (currentTheme === 'dark') {
            label.textContent = 'Modo Claro';
        } else {
            label.textContent = 'Modo Oscuro';
        }
    });
}

// --- Mobile Navigation Menu ---
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu on link click
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}
