// JavaScript for Dynamic AI Whitepaper Website

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// AOS (Animate On Scroll) Implementation
class AOSAnimations {
    constructor() {
        this.animatedElements = [];
        this.init();
    }

    init() {
        this.setupObserver();
        this.observeElements();
    }

    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }

    observeElements() {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach(element => {
            this.observer.observe(element);
        });
    }

    animateElement(element) {
        const delay = element.getAttribute('data-aos-delay') || 0;
        
        setTimeout(() => {
            element.classList.add('aos-animate');
        }, parseInt(delay));

        this.observer.unobserve(element);
    }
}

// Initialize AOS when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AOSAnimations();
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (heroBackground) {
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }

    // Hide scroll indicator when scrolling
    if (scrollIndicator) {
        if (scrolled > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    }
});

// Typewriter effect for hero title
class TypewriterEffect {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }

    start() {
        this.element.textContent = '';
        this.type();
    }
}

// Stats counter animation
class StatsCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.animateCounters();
    }

    animateCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        });

        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(counter) {
        const target = parseInt(counter.textContent);
        const increment = target / 50;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '%';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '%';
            }
        };

        updateCounter();
    }
}

// Interactive MCP diagram
class MCPDiagram {
    constructor() {
        this.mcpSystems = document.querySelectorAll('.mcp-system');
        this.mcpCenter = document.querySelector('.mcp-logo');
        this.init();
    }

    init() {
        this.addHoverEffects();
        this.addConnectionAnimation();
    }

    addHoverEffects() {
        this.mcpSystems.forEach(system => {
            system.addEventListener('mouseenter', () => {
                this.highlightConnection(system);
            });

            system.addEventListener('mouseleave', () => {
                this.removeHighlight();
            });
        });
    }

    highlightConnection(system) {
        this.mcpCenter.style.boxShadow = '0 0 30px rgba(0, 102, 204, 0.8)';
        system.style.boxShadow = '0 10px 30px rgba(0, 102, 204, 0.4)';
        
        // Add connection line effect
        this.drawConnectionLine(system);
    }

    removeHighlight() {
        this.mcpCenter.style.boxShadow = '0 10px 30px rgba(0, 102, 204, 0.3)';
        this.mcpSystems.forEach(system => {
            system.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        });
        
        // Remove connection lines
        this.removeConnectionLines();
    }

    drawConnectionLine(system) {
        const line = document.createElement('div');
        line.className = 'connection-line-dynamic';
        line.style.cssText = `
            position: absolute;
            height: 2px;
            background: linear-gradient(90deg, rgba(0, 102, 204, 0.8), rgba(0, 170, 255, 0.8));
            z-index: 1;
            animation: connectionPulse 1s ease-in-out infinite;
        `;
        
        const diagram = document.querySelector('.mcp-diagram');
        diagram.appendChild(line);
        
        // Position the line from center to system
        this.positionLine(line, system);
    }

    positionLine(line, system) {
        const diagram = document.querySelector('.mcp-diagram');
        const center = this.mcpCenter.getBoundingClientRect();
        const systemRect = system.getBoundingClientRect();
        const diagramRect = diagram.getBoundingClientRect();
        
        const centerX = center.left + center.width / 2 - diagramRect.left;
        const centerY = center.top + center.height / 2 - diagramRect.top;
        const systemX = systemRect.left + systemRect.width / 2 - diagramRect.left;
        const systemY = systemRect.top + systemRect.height / 2 - diagramRect.top;
        
        const length = Math.sqrt(Math.pow(systemX - centerX, 2) + Math.pow(systemY - centerY, 2));
        const angle = Math.atan2(systemY - centerY, systemX - centerX) * 180 / Math.PI;
        
        line.style.width = `${length}px`;
        line.style.left = `${centerX}px`;
        line.style.top = `${centerY}px`;
        line.style.transformOrigin = '0 50%';
        line.style.transform = `rotate(${angle}deg)`;
    }

