// Testimonials Slider JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialsSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('testimonialsPrev');
    const nextBtn = document.getElementById('testimonialsNext');
    const dotsContainer = document.getElementById('testimonialsDots');
    
    if (!testimonialsSlider || !testimonialsTrack) return;
    
    let currentSlide = 0;
    let isAutoScrolling = true;
    let autoScrollInterval;
    
    // Create dots
    function createDots() {
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        testimonialsSlides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    // Update dots
    function updateDots() {
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        if (currentSlide < 0) currentSlide = testimonialsSlides.length - 1;
        if (currentSlide >= testimonialsSlides.length) currentSlide = 0;
        
        const offset = -currentSlide * 100;
        testimonialsTrack.style.transform = `translateX(${offset}%)`;
        
        updateDots();
        resetAutoScroll();
    }
    
    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Auto scroll
    function startAutoScroll() {
        if (!isAutoScrolling) return;
        
        autoScrollInterval = setInterval(nextSlide, 4000);
        testimonialsSlider.classList.add('auto-scroll');
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
        testimonialsSlider.classList.remove('auto-scroll');
    }
    
    function resetAutoScroll() {
        if (isAutoScrolling) {
            stopAutoScroll();
            startAutoScroll();
        }
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
        });
    }
    
    // Pause on hover
    testimonialsSlider.addEventListener('mouseenter', () => {
        stopAutoScroll();
    });
    
    testimonialsSlider.addEventListener('mouseleave', () => {
        if (isAutoScrolling) {
            startAutoScroll();
        }
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    testimonialsSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoScroll();
    });
    
    testimonialsSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        if (isAutoScrolling) {
            startAutoScroll();
        }
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left
            } else {
                prevSlide(); // Swipe right
            }
        }
    }
    
    // Initialize
    createDots();
    startAutoScroll();
    
    // Pause auto-scroll when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoScroll();
        } else if (isAutoScrolling) {
            startAutoScroll();
        }
    });
});
