// Document load event
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme based on user preference
    initializeTheme();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize particle effect
    initializeParticles();
    
    // Initialize scroll to top button
    initializeScrollToTop();
    
    // Initialize contact form
    initializeContactForm();

    // Skills bar animation on scroll
    initializeSkillsBars();
});

// Theme initialization and toggle
function initializeTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const storedTheme = localStorage.getItem('theme');
    
    // Set initial theme based on stored preference or system preference
    if (storedTheme) {
        document.documentElement.className = storedTheme;
    } else {
        // Use system preference as default
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.documentElement.className = '';
        } else {
            document.documentElement.className = 'dark';
        }
    }
    
    // Apply CSS variables based on current theme
    applyThemeVariables();
    
    // Theme toggle event
    themeToggleBtn.addEventListener('click', () => {
        if (document.documentElement.className === 'dark') {
            document.documentElement.className = '';
            localStorage.setItem('theme', '');
        } else {
            document.documentElement.className = 'dark';
            localStorage.setItem('theme', 'dark');
        }
        applyThemeVariables();
    });
}

// Apply CSS variables based on the current theme
function applyThemeVariables() {
    const root = document.documentElement;
    const isDark = root.className === 'dark';
    
    if (isDark) {
        root.style.setProperty('--primary-color', 'var(--dark-primary-color)');
        root.style.setProperty('--primary-dark', 'var(--dark-primary-dark)');
        root.style.setProperty('--secondary-color', 'var(--dark-secondary-color)');
        root.style.setProperty('--text-color', 'var(--dark-text-color)');
        root.style.setProperty('--bg-color', 'var(--dark-bg-color)');
        root.style.setProperty('--card-bg', 'var(--dark-card-bg)');
        root.style.setProperty('--section-bg', 'var(--dark-section-bg)');
        root.style.setProperty('--border-color', 'var(--dark-border-color)');
        root.style.setProperty('--nav-bg', 'var(--dark-nav-bg)');
        root.style.setProperty('--shadow', 'var(--dark-shadow)');
        root.style.setProperty('--input-bg', 'var(--dark-input-bg)');
    } else {
        root.style.setProperty('--primary-color', 'var(--light-primary-color)');
        root.style.setProperty('--primary-dark', 'var(--light-primary-dark)');
        root.style.setProperty('--secondary-color', 'var(--light-secondary-color)');
        root.style.setProperty('--text-color', 'var(--light-text-color)');
        root.style.setProperty('--bg-color', 'var(--light-bg-color)');
        root.style.setProperty('--card-bg', 'var(--light-card-bg)');
        root.style.setProperty('--section-bg', 'var(--light-section-bg)');
        root.style.setProperty('--border-color', 'var(--light-border-color)');
        root.style.setProperty('--nav-bg', 'var(--light-nav-bg)');
        root.style.setProperty('--shadow', 'var(--light-shadow)');
        root.style.setProperty('--input-bg', 'var(--light-input-bg)');
    }
}

// Initialize navigation
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close navbar when clicking a link (mobile)
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get the offset position of the navbar
                const navbarHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to nav items on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize AOS animations
function initializeAnimations() {
    // If AOS is loaded
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100,
            delay: 100
        });
    } else {
        // Fallback animation handling with Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.hasAttribute('data-aos')) {
                        entry.target.classList.add('aos-animate');
                    } else if (entry.target.classList.contains('section-fade')) {
                        entry.target.classList.add('active');
                    }
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe elements with data-aos attributes
        document.querySelectorAll('[data-aos]').forEach(element => {
            observer.observe(element);
        });

        // Observe sections for fade in effect
        document.querySelectorAll('.section-fade').forEach(section => {
            observer.observe(section);
        });
    }

    // Animate skill bars on scroll
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillListItems = entry.target.querySelectorAll('.skill-list li');
                skillListItems.forEach((item, index) => {
                    setTimeout(() => {
                        const skill = item.getAttribute('data-skill');
                        if (skill) {
                            item.style.setProperty('--skill-width', `${skill}%`);
                            item.classList.add('animated');
                        }
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-category').forEach(category => {
        skillObserver.observe(category);
    });
}

// Initialize particles.js
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#3b82f6"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#3b82f6",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Initialize scroll to top button
function initializeScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add form submission animation
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // For GitHub Pages (static hosting), you might want to use a service like Formspree
                // This is just a placeholder to show form submission
                const formData = new FormData(contactForm);
                const formValues = Object.fromEntries(formData.entries());
                
                // Reset form and button
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Show success message
                showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
            }, 1500);
        });
    }
}

// Show form submission message
function showFormMessage(message, type) {
    const formMessage = document.createElement('div');
    formMessage.className = `form-message ${type}`;
    formMessage.textContent = message;
    
    const contactForm = document.getElementById('contact-form');
    contactForm.parentNode.insertBefore(formMessage, contactForm.nextSibling);
    
    // Auto remove message after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('fade-out');
        setTimeout(() => {
            formMessage.remove();
        }, 500);
    }, 5000);
}

// Initialize skill bars
function initializeSkillsBars() {
    document.querySelectorAll('.skill-category').forEach(category => {
        category.addEventListener('mouseenter', () => {
            const skillItems = category.querySelectorAll('.skill-list li');
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    const skill = item.getAttribute('data-skill');
                    item.style.setProperty('--skill-width', `${skill}%`);
                    item.classList.add('animated');
                }, index * 100);
            });
        });

        category.addEventListener('mouseleave', () => {
            const skillItems = category.querySelectorAll('.skill-list li');
            skillItems.forEach(item => {
                item.style.setProperty('--skill-width', '0%');
                item.classList.remove('animated');
            });
        });
    });
}

// Add CSS for skill bar animations
document.head.insertAdjacentHTML('beforeend', `
<style>
    /* AOS Library Styles (fallback) */
    [data-aos] {
        opacity: 0;
        transition-property: opacity, transform;
        transition-duration: 0.8s;
        transition-timing-function: ease-out;
    }

    [data-aos].aos-animate {
        opacity: 1;
    }

    /* Skill bar animations */
    .skill-list li {
        position: relative;
    }
    
    .skill-list li::after {
        content: '';
        display: block;
        height: 6px;
        background: linear-gradient(90deg, var(--primary-color), var(--primary-dark));
        border-radius: 3px;
        margin-top: 5px;
        width: 0;
        transition: width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .skill-list li.animated::after {
        width: var(--skill-width, 0%);
    }
    
    /* Form message */
    .form-message {
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 8px;
        text-align: center;
        font-weight: 500;
        animation: fadeIn 0.5s ease forwards;
    }
    
    .form-message.success {
        background-color: rgba(16, 185, 129, 0.2);
        color: #10b981;
        border: 1px solid #10b981;
    }
    
    .form-message.error {
        background-color: rgba(239, 68, 68, 0.2);
        color: #ef4444;
        border: 1px solid #ef4444;
    }
    
    .form-message.fade-out {
        animation: fadeOut 0.5s ease forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
    
    /* Active nav link */
    .nav-links a.active {
        color: var(--primary-color);
        font-weight: 700;
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
</style>
`);
