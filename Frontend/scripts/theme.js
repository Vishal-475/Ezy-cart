// Initialize and control light/dark theme
(function () {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    document.addEventListener('DOMContentLoaded', () => {
        const headerNav = document.querySelector('header nav');
        if (!headerNav) return;

        // Create toggle button if not already present
        let themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) {
            themeToggle = document.createElement('button');
            themeToggle.id = 'theme-toggle';
            themeToggle.style.cssText = `
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 1.2rem;
                padding: 0 10px;
                display: flex;
                align-items: center;
                transition: transform 0.2s;
            `;
            // Insert toggle button at the start of navigation
            headerNav.insertBefore(themeToggle, headerNav.firstChild);
        }

        // Create Mobile Menu Toggle if not present
        let menuToggle = document.getElementById('mobile-menu-toggle');
        if (!menuToggle) {
            menuToggle = document.createElement('button');
            menuToggle.id = 'mobile-menu-toggle';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.className = 'mobile-menu-toggle';
            
            // Insert before the nav
            headerNav.parentNode.insertBefore(menuToggle, headerNav);

            menuToggle.addEventListener('click', () => {
                headerNav.classList.toggle('nav-open');
                if (headerNav.classList.contains('nav-open')) {
                    menuToggle.innerHTML = '<i class="fas fa-times"></i>';
                } else {
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        }

        // Set initial icon
        themeToggle.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';

        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
            themeToggle.style.transform = 'scale(1.2)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 200);
            
            // Dispatch event for other listeners (e.g. charts)
            window.dispatchEvent(new Event('themeChanged'));
        });
    });
})();

// Register Service Worker for PWA Support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => console.log('ServiceWorker registration successful'))
            .catch(err => console.log('ServiceWorker registration failed: ', err));
    });
}
