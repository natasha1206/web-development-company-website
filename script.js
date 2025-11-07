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

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.05)';
    }
});

// Parallax effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.shape');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Portfolio Slider
const portfolioSlider = {
    track: document.querySelector('.portfolio-slider .slider-track'),
    slides: document.querySelectorAll('.portfolio-slider .slide'),
    prevBtn: document.querySelector('.portfolio-slider .slider-prev'),
    nextBtn: document.querySelector('.portfolio-slider .slider-next'),
    currentIndex: 0,
    
    init: function() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.updateSlider();
        
        // Auto slide every 8 seconds
        setInterval(() => this.nextSlide(), 8000);
    },
    
    prevSlide: function() {
        this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.slides.length - 1;
        this.updateSlider();
    },
    
    nextSlide: function() {
        this.currentIndex = (this.currentIndex < this.slides.length - 1) ? this.currentIndex + 1 : 0;
        this.updateSlider();
    },
    
    updateSlider: function() {
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }
};

// Testimonials Slider
const testimonialsSlider = {
    track: document.querySelector('.testimonials-slider .slider-track'),
    slides: document.querySelectorAll('.testimonials-slider .testimonial-slide'),
    prevBtn: document.querySelector('.testimonials-slider .slider-prev'),
    nextBtn: document.querySelector('.testimonials-slider .slider-next'),
    currentIndex: 0,
    
    init: function() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.updateSlider();
        
        // Auto slide every 6 seconds
        setInterval(() => this.nextSlide(), 6000);
    },
    
    prevSlide: function() {
        this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.slides.length - 1;
        this.updateSlider();
    },
    
    nextSlide: function() {
        this.currentIndex = (this.currentIndex < this.slides.length - 1) ? this.currentIndex + 1 : 0;
        this.updateSlider();
    },
    
    updateSlider: function() {
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }
};

// Contact Form Submission
document.getElementById('leadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // In a real implementation, you would send this data to your server
    console.log('Form submitted:', data);
    
    // Show success message
    showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
    this.reset();
});

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles for notification
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 30px;
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                border-left: 4px solid #06d6a0;
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                max-width: 350px;
            }
            .notification.success {
                border-left-color: #06d6a0;
            }
            .notification.error {
                border-left-color: #ef476f;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .notification-content i {
                color: #06d6a0;
                font-size: 1.2rem;
            }
            .notification.show {
                transform: translateX(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');
    
    this.classList.toggle('active');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navCta.style.display = navCta.style.display === 'flex' ? 'none' : 'flex';
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe stats
    document.querySelectorAll('.stat').forEach(stat => {
        observer.observe(stat);
    });
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .service-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        .service-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        .stat {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        .stat.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        .stat:nth-child(2) {
            transition-delay: 0.2s;
        }
        .stat:nth-child(3) {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    portfolioSlider.init();
    testimonialsSlider.init();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});