// Enhanced UX/UI JavaScript

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Portfolio filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
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
});

// Smooth scrolling for navigation links
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

// Form validation and submission
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const phone = document.querySelector('#phone').value.trim();
        const service = document.querySelector('#service').value;
        const message = document.querySelector('#message').value.trim();
        
        let isValid = true;
        let errorMessage = '';
        
        if (!name) {
            errorMessage = 'الرجاء إدخال الاسم';
            isValid = false;
        } else if (!email) {
            errorMessage = 'الرجاء إدخال البريد الإلكتروني';
            isValid = false;
        } else if (!email.includes('@')) {
            errorMessage = 'الرجاء إدخال بريد إلكتروني صحيح';
            isValid = false;
        } else if (!message) {
            errorMessage = 'الرجاء إدخال الرسالة';
            isValid = false;
        }
        
        if (!isValid) {
            showNotification(errorMessage, 'error');
            return;
        }
        
        // Show success message
        showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Store in localStorage (for demo purposes)
        const formData = {
            name,
            email,
            phone,
            service,
            message,
            timestamp: new Date().toISOString()
        };
        
        let submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
        submissions.push(formData);
        localStorage.setItem('contact_submissions', JSON.stringify(submissions));
        
        // Also store in ebdaa_contact_submissions for admin dashboard
        let ebdaaSubmissions = JSON.parse(localStorage.getItem('ebdaa_contact_submissions') || '[]');
        ebdaaSubmissions.push(formData);
        localStorage.setItem('ebdaa_contact_submissions', JSON.stringify(ebdaaSubmissions));
        
        // Trigger notification for admin dashboard
        localStorage.setItem('new_message', JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            service: service,
            message: message,
            timestamp: new Date().toISOString()
        }));
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? 'var(--gradient-success)' : type === 'error' ? 'var(--gradient-accent)' : 'var(--gradient-primary)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        opacity: 0;
        transform: translateX(-50%) translateY(-20px);
        transition: all 0.3s ease;
        font-family: var(--primary-font);
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animation classes on scroll
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
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-card, .section-title');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Add animate-in class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
