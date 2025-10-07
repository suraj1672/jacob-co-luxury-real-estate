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
document.addEventListener('DOMContentLoaded', function () {
    // Add smooth scrolling to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
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

    // Intersection Observer for reveal animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.mission-container, .showcase-grid, .staycation-content, .location-grid, .floorplans-grid, .info-card, .pricing-card, .contact-form');
    animatedElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // EOI Form handling
    const eoiForm = document.getElementById('eoiForm');
    if (eoiForm) {
        console.log('EOI Form found and event listener added');
        eoiForm.addEventListener('submit', function (e) {
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
            const eoiNumber = generateEnquiryNumber('EOI');

            // Get property name from URL or default
            const propertyName = document.title.includes('Jacob') ? 'Jacob & Co. x M3M' :
                document.title.includes('Experion') ? 'Experion 151' : 'Property';

            // Prepare data for Firebase
            const eoiData = {
                eoiNumber: eoiNumber,
                fullName: formObject.fullName,
                email: formObject.email,
                phone: formObject.phone,
                tower: formObject.tower || '',
                budget: formObject.budget || '',
                message: formObject.message || '',
                property: propertyName,
                source: 'Main EOI Form',
                status: 'new',
                submittedAt: new Date().toISOString()
            };

            // Save to Firebase Firestore
            saveToFirestore('eoi-submissions', eoiData)
                .then(result => {
                    if (result.success) {
                        // Show success message
                        showNotification(`EOI Generated Successfully! Your EOI Number: ${eoiNumber}. Our team will contact you within 24 hours.`, 'success');

                        // Reset form
                        this.reset();

                        console.log('EOI saved to Firebase:', result.id);
                    } else {
                        // Show error message
                        showNotification('Failed to submit EOI. Please try again or contact us directly.', 'error');
                        console.error('Firebase error:', result.error);
                    }
                })
                .catch(error => {
                    // Show error message
                    showNotification('An error occurred. Please try again.', 'error');
                    console.error('Error:', error);
                })
                .finally(() => {
                    // Reset button state
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-tour, .btn-eoi');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Property card hover effect
    const propertyCard = document.querySelector('.property-card');
    if (propertyCard) {
        propertyCard.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 25px 80px rgba(0, 0, 0, 0.15)';
        });

        propertyCard.addEventListener('mouseleave', function () {
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

// Image Gallery Functionality (Simplified for new design)
let currentImageIndex = 0;

// Floor Plan Modal Functionality
let currentZoom = 1;
const floorPlanImages = {
    '3bhk': 'assets/experion/experion2.jpeg',
    '3bhk-utility': 'assets/experion/experion3.jpeg',
    '4bhk-utility': 'assets/experion/experion4.png',
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
window.addEventListener('click', function (e) {
    const modal = document.getElementById('floorPlanModal');
    if (e.target === modal) {
        closeFloorPlanModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
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

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-editorial');
    if (hero) {
        const scrolled = window.pageYOffset;
        const heroImage = hero.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
});

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
document.addEventListener('DOMContentLoaded', function () {
    const popupOverlay = document.getElementById('popupOverlay');
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function (e) {
            if (e.target === this) {
                closePopup();
            }
        });
    }
});

// Close popup with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// Simple popup form submission
document.addEventListener('DOMContentLoaded', function () {
    console.log('Setting up popup form...');

    // Wait for popup to be ready
    setTimeout(function () {
        const popupForm = document.getElementById('popupForm');
        const popupSubmitBtn = document.getElementById('popupSubmitBtn');

        if (popupForm && popupSubmitBtn) {
            console.log('Popup form and button found');

            // Simple button click handler
            popupSubmitBtn.addEventListener('click', function (e) {
                e.preventDefault();
                console.log('Submit button clicked');
                submitPopupForm();
            });
        } else {
            console.log('Popup elements not found');
        }
    }, 2000);
});

// Simple popup form submission function
function submitPopupForm() {
    console.log('Submitting popup form...');

    // Get form elements
    const popupForm = document.getElementById('popupForm');
    const submitBtn = document.getElementById('popupSubmitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Get form data
    const name = document.getElementById('popupName').value;
    const email = document.getElementById('popupEmail').value;
    const phone = document.getElementById('popupPhone').value;
    const nationality = document.getElementById('popupNationality').value;
    const interest = document.getElementById('popupInterest').value;

    console.log('Form data:', { name, email, phone, nationality, interest });

    // Simple validation
    if (!name || !email || !phone || !nationality || !interest) {
        alert('Please fill in all required fields.');
        return;
    }

    // Show loading
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';

    // Generate EOI number
    const eoiNumber = generateEnquiryNumber('EOI');

    // Get property name from URL or default
    const propertyName = document.title.includes('Jacob') ? 'Jacob & Co. x M3M' :
        document.title.includes('Experion') ? 'Experion 151' : 'Property';

    // Prepare data for Firebase
    const popupEoiData = {
        eoiNumber: eoiNumber,
        fullName: name,
        email: email,
        phone: phone,
        nationality: nationality,
        interest: interest,
        property: propertyName,
        source: 'Priority Access Popup',
        status: 'new',
        submittedAt: new Date().toISOString()
    };

    // Save to Firebase Firestore
    saveToFirestore('eoi-submissions', popupEoiData)
        .then(result => {
            if (result.success) {
                // Show success message
                alert('✅ Request Submitted! Your EOI number is ' + eoiNumber + '. We will contact you soon!');

                // Close popup
                closePopup();

                // Reset form
                popupForm.reset();

                console.log('Popup EOI saved to Firebase:', result.id);
            } else {
                // Show error message
                alert('❌ Failed to submit. Please try again or contact us directly.');
                console.error('Firebase error:', result.error);
            }
        })
        .catch(error => {
            // Show error message
            alert('❌ An error occurred. Please try again.');
            console.error('Error:', error);
        })
        .finally(() => {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        });
}

// Test function to manually trigger popup form (for debugging)
function testPopupForm() {
    console.log('Testing popup form...');
    submitPopupForm();
}

// Make test function available globally for debugging
window.testPopupForm = testPopupForm;
