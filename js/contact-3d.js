// 3D Contact Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 3D Card Flip Animation
    const contactCards = document.querySelectorAll('.contact-card-3d');
    
    contactCards.forEach(card => {
        const cardInner = card.querySelector('.card-3d-inner');
        let isFlipped = false;
        
        card.addEventListener('click', function(e) {
            if (!isFlipped) {
                cardInner.style.transform = 'rotateY(180deg)';
                isFlipped = true;
            } else {
                cardInner.style.transform = 'rotateY(0deg)';
                isFlipped = false;
            }
        });
        
        // Add hover effect for desktop
        card.addEventListener('mouseenter', function() {
            if (!isFlipped) {
                cardInner.style.transform = 'rotateY(10deg) scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!isFlipped) {
                cardInner.style.transform = 'rotateY(0deg) scale(1)';
            }
        });
    });
    
    // Form Input Animations
    const formInputs = document.querySelectorAll('.input-wrapper-3d input, .textarea-wrapper-3d textarea, .select-wrapper-3d select');
    
    formInputs.forEach(input => {
        // Add focus animation
        input.addEventListener('focus', function() {
            const wrapper = this.closest('.input-wrapper-3d, .textarea-wrapper-3d, .select-wrapper-3d');
            wrapper.style.transform = 'translateY(-2px)';
            wrapper.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            const wrapper = this.closest('.input-wrapper-3d, .textarea-wrapper-3d, .select-wrapper-3d');
            wrapper.style.transform = 'translateY(0)';
        });
        
        // Add typing effect
        input.addEventListener('input', function() {
            const border = this.nextElementSibling;
            if (border && border.classList.contains('input-border-3d')) {
                const value = this.value.length;
                const percentage = Math.min((value / 10) * 100, 100);
                border.style.width = percentage + '%';
            }
        });
    });
    
    // Submit Button Animation
    const submitBtn = document.querySelector('.submit-btn-3d');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading animation
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="btn-text">جاري الإرسال...</span><i class="fas fa-spinner fa-spin"></i><div class="btn-bg-3d"></div>';
            this.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                this.innerHTML = '<span class="btn-text">تم الإرسال بنجاح!</span><i class="fas fa-check"></i><div class="btn-bg-3d"></div>';
                
                // Reset form
                const form = document.getElementById('contactForm');
                if (form) {
                    form.reset();
                    
                    // Reset all input borders
                    document.querySelectorAll('.input-border-3d').forEach(border => {
                        border.style.width = '0';
                    });
                }
                
                // Reset button after delay
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 3000);
            }, 2000);
        });
    }
    
    // Parallax Effect for Background
    const contactSection = document.querySelector('.contact-section');
    
    if (contactSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const sectionTop = contactSection.offsetTop;
            const sectionHeight = contactSection.offsetHeight;
            
            if (scrolled + window.innerHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                const yPos = -(scrolled - sectionTop) * 0.5;
                const beforeElement = contactSection.querySelector('::before');
                if (beforeElement) {
                    contactSection.style.backgroundPositionY = yPos + 'px';
                }
            }
        });
    }
    
    // Icon Floating Animation
    const iconWrappers = document.querySelectorAll('.icon-wrapper-3d');
    
    iconWrappers.forEach((wrapper, index) => {
        wrapper.style.animationDelay = (index * 0.2) + 's';
        
        wrapper.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            const bg = this.querySelector('.icon-bg-3d');
            
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
            
            if (bg) {
                bg.style.transform = 'scale(1.3)';
                bg.style.opacity = '1';
            }
        });
        
        wrapper.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            const bg = this.querySelector('.icon-bg-3d');
            
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            
            if (bg) {
                bg.style.transform = 'scale(1)';
                bg.style.opacity = '0.7';
            }
        });
    });
    
    // Title Gradient Animation
    const title3d = document.querySelector('.title-3d');
    
    if (title3d) {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            title3d.style.filter = `hue-rotate(${hue}deg)`;
        }, 50);
    }
    
    // Form Validation with 3D Effects
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = this.querySelectorAll('input[required], textarea[required], select[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    
                    // Add shake animation
                    const wrapper = input.closest('.input-wrapper-3d, .textarea-wrapper-3d, .select-wrapper-3d');
                    wrapper.style.animation = 'shake 0.5s';
                    
                    setTimeout(() => {
                        wrapper.style.animation = '';
                    }, 500);
                    
                    // Add red border
                    input.style.borderColor = '#ef4444';
                    
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 3000);
                }
            });
            
            if (isValid) {
                // Trigger submit button animation
                submitBtn.click();
            }
        });
    }
    
    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    // Mouse Follow Effect for 3D Elements
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        contactCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            const angleX = (mouseY - cardCenterY) * 0.01;
            const angleY = (mouseX - cardCenterX) * 0.01;
            
            const cardInner = card.querySelector('.card-3d-inner');
            if (!cardInner.style.transform.includes('rotateY(180deg)')) {
                cardInner.style.transform = `rotateX(${-angleX}deg) rotateY(${angleY}deg)`;
            }
        });
    });
});
