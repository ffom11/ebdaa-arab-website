// Modern JavaScript for إبداع العرب Website

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
});

// ===== Loading Screen =====
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 2000);
});

// ===== Navigation =====
const modernNav = document.getElementById('modernNav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect for navigation
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        modernNav.style.background = 'rgba(26, 32, 44, 0.98)';
        modernNav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        modernNav.style.background = 'rgba(26, 32, 44, 0.95)';
        modernNav.style.boxShadow = 'none';
    }
});

// Mobile navigation toggle
if (navToggle) {
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        // Add mobile menu functionality here
    });
}

// Active navigation link
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ===== Smooth Scrolling =====
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

// ===== GSAP Animations =====
// Register GSAP plugins
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero animations
    gsap.from('.hero-title .word', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-actions .btn-modern', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.8,
        ease: 'power3.out'
    });
    
    // Floating shapes animation
    gsap.to('.shape-1', {
        x: 100,
        y: -50,
        rotation: 360,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    gsap.to('.shape-2', {
        x: -80,
        y: 60,
        rotation: -360,
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    gsap.to('.shape-3', {
        x: 60,
        y: -80,
        rotation: 180,
        duration: 30,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    gsap.to('.shape-4', {
        x: -100,
        y: 40,
        rotation: -180,
        duration: 22,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    // ScrollTrigger animations
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Counter animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(counter, {
                    textContent: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    onUpdate: function() {
                        counter.textContent = Math.ceil(counter.textContent);
                    }
                });
            }
        });
    });
}

// ===== Particle Background =====
function createParticles() {
    const particleContainer = document.getElementById('particles');
    if (!particleContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size
        const size = Math.random() * 4 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 20 + 's';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        
        particleContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// ===== Swiper Slider =====
if (typeof Swiper !== 'undefined' && document.querySelector('.heroSwiper')) {
    const heroSwiper = new Swiper('.heroSwiper', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
    });
}

// ===== Portfolio Filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== Form Submission with Supabase =====
const contactForm = document.querySelector('.modern-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Basic form validation
        const inputs = this.querySelectorAll('.form-input');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            try {
                // Get form data
                const formData = {
                    name: this.querySelector('input[type="text"]').value,
                    email: this.querySelector('input[type="email"]').value,
                    phone: this.querySelector('input[type="tel"]').value,
                    service: this.querySelector('select').value,
                    message: this.querySelector('textarea').value,
                    created_at: new Date().toISOString()
                };
                
                // Check if Supabase is available
                if (window.supabase && window.isSupabaseAvailable) {
                    // Submit to Supabase
                    const { data, error } = await window.supabase
                        .from('contacts')
                        .insert([formData]);
                    
                    if (error) throw error;
                    
                    // Show success message
                    showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
                    this.reset();
                } else {
                    // Fallback to local storage
                    console.log('Supabase not available, using local storage fallback');
                    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
                    contacts.push({ ...formData, id: Date.now().toString() });
                    localStorage.setItem('contacts', JSON.stringify(contacts));
                    
                    showNotification('تم حفظ رسالتك محلياً. سنتواصل معك قريباً.', 'success');
                    this.reset();
                }
                
            } catch (error) {
                console.error('Error submitting form:', error);
                showNotification('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.', 'error');
            }
        } else {
            showNotification('يرجى ملء جميع الحقول المطلوبة.', 'error');
        }
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section-badge, .section-title, .section-description').forEach(el => {
    observer.observe(el);
});

// ===== Parallax Effect =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== Mouse Move Effect =====
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const floatingElements = document.querySelectorAll('.floating-shapes .shape');
    
    floatingElements.forEach((element, index) => {
        const speed = (index + 1) * 0.01;
        const x = (mouseX - window.innerWidth / 2) * speed;
        const y = (mouseY - window.innerHeight / 2) * speed;
        
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===== Initialize on DOM Ready =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
    
    // Add smooth reveal animations
    const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .info-card');
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });
});

// ===== Performance Optimization =====
// Debounce function
function debounce(func, wait) {
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

// Debounced scroll events
const debouncedScroll = debounce(() => {
    // Scroll-based animations
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===== Lazy Loading =====
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===== Error Handling =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ===== Console Welcome Message =====
console.log('%c إبداع العرب - Creative Excellence ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