    removeConnectionLines() {
        const lines = document.querySelectorAll('.connection-line-dynamic');
        lines.forEach(line => line.remove());
    }

    addConnectionAnimation() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes connectionPulse {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Floating particles animation for hero section
class FloatingParticles {
    constructor() {
        this.container = document.querySelector('.floating-particles');
        this.particles = [];
        this.createParticles();
    }

    createParticles() {
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                pointer-events: none;
            `;
            
            this.container.appendChild(particle);
            this.particles.push({
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2
            });
        }
        
        this.animateParticles();
    }

    animateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = window.innerWidth;
            if (particle.x > window.innerWidth) particle.x = 0;
            if (particle.y < 0) particle.y = window.innerHeight;
            if (particle.y > window.innerHeight) particle.y = 0;
            
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });
        
        requestAnimationFrame(() => this.animateParticles());
    }
}

// Button click animations
function addButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Scroll progress indicator
class ScrollProgress {
    constructor() {
        this.createProgressBar();
        this.updateProgress();
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #0066CC, #00AAFF);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        this.progressBar = progressBar;
    }

    updateProgress() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            this.progressBar.style.width = scrollPercent + '%';
        });
    }
}

// Avatar Pop-up Functionality
function toggleAvatarChat() {
    const chatElement = document.getElementById('avatar-chat');
    const isHidden = chatElement.classList.contains('hidden');
    
    if (isHidden) {
        chatElement.classList.remove('hidden');
        // Add a small delay to trigger the animation
        setTimeout(() => {
            chatElement.style.opacity = '1';
            chatElement.style.transform = 'scale(1) translateY(0)';
        }, 10);
    } else {
        chatElement.style.opacity = '0';
        chatElement.style.transform = 'scale(0.8) translateY(20px)';
        // Wait for animation to complete before hiding
        setTimeout(() => {
            chatElement.classList.add('hidden');
        }, 300);
    }
}

// Close avatar chat when clicking outside
document.addEventListener('click', (e) => {
    const avatarPopup = document.getElementById('avatar-popup');
    const chatElement = document.getElementById('avatar-chat');
    
    if (!avatarPopup.contains(e.target) && !chatElement.classList.contains('hidden')) {
        toggleAvatarChat();
    }
});

// Prevent closing when clicking inside the chat
document.getElementById('avatar-chat').addEventListener('click', (e) => {
    e.stopPropagation();
});

// Add escape key listener to close avatar chat
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const chatElement = document.getElementById('avatar-chat');
        if (!chatElement.classList.contains('hidden')) {
            toggleAvatarChat();
        }
    }
});

// Initialize avatar chat as hidden
document.addEventListener('DOMContentLoaded', () => {
    const chatElement = document.getElementById('avatar-chat');
    if (chatElement) {
        chatElement.classList.add('hidden');
    }
});

// Enhanced scroll animations for quotes
function animateOnScroll() {
    const elements = document.querySelectorAll('.quote-card, .canvas-feature, .single-quote');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-in');
        }
    });
}

// Run animation check on scroll
window.addEventListener('scroll', animateOnScroll);

// Run animation check on load
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    new StatsCounter();
    new MCPDiagram();
    new FloatingParticles();
    new ScrollProgress();
    
    // Add button animations
    addButtonAnimations();
    
    // Smooth scroll for all internal links
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
    
    // Add intersection observer for section animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });
});

// Resize handler for responsive animations
window.addEventListener('resize', () => {
    // Update particle positions
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
    });
});

// Performance optimization: throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

// Preload critical images
function preloadImages() {
    const images = [
        'https://via.placeholder.com/120x40/0066CC/FFFFFF?text=CTAC',
        'https://via.placeholder.com/120x40/FFFFFF/0066CC?text=CTAC'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// Export functions for global access
window.scrollToSection = scrollToSection;
