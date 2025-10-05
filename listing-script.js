// Smooth page load
window.addEventListener('load', () => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            loadingOverlay.style.visibility = 'hidden';
        }, 1500);
    }
});

// Smooth scrolling functions
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Main DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    // Add smooth scrolling to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Navigation scroll effect
    const nav = document.querySelector('.main-nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
    });

    // Animated Counter for Stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Observer for counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Simple AOS (Animate On Scroll) implementation
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Contact Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Validate form
            if (!formObject.fullName || !formObject.email || !formObject.phone || !formObject.interest || !formObject.budget || !formObject.terms) {
                showNotification('Please fill in all required fields and accept terms and conditions.', 'error');
                return;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formObject.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Validate phone
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(formObject.phone.replace(/\D/g, ''))) {
                showNotification('Please enter a valid 10-digit phone number.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'SENDING...';
            submitBtn.disabled = true;

            // Generate enquiry number
            const enquiryNumber = 'ENQ' + Date.now().toString().slice(-6);

            // Prepare WhatsApp message
            const whatsappMessage = `🏠 *New Enquiry - K&Co Properties*

📋 *Lead Details:*
• Name: ${formObject.fullName}
• Email: ${formObject.email}
• Phone: ${formObject.phone}
• Interest: ${formObject.interest}
• Budget: ${formObject.budget}
• Message: ${formObject.message || 'No additional message'}
• Enquiry Number: ${enquiryNumber}
• Source: Portfolio Website
• Time: ${new Date().toLocaleString('en-IN')}

🎯 *Action Required:*
Please contact this lead immediately!`;

            // Send WhatsApp notification
            const whatsappUrl = `https://wa.me/919760393545?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');

            // Send confirmation email to customer
            const customerEmail = formObject.email;
            const customerSubject = `Your Enquiry Confirmation - K&Co Properties (${enquiryNumber})`;
            const customerBody = `Dear ${formObject.fullName},

Thank you for your interest in our luxury properties portfolio!

📋 Your Enquiry Details:
• Enquiry Number: ${enquiryNumber}
• Interest: ${formObject.interest}
• Budget Range: ${formObject.budget}
• Message: ${formObject.message || 'No additional message'}
• Submission Time: ${new Date().toLocaleString('en-IN')}

🎯 What's Next:
1. Our team will contact you within 24 hours
2. You'll receive exclusive property details
3. Schedule a site visit at your convenience
4. Investment analysis and guidance

📞 Contact Us:
Phone: +91 9760393545
Email: 005krawat@gmail.com

Thank you for choosing K&Co Properties!

Best regards,
Kunwar Singh Rawat
K&Co Real Estate Advisory`;

            const customerEmailUrl = `mailto:${customerEmail}?subject=${encodeURIComponent(customerSubject)}&body=${encodeURIComponent(customerBody)}`;
            window.open(customerEmailUrl, '_blank');

            // Show success message
            showNotification(`Enquiry Sent Successfully! Your enquiry number: ${enquiryNumber}. We'll contact you within 24 hours.`, 'success');

            // Reset form
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Log enquiry data
            console.log('Enquiry Generated:', {
                enquiryNumber: enquiryNumber,
                ...formObject,
                timestamp: new Date().toISOString()
            });
        });
    }

    // Button hover effects
    const buttons = document.querySelectorAll('.btn-view-details, .btn-notify, .btn-cta');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Property card hover effects
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        if (!card.classList.contains('coming-soon-card')) {
            card.addEventListener('click', function (e) {
                // Only navigate if not clicking on a link
                if (!e.target.closest('a')) {
                    const link = this.querySelector('.btn-view-details');
                    if (link) {
                        window.location.href = link.getAttribute('href');
                    }
                }
            });
        }
    });
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    // Choose icon based on type
    let iconClass = 'info-circle';
    if (type === 'success') iconClass = 'check-circle';
    if (type === 'error') iconClass = 'exclamation-circle';

    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${iconClass}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    const backgroundColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

    // Add animation keyframes if not exists
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                margin-left: auto;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .notification-content i {
                font-size: 20px;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Parallax effect for hero section (optimized)
window.addEventListener('scroll', () => {
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        const scrolled = window.pageYOffset;
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add reveal animation on scroll
function revealElements() {
    const reveals = document.querySelectorAll('[data-aos]');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('aos-animate');
        }
    });
}

window.addEventListener('scroll', revealElements);

// Initialize on load
revealElements();

