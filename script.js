// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-text, .portfolio-btn, .contact-link').forEach(el => {
    observer.observe(el);
});

// Cursor Trail Effect (Optional)
let mouseX = 0;
let mouseY = 0;
let trailElements = [];

// Create trail elements
for (let i = 0; i < 5; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, #ffd700, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(trail);
    trailElements.push(trail);
}

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    trailElements.forEach((trail, index) => {
        setTimeout(() => {
            trail.style.left = mouseX + 'px';
            trail.style.top = mouseY + 'px';
            trail.style.opacity = (5 - index) / 5;
        }, index * 50);
    });
});

// Parallax Effect for Floating Elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-star, .floating-moon, .floating-sparkle');
    
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.1;
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add shimmer effect to CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    setInterval(() => {
        ctaButton.style.background = 'linear-gradient(45deg, #ffd700, #ffed4e, #ffd700, #ffed4e)';
        ctaButton.style.backgroundSize = '200% 200%';
        ctaButton.style.animation = 'shimmer 2s ease-in-out infinite';
    }, 3000);
}

// Add CSS for shimmer animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            height: calc(100vh - 80px);
            background: rgba(253, 252, 250, 0.98);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            backdrop-filter: blur(10px);
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);