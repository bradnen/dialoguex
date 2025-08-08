/**
 * Main JavaScript for DialogueX landing page
 * Handles smooth scrolling, animations, and interactions
 */

class LandingPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupAnimationObserver();
        this.setupInteractions();
    }

    setupSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupAnimationObserver() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        document.querySelectorAll('.bg-white\\/50, .bg-white').forEach(el => {
            observer.observe(el);
        });
    }

    setupInteractions() {
        // Add hover effects to feature cards
        document.querySelectorAll('.bg-white\\/50, .bg-white').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-2px)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // Add click tracking for CTA buttons
        document.querySelectorAll('a[href="chat.html"]').forEach(button => {
            button.addEventListener('click', () => {
                // Track CTA click (could be used for analytics)
                console.log('CTA clicked: Start Chatting');
            });
        });

        // Add parallax effect to background elements
        this.setupParallax();
    }

    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const backgroundElements = document.querySelectorAll('.absolute.w-80.h-80');
            
            backgroundElements.forEach((element, index) => {
                const speed = 0.2 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Utility method to show notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
        
        switch (type) {
            case 'success':
                notification.className += ' bg-green-500 text-white';
                break;
            case 'error':
                notification.className += ' bg-red-500 text-white';
                break;
            default:
                notification.className += ' bg-blue-500 text-white';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Slide in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Slide out and remove
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Enhanced loading animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize landing page functionality
    window.landingPage = new LandingPage();
    
    // Add staggered animation to feature cards
    const featureCards = document.querySelectorAll('.grid .bg-white\\/50, .grid .bg-white');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-slide-up');
    });
    
    // Add typing effect to the main headline
    const headline = document.querySelector('h1');
    if (headline) {
        // Store original text
        const originalText = headline.innerHTML;
        headline.innerHTML = '';
        
        // Type out the text
        let charIndex = 0;
        const typingSpeed = 30;
        
        function typeChar() {
            if (charIndex < originalText.length) {
                headline.innerHTML = originalText.slice(0, charIndex + 1);
                charIndex++;
                setTimeout(typeChar, typingSpeed);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeChar, 500);
    }
});

// Add some visual polish
window.addEventListener('load', () => {
    // Fade in the page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Add floating animation to logo
    const logo = document.querySelector('.w-8.h-8.bg-gradient-to-r');
    if (logo) {
        logo.style.animation = 'float 3s ease-in-out infinite';
    }
});

// Add custom CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
    }
    
    @keyframes typewriter {
        from { width: 0; }
        to { width: 100%; }
    }
`;
document.head.appendChild(style);