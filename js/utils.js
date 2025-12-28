// Utility Functions for EBDAA Website
class EbdaaUtils {
    // Show alert message
    static showAlert(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
        alertDiv.style.zIndex = '9999';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }

    // Format date
    static formatDate(date) {
        return new Date(date).toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Validate email
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Validate phone (Saudi numbers)
    static validatePhone(phone) {
        const re = /^05[0-9]{8}$/;
        return re.test(phone.replace(/[^0-9]/g, ''));
    }

    // Loading spinner
    static showLoading(element) {
        if (element) {
            element.disabled = true;
            element.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> جاري التحميل...';
        }
    }

    static hideLoading(element, originalText) {
        if (element) {
            element.disabled = false;
            element.innerHTML = originalText;
        }
    }

    // Smooth scroll
    static smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Copy to clipboard
    static async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showAlert('تم النسخ بنجاح', 'success');
        } catch (err) {
            this.showAlert('فشل النسخ', 'error');
        }
    }

    // Animate numbers
    static animateNumbers() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            // Start animation when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(counter);
        });
    }

    // Portfolio filter
    static initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter items
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Initialize all utilities
    static init() {
        this.animateNumbers();
        this.initPortfolioFilter();
        this.initRevealAnimation();
        
        console.log('EBDAA Utilities initialized successfully');
    }
}

// Make functions globally available
window.initPortfolioFilter = () => EbdaaUtils.initPortfolioFilter();
window.animateNumbers = () => EbdaaUtils.animateNumbers();
window.initRevealAnimation = () => EbdaaUtils.initRevealAnimation();

// Initialize common functions
window.showAlert = EbdaaUtils.showAlert.bind(EbdaaUtils);
window.formatDate = EbdaaUtils.formatDate.bind(EbdaaUtils);
window.validateEmail = EbdaaUtils.validateEmail.bind(EbdaaUtils);
window.validatePhone = EbdaaUtils.validatePhone.bind(EbdaaUtils);
window.showLoading = EbdaaUtils.showLoading.bind(EbdaaUtils);
window.hideLoading = EbdaaUtils.hideLoading.bind(EbdaaUtils);
window.smoothScroll = EbdaaUtils.smoothScroll.bind(EbdaaUtils);
window.copyToClipboard = EbdaaUtils.copyToClipboard.bind(EbdaaUtils);

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    EbdaaUtils.init();
});
