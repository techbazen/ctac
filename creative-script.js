// Creative Guns inspired JavaScript for Ctac AI Storytelling

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoading();
    initNavigation();
    initAnimations();
    initCounters();
    initCaseStudies();
    initScrollEffects();
    initInteractiveElements();
});

// Loading Screen
function initLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.querySelector('.progress-fill');
    
    if (!loadingScreen || !progressFill) return;
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide loading screen after a short delay
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
                
                // Initialize AOS after loading
                if (typeof AOS !== 'undefined') {
                    AOS.init({
                        duration: 800,
                        easing: 'ease-in-out',
                        once: true,
                        offset: 100
                    });
                }
                
                // Start hero animations
                initHeroAnimations();
            }, 500);
        }
        progressFill.style.width = progress + '%';
    }, 100);
    
    // Ensure loading screen disappears even if something goes wrong
    setTimeout(() => {
        if (!loadingScreen.classList.contains('hidden')) {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }, 5000);
}

// Navigation
function initNavigation() {
    const nav = document.getElementById('creative-nav');
    const navLinks = document.querySelectorAll('.nav-item');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Navigation scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.style.background = 'rgba(15, 15, 15, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            nav.style.background = 'rgba(15, 15, 15, 0.95)';
            nav.style.boxShadow = 'none';
        }
        
        // Hide/show nav on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Hero Animations
