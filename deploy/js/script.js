// Initialize AOS Animation
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Portfolio Data
const portfolioData = [
    {
        id: 1,
        title: 'تصوير منتجات تجارية',
        category: 'photography',
        image: 'images/portfolio1.jpg',
        description: 'تصوير احترافي لمنتجات متجر إلكتروني'
    },
    {
        id: 2,
        title: 'فيديو إعلاني',
        category: 'video',
        image: 'images/portfolio2.jpg',
        description: 'مونتاج فيديو إعلاني لمنتج جديد'
    },
    {
        id: 3,
        title: 'هوية بصرية',
        category: 'design',
        image: 'images/portfolio3.jpg',
        description: 'تصميم هوية بصرية كاملة لشركة ناشئة'
    },
    {
        id: 4,
        title: 'حملة انستغرام',
        category: 'social',
        image: 'images/portfolio4.jpg',
        description: 'إدارة حملة تسويقية على انستغرام'
    },
    {
        id: 5,
        title: 'تصوير فعاليات',
        category: 'photography',
        image: 'images/portfolio5.jpg',
        description: 'تغطية تصويرية لفعالية تجارية'
    },
    {
        id: 6,
        title: 'مونتاج فيديو',
        category: 'video',
        image: 'images/portfolio6.jpg',
        description: 'مونتاج فيديو لفعالية مؤسسية'
    },
    {
        id: 7,
        title: 'تصميم موقع',
        category: 'design',
        image: 'images/portfolio7.jpg',
        description: 'تصميم واجهة مستخدم لموقع إلكتروني'
    },
    {
        id: 8,
        title: 'محتوى وسائط اجتماعية',
        category: 'social',
        image: 'images/portfolio8.jpg',
        description: 'إنشاء محتوى إبداعي لوسائل التواصل'
    }
];

// DOM Elements
const portfolioGrid = document.getElementById('portfolio-grid');
const filterButtons = document.querySelectorAll('.btn-group .btn');
const contactForm = document.getElementById('contact-form');

// Initialize Portfolio
function initPortfolio() {
    renderPortfolio('all');
    setupFilterButtons();
}

// Render Portfolio Items
function renderPortfolio(filter = 'all') {
    const filteredItems = filter === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.category === filter);

    portfolioGrid.innerHTML = filteredItems.map(item => `
        <div class="col-lg-4 col-md-6 portfolio-item" data-category="${item.category}">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="portfolio-overlay">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <button class="btn btn-light btn-sm" onclick="viewPortfolioItem(${item.id})">
                    <i class="fas fa-eye"></i> عرض التفاصيل
                </button>
            </div>
        </div>
    `).join('');

    // Re-initialize AOS for new elements
    AOS.refresh();
}

// Setup Filter Buttons
function setupFilterButtons() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter portfolio
            const filter = this.getAttribute('data-filter');
            renderPortfolio(filter);
        });
    });
}

// View Portfolio Item
function viewPortfolioItem(id) {
    const item = portfolioData.find(p => p.id === id);
    if (item) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${item.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${item.image}" alt="${item.title}" class="img-fluid rounded mb-3">
                        <p>${item.description}</p>
                        <div class="row mt-3">
                            <div class="col-md-6">
                                <h6>التصنيف:</h6>
                                <p>${getCategoryName(item.category)}</p>
                            </div>
                            <div class="col-md-6">
                                <h6>التاريخ:</h6>
                                <p>${new Date().toLocaleDateString('ar-SA')}</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إغلاق</button>
                        <a href="#contact" class="btn btn-primary" data-bs-dismiss="modal">اطلب خدمة مشابهة</a>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
        
        // Remove modal from DOM when hidden
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    }
}

// Get Category Name in Arabic
function getCategoryName(category) {
    const categories = {
        'photography': 'التصوير',
        'video': 'الفيديو',
        'design': 'التصميم',
        'social': 'وسائل التواصل الاجتماعي'
    };
    return categories[category] || category;
}

// Contact Form Handler
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // Validate form
    if (!validateForm(formData)) {
        return;
    }
    
    // Save request to admin panel
    localStorage.setItem('new_request', JSON.stringify(formData));
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>جاري الإرسال...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        showMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Open WhatsApp
        const whatsappNumber = '966566166251';
        const message = `طلب خدمة جديد:%0A` +
            `الاسم: ${formData.name}%0A` +
            `البريد: ${formData.email}%0A` +
            `الهاتف: ${formData.phone}%0A` +
            `الخدمة: ${formData.service}%0A` +
            `الرسالة: ${formData.message}`;
        
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    }, 2000);
}

// Form Validation
function validateForm(data) {
    if (!data.name || data.name.length < 3) {
        showMessage('الرجاء إدخال اسم صحيح (3 أحرف على الأقل)', 'error');
        return false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        showMessage('الرجاء إدخال بريد إلكتروني صحيح', 'error');
        return false;
    }
    
    if (!data.message || data.message.length < 10) {
        showMessage('الرجاء إدخال رسالة (10 أحرف على الأقل)', 'error');
        return false;
    }
    
    return true;
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show Message
function showMessage(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : 'success'} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; left: 50%; transform: translateX(-50%); z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 5000);
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Scroll Effect
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.98), rgba(139, 92, 246, 0.98))';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, rgba(99, 102, 241, 0.95), rgba(139, 92, 246, 0.95))';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    const speed = 200;
    
    counters.forEach(counter => {
        const animate = () => {
            const target = +counter.innerText.replace(/\D/g, '');
            const count = +counter.innerText.replace(/\D/g, '');
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment) + (counter.innerText.includes('+') ? '+' : (counter.innerText.includes('%') ? '%' : ''));
                setTimeout(animate, 1);
            } else {
                counter.innerText = target + (counter.innerText.includes('+') ? '+' : (counter.innerText.includes('%') ? '%' : ''));
            }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize portfolio
    initPortfolio();
    
    // Setup contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Setup navbar scroll effect
    setupNavbarScroll();
    
    // Initialize counter animation
    animateCounters();
    
    // Add loading complete class
    document.body.classList.add('loaded');
});

// Performance optimization: Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
setupLazyLoading();

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuKYs2KwYtpjPC90ZXh0Pjwvc3ZnPg==';
        });
    });
});

// Service worker registration (for PWA support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
