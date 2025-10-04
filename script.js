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

function scrollToPaymentPlan() {
    const paymentSection = document.getElementById('payment-plan');
    if (paymentSection) {
        paymentSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollY = currentScrollY;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.highlight-card, .spec-row, .payment-option, .eoi-form');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // EOI Form handling
    const eoiForm = document.getElementById('eoiForm');
    if (eoiForm) {
        console.log('EOI Form found and event listener added');
        eoiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            console.log('Form data:', formObject);
            
            // Validate form
            if (!formObject.fullName || !formObject.email || !formObject.phone || !formObject.tower || !formObject.terms) {
                console.log('Validation failed - missing fields');
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
            const submitBtn = this.querySelector('.btn-eoi');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Generating EOI...';
            submitBtn.disabled = true;
            
            // Generate EOI number
            const eoiNumber = 'EOI' + Date.now().toString().slice(-6);
            
            // Prepare WhatsApp message for main EOI form
            const whatsappMessage = `🏠 *New EOI - Jacob & Co. x M3M*
            
📋 *Lead Details:*
• Name: ${formObject.fullName}
• Email: ${formObject.email}
• Phone: ${formObject.phone}
• Tower: ${formObject.tower}
• Budget: ${formObject.budget || 'Not specified'}
• Message: ${formObject.message || 'No additional message'}
• EOI Number: ${eoiNumber}
• Source: Main EOI Form
• Time: ${new Date().toLocaleString('en-IN')}

🎯 *Action Required:*
Please contact this lead immediately for priority booking!`;
            
            // Send WhatsApp notification
            const whatsappUrl = `https://wa.me/919760393545?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Send confirmation email to customer
            const customerEmail = formObject.email;
            const customerSubject = `Your EOI Confirmation - Jacob & Co. x M3M (${eoiNumber})`;
            const customerBody = `Dear ${formObject.fullName},

Thank you for your interest in Jacob & Co. x M3M luxury residences!

📋 Your EOI Details:
• EOI Number: ${eoiNumber}
• Tower Interest: ${formObject.tower}
• Budget Range: ${formObject.budget || 'Not specified'}
• Additional Message: ${formObject.message || 'No additional message'}
• Submission Time: ${new Date().toLocaleString('en-IN')}

🎯 What's Next:
1. Our team will contact you within 24 hours
2. You'll receive exclusive floor plans
3. Priority booking access for soft launch pricing
4. Investment analysis report

📞 Contact Us:
Phone: +91 9760393545
Email: kunwarsinghrawat@gmail.com

Thank you for choosing Jacob & Co. x M3M!

Best regards,
Kunwar Singh Rawat
Jacob & Co. x M3M Team`;

            const customerEmailUrl = `mailto:${customerEmail}?subject=${encodeURIComponent(customerSubject)}&body=${encodeURIComponent(customerBody)}`;
            
            // Open customer email
            window.open(customerEmailUrl, '_blank');
            
            // Show success message with EOI number
            showNotification(`EOI Generated Successfully! Your EOI Number: ${eoiNumber}. Our team will contact you within 24 hours.`, 'success');
            
            // Reset form
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Log EOI data (in real implementation, this would be sent to server)
            console.log('EOI Generated:', {
                eoiNumber: eoiNumber,
                ...formObject,
                timestamp: new Date().toISOString()
            });
        });
    }

    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-tour, .btn-eoi');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Property card hover effect
    const propertyCard = document.querySelector('.property-card');
    if (propertyCard) {
        propertyCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 25px 80px rgba(0, 0, 0, 0.15)';
        });
        
        propertyCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.1)';
        });
    }

    // Counter animation for specs
    const specNumbers = document.querySelectorAll('.spec-number');
    const animateCounter = (element, target, duration = 2000) => {
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
    };

    // Observe spec numbers for counter animation
    const specObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                if (text.includes('3-5')) {
                    // Don't animate this one as it's a range
                    return;
                }
                if (text.includes('2500-6400')) {
                    // Don't animate this one as it's a range
                    return;
                }
                if (text.includes('4')) {
                    animateCounter(entry.target, 4);
                }
                specObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    specNumbers.forEach(spec => {
        specObserver.observe(spec);
    });

    // Optimized parallax effect for hero section (reduced for performance)
    const hero = document.querySelector('.hero');
    if (hero) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.2; // Reduced intensity
            hero.style.transform = `translateY(${rate}px)`;
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    // Add loading animation
    window.addEventListener('load', () => {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            setTimeout(() => {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 500);
            }, 1000);
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
        top: 20px;
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
    
    // Add animation keyframes
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

// Image Gallery Functionality
let currentImageIndex = 0;
const imageSources = [
    'assets/images/optimized/property_image_01.png',
    'assets/images/optimized/property_image_06.png',
    'assets/images/optimized/property_image_07.png',
    'assets/images/optimized/property_image_08.png',
    'assets/images/optimized/property_image_09.png'
];

function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = imageSources.length - 1;
    } else if (currentImageIndex >= imageSources.length) {
        currentImageIndex = 0;
    }
    
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainImage) {
        mainImage.src = imageSources[currentImageIndex];
    }
    
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

function setMainImage(index) {
    currentImageIndex = index;
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainImage) {
        mainImage.src = imageSources[index];
    }
    
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Auto-rotate images every 8 seconds (slower for better UX)
function startImageRotation() {
    setInterval(() => {
        changeImage(1);
    }, 8000);
}

// Floor Plan Modal Functionality
let currentZoom = 1;
const floorPlanImages = {
    '3bhk': 'assets/images/optimized/property_image_17.png',
    '4bhk': 'assets/images/optimized/property_image_18.png',
    '5bhk': 'assets/images/optimized/property_image_19.png'
};

function openFloorPlanModal(planType) {
    const modal = document.getElementById('floorPlanModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalFloorPlan = document.getElementById('modalFloorPlan');
    
    if (modal && modalTitle && modalFloorPlan) {
        modalTitle.textContent = `${planType.toUpperCase()} Floor Plan`;
        modalFloorPlan.src = floorPlanImages[planType];
        modal.style.display = 'block';
        currentZoom = 1;
        updateZoom();
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
}

function closeFloorPlanModal() {
    const modal = document.getElementById('floorPlanModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function zoomIn() {
    currentZoom = Math.min(currentZoom * 1.2, 3);
    updateZoom();
}

function zoomOut() {
    currentZoom = Math.max(currentZoom / 1.2, 0.5);
    updateZoom();
}

function resetZoom() {
    currentZoom = 1;
    updateZoom();
}

function updateZoom() {
    const modalFloorPlan = document.getElementById('modalFloorPlan');
    if (modalFloorPlan) {
        modalFloorPlan.style.transform = `scale(${currentZoom})`;
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('floorPlanModal');
    if (e.target === modal) {
        closeFloorPlanModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeFloorPlanModal();
    }
});

// Add smooth reveal animation for elements
function revealElements() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealElements);

// Initialize reveal elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToReveal = document.querySelectorAll('.highlight-card, .specs-table, .payment-details, .eoi-form, .gallery-item');
    elementsToReveal.forEach(el => {
        el.classList.add('reveal');
    });
    
    // Start image rotation
    startImageRotation();
});

// Add CSS for reveal animation
const revealStyles = document.createElement('style');
revealStyles.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease;
    }
    
    .reveal.active {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyles);

// Lead Capture Popup Functions
function showPopup() {
    const popup = document.getElementById('popupOverlay');
    if (popup) {
        popup.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closePopup() {
    const popup = document.getElementById('popupOverlay');
    if (popup) {
        popup.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Show popup after 3 seconds of page load
setTimeout(() => {
    // Check if user has already seen the popup in this session
    if (!sessionStorage.getItem('popupShown')) {
        showPopup();
        sessionStorage.setItem('popupShown', 'true');
    }
}, 3000);

// Close popup when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const popupOverlay = document.getElementById('popupOverlay');
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closePopup();
            }
        });
    }
});

// Close popup with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// Popup form submission
document.addEventListener('DOMContentLoaded', function() {
    const popupForm = document.getElementById('popupForm');
    if (popupForm) {
        popupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.popup-submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            // Show loading state
            submitBtn.classList.add('loading');
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            
            // Get form data
            const formData = new FormData(this);
            const leadData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                nationality: formData.get('nationality'),
                interest: formData.get('interest'),
                terms: formData.get('terms'),
                source: 'Popup Lead Capture',
                timestamp: new Date().toISOString()
            };
            
            // Generate EOI number
            const eoiNumber = 'EOI-' + Date.now().toString().slice(-6);
            
            // Prepare WhatsApp message
            const whatsappMessage = `🏠 *New Lead - Jacob & Co. x M3M*
            
📋 *Lead Details:*
• Name: ${leadData.name}
• Email: ${leadData.email}
• Phone: ${leadData.phone}
• Nationality: ${leadData.nationality}
• Interest: ${leadData.interest}
• EOI Number: ${eoiNumber}
• Source: Popup Lead Capture
• Time: ${new Date().toLocaleString('en-IN')}

🎯 *Action Required:*
Please contact this lead immediately for priority booking!`;
            
            // Send WhatsApp notification
            const whatsappUrl = `https://wa.me/919760393545?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Send confirmation email to customer
            const customerEmail = leadData.email;
            const customerSubject = `Your EOI Confirmation - Jacob & Co. x M3M (${eoiNumber})`;
            const customerBody = `Dear ${leadData.name},

Thank you for your interest in Jacob & Co. x M3M luxury residences!

📋 Your EOI Details:
• EOI Number: ${eoiNumber}
• Property Interest: ${leadData.interest}
• Nationality: ${leadData.nationality}
• Submission Time: ${new Date().toLocaleString('en-IN')}

🎯 What's Next:
1. Our team will contact you within 24 hours
2. You'll receive exclusive floor plans
3. Priority booking access for soft launch pricing
4. Investment analysis report

📞 Contact Us:
Phone: +91 9760393545
Email: kunwarsinghrawat@gmail.com

Thank you for choosing Jacob & Co. x M3M!

Best regards,
Kunwar Singh Rawat
Jacob & Co. x M3M Team`;

            const customerEmailUrl = `mailto:${customerEmail}?subject=${encodeURIComponent(customerSubject)}&body=${encodeURIComponent(customerBody)}`;
            
            // Open customer email
            window.open(customerEmailUrl, '_blank');
            
            // Show success message
            showNotification('🎉 Thank you! Your EOI number is ' + eoiNumber + '. We will contact you soon!', 'success');
            
            // Reset form
            this.reset();
            
            // Reset button state
            submitBtn.classList.remove('loading');
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            
            // Close popup after 3 seconds
            setTimeout(() => {
                closePopup();
            }, 3000);
        });
    }
});