function initHeroAnimations() {
    const aiParticles = document.querySelectorAll('.ai-particle');
    const connections = document.querySelectorAll('.connection');
    const brainCore = document.querySelector('.brain-core');
    
    // Animate particles
    aiParticles.forEach((particle, index) => {
        animateParticle(particle, index);
    });
    
    // Animate neural connections
    connections.forEach((connection, index) => {
        setTimeout(() => {
            connection.classList.add('active');
        }, index * 300);
    });
    
    // Add pulse effect to brain core
    if (brainCore) {
        setInterval(() => {
            brainCore.style.transform = 'scale(1.05)';
            setTimeout(() => {
                brainCore.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }
}

function animateParticle(particle, index) {
    const speed = parseFloat(particle.dataset.speed) || 2;
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    
    function moveParticle() {
        const currentX = parseFloat(particle.style.left);
        const currentY = parseFloat(particle.style.top);
        
        const newX = currentX + (Math.random() - 0.5) * speed;
        const newY = currentY + (Math.random() - 0.5) * speed;
        
        // Keep particles within bounds
        const boundedX = Math.max(0, Math.min(window.innerWidth - 4, newX));
        const boundedY = Math.max(0, Math.min(window.innerHeight - 4, newY));
        
        particle.style.left = boundedX + 'px';
        particle.style.top = boundedY + 'px';
        
        requestAnimationFrame(moveParticle);
    }
    
    setTimeout(() => moveParticle(), index * 1000);
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Case Studies Modal
function initCaseStudies() {
    const modal = document.getElementById('case-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close');
    const caseButtons = document.querySelectorAll('.case-study-btn');
    
    if (!modal || !modalBody) return;
    
    // Case study data
    const caseStudies = {
        manufacturing: {
            title: 'Productie: Operationele uitmuntendheid',
            icon: '🏭',
            challenge: 'Tijdrovende handmatige verwerking van analysecertificaten (CoA\'s) van leveranciers',
            solution: 'SAP Joule controleert binnenkomende CoA-gegevens automatisch aan de hand van vooraf gedefinieerde kwaliteitsspecificaties',
            benefits: [
                'Verminderd kwaliteitsrisico en productieverstoring',
                'Verbeterde procesnaleving',
                'Verbeterde verantwoordelijkheid van leveranciers',
                'Verhoogde operationele efficiëntie'
            ],
            implementation: 'AI-aangedreven documentverwerking extraheert gegevens uit CoA\'s die per e-mail worden ontvangen. Niet-conforme materialen worden automatisch gemarkeerd en geblokkeerd in SAP voordat ze in productie gaan.'
        },
        retail: {
            title: 'Retail: Voorspellende voorraadoptimalisatie',
            icon: '🛍️',
            challenge: 'Frequente voorraadtekorten of overtollige voorraad, langzame handmatige prognoses met spreadsheets',
            solution: 'SAP Joule analyseert trends en eerdere verkopen, Azure AI voegt prognosemodellen toe om toekomstige vraag te voorspellen',
            benefits: [
                'Betere productbeschikbaarheid en klanttevredenheid',
                'Lagere voorraadkosten',
                'Meer tijd voor strategische taken',
                'Proactieve in plaats van reactieve activiteiten'
            ],
            implementation: 'Microsoft Copilot stuurt waarschuwingen in Teams wanneer voorraadrisico\'s worden gedetecteerd. Kopers kunnen direct vanuit Teams bestellingen goedkeuren en aanpassen.'
        },
        services: {
            title: 'Professionele Services: AI-gestuurde productiviteit',
            icon: '💼',
            challenge: 'Veel tijd besteed aan administratie en rapportage in plaats van klantwaarde',
            solution: 'Microsoft Copilot genereert automatisch projectbriefings door Teams-notities en SAP-resourcegegevens te combineren',
            benefits: [
                'Verhoogde productiviteit',
                'Meer focus op klantwaarde',
                'Snellere voorbereiding',
                'Diepere inzichten uit bestaande systemen'
            ],
            implementation: 'SAP Joule consolideert KPI\'s voor meerdere klantaccounts ter ondersteuning van portfoliobeoordelingen en strategische planning.'
        },
        government: {
            title: 'Overheid: Veilige en transparante AI',
            icon: '🏛️',
            challenge: 'Digitaal moderniseren terwijl verantwoord, inclusief en compliant blijven',
            solution: 'MCP stelt copilots in staat om veilig te integreren met gevoelige systemen zonder de integriteit van gegevens in gevaar te brengen',
            benefits: [
                'Veilige toegang tot informatie',
                'Afgestemd op overheidsworkflows',
                'Robuuste governancekaders',
                'Vertrouwd hulpmiddel in openbare dienst'
            ],
            implementation: 'Maatschappelijk werkers gebruiken Microsoft Copilot om dossiers samen te vatten uit sociale zorg-, belasting- en huisvestingssystemen.'
        }
    };
    
    // Open modal
    caseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const caseType = this.dataset.case;
            const caseData = caseStudies[caseType];
            
            if (caseData) {
                modalBody.innerHTML = generateCaseStudyHTML(caseData);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function generateCaseStudyHTML(data) {
        return `
            <div class="case-study-content">
                <div class="case-header">
                    <div class="case-icon">${data.icon}</div>
                    <h2>${data.title}</h2>
                </div>
                
                <div class="case-section">
                    <h3>🎯 Uitdaging</h3>
                    <p>${data.challenge}</p>
                </div>
                
                <div class="case-section">
                    <h3>💡 Oplossing</h3>
                    <p>${data.solution}</p>
                </div>
                
                <div class="case-section">
                    <h3>⚙️ Implementatie</h3>
                    <p>${data.implementation}</p>
                </div>
                
                <div class="case-section">
                    <h3>📈 Voordelen</h3>
                    <ul class="benefits-list">
                        ${data.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="case-cta">
                    <a href="#contact" class="btn-primary" onclick="document.getElementById('case-modal').style.display='none'; document.body.style.overflow='auto';">
                        Bespreek jouw case
                    </a>
                </div>
            </div>
            
            <style>
                .case-study-content {
                    max-width: 100%;
                }
                
                .case-header {
                    text-align: center;
                    margin-bottom: 3rem;
                    padding-bottom: 2rem;
                    border-bottom: 2px solid var(--light-gray);
                }
                
                .case-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }
                
                .case-header h2 {
                    color: var(--text-dark);
                    font-size: 2rem;
                    margin: 0;
                }
                
                .case-section {
                    margin-bottom: 2.5rem;
                }
                
                .case-section h3 {
                    color: var(--primary-blue);
                    font-size: 1.3rem;
                    margin-bottom: 1rem;
                    border-left: 4px solid var(--primary-blue);
                    padding-left: 1rem;
                }
                
                .case-section p {
                    color: var(--text-gray);
                    line-height: 1.6;
                    font-size: 1.1rem;
                }
                
                .benefits-list {
                    list-style: none;
                    padding: 0;
                }
                
                .benefits-list li {
                    color: var(--text-gray);
                    line-height: 1.6;
                    font-size: 1.1rem;
                    margin-bottom: 0.5rem;
                    padding-left: 2rem;
                    position: relative;
                }
                
                .benefits-list li::before {
                    content: '✓';
                    color: var(--accent-green);
                    font-weight: bold;
                    position: absolute;
                    left: 0;
                }
                
                .case-cta {
                    text-align: center;
                    margin-top: 3rem;
                    padding-top: 2rem;
                    border-top: 2px solid var(--light-gray);
                }
            </style>
        `;
    }
}

// Scroll Effects
function initScrollEffects() {
    // Parallax effect for background elements
    const parallaxElements = document.querySelectorAll('.ai-particle, .floating-elements');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    });
    
    // Chapter number animations
    const chapterNumbers = document.querySelectorAll('.chapter-number');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'scale(1)';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    chapterNumbers.forEach(number => {
        number.style.transform = 'scale(0.8)';
        number.style.opacity = '0.3';
        number.style.transition = 'all 0.6s ease';
        observer.observe(number);
    });
}

// Interactive Elements
function initInteractiveElements() {
    // MCP nodes orbit animation
    const mcpNodes = document.querySelectorAll('.mcp-node');
    mcpNodes.forEach((node, index) => {
        node.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2)';
            this.style.background = 'rgba(0, 120, 212, 0.3)';
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
            this.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    });
    
    // Platform cards interaction
    const platformCards = document.querySelectorAll('.platform-card');
    platformCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
        });
    });
    
    // Industry cards interaction
    const industryCards = document.querySelectorAll('.industry-card');
    industryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.industry-icon');
            if (icon) {
                icon.style.transform = 'rotateY(180deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.industry-icon');
            if (icon) {
                icon.style.transform = 'rotateY(0deg)';
            }
        });
    });
    
    // Timeline markers interaction
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    timelineMarkers.forEach(marker => {
        marker.addEventListener('click', function() {
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// Smooth scroll for all internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});

// Initialize animations when document is ready
function initAnimations() {
    // Set initial states for animated elements
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        element.style.transition = 'all 0.6s ease';
    });
}

// Utility function for creating floating elements
function createFloatingElement(type, container) {
    const element = document.createElement('div');
    element.classList.add('floating-element', type);
    
    // Random position
    const x = Math.random() * container.offsetWidth;
    const y = Math.random() * container.offsetHeight;
    
    element.style.left = x + 'px';
    element.style.top = y + 'px';
    
    container.appendChild(element);
    
    return element;
}

// Add resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Recalculate particle positions on resize
    const particles = document.querySelectorAll('.ai-particle');
    particles.forEach(particle => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
    });
});

// Performance optimization: throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-dependent animations here
}, 16)); // ~60fps
