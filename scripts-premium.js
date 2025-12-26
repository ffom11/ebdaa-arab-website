// Premium JavaScript for إبداع العرب Website

// Initialize Lucide Icons and AOS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }
    
    // Initialize GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero animations
        gsap.from('.hero-title', {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out'
        });
        
        gsap.from('.hero-actions', {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.6,
            ease: 'power3.out'
        });
        
        // Service cards animation
        gsap.utils.toArray('.service-card').forEach((card, index) => {
            gsap.from(card, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
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

// ===== Premium Navigation =====
const premiumNav = document.getElementById('premiumNav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect for navigation
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        premiumNav.classList.add('scrolled');
    } else {
        premiumNav.classList.remove('scrolled');
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

// ===== Premium Contact Form =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Basic form validation
        const inputs = this.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                input.style.borderColor = 'var(--error)';
            } else {
                input.classList.remove('error');
                input.style.borderColor = 'var(--gray-200)';
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

// ===== Premium Notification System =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--error)' : 'var(--primary)'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-weight: 500;
    `;
    
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}" style="font-size: 1.25rem;"></i>
        <span>${message}</span>
        <button style="background: none; border: none; color: white; cursor: pointer; font-size: 1.25rem; padding: 0; margin-right: auto;" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// ===== Premium Interactive Elements =====
// Service cards hover effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Social links hover effect
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.background = 'var(--gradient-primary)';
        this.style.transform = 'translateY(-4px)';
        this.querySelector('i').style.color = 'white';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.background = 'var(--gray-100)';
        this.style.transform = 'translateY(0)';
        this.querySelector('i').style.color = 'var(--gray-600)';
    });
});

// Form inputs focus effect
document.querySelectorAll('.form-control, .form-select').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--accent)';
        this.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
    });
    
    input.addEventListener('blur', function() {
        this.style.borderColor = 'var(--gray-200)';
        this.style.boxShadow = 'none';
    });
});

// ===== Premium Counter Animation =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString('ar-SA');
    }, 16);
}

// ===== Premium Parallax Effect =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-particles');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== Premium Performance Optimization =====
// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Premium Error Handling =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting service here
});

// ===== Premium Analytics =====
// Add your analytics tracking code here
console.log('Premium Website Loaded Successfully - إبداع العرب');
