/**
 * Theme management for DialogueX
 * Handles dark/light mode toggle with localStorage persistence
 */

class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        // Load saved theme or default to dark
        const savedTheme = localStorage.getItem('dialoguex-theme') || 'dark';
        this.setTheme(savedTheme);
        
        // Set up theme toggle button
        this.setupThemeToggle();
    }

    setTheme(theme) {
        const html = document.documentElement;
        const lightIcon = document.getElementById('theme-icon-light');
        const darkIcon = document.getElementById('theme-icon-dark');
        
        if (theme === 'dark') {
            html.classList.add('dark');
            html.classList.remove('light');
            if (lightIcon) lightIcon.classList.remove('hidden');
            if (darkIcon) darkIcon.classList.add('hidden');
        } else {
            html.classList.remove('dark');
            html.classList.add('light');
            if (lightIcon) lightIcon.classList.add('hidden');
            if (darkIcon) darkIcon.classList.remove('hidden');
        }
        
        // Save theme preference
        localStorage.setItem('dialoguex-theme', theme);
        
        // Dispatch theme change event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }

    toggleTheme() {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    getCurrentTheme() {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});

// Also initialize immediately in case script is loaded after DOM
if (document.readyState === 'loading') {
    // DOM is still loading
} else {
    // DOM is already loaded
    window.themeManager = new ThemeManager();
}