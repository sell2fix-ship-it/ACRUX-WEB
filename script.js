// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
            });
        });
    }

    // Form Submission Handler
    const offerForm = document.getElementById('offer-form');
    if (offerForm) {
        offerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(offerForm);
            const data = Object.fromEntries(formData);
            
            // In a real application, you would send this data to a server
            // For now, we'll just show an alert
            alert('Thank you for your submission! We will contact you within 24 hours with a fair cash offer.\n\n' +
                  'In a production environment, this form would be submitted to a server.');
            
            // Reset form
            offerForm.reset();
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add scroll effect to header
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // Acrux Name Popup
    const acruxBtn = document.getElementById('acrux-name-btn');
    const acruxPopup = document.getElementById('acrux-popup');
    const popupClose = document.getElementById('popup-close');

    if (acruxBtn && acruxPopup) {
        acruxBtn.addEventListener('click', function() {
            acruxPopup.classList.add('active');
        });

        if (popupClose) {
            popupClose.addEventListener('click', function() {
                acruxPopup.classList.remove('active');
            });
        }

        // Close popup when clicking outside
        acruxPopup.addEventListener('click', function(e) {
            if (e.target === acruxPopup) {
                acruxPopup.classList.remove('active');
            }
        });

        // Close popup with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && acruxPopup.classList.contains('active')) {
                acruxPopup.classList.remove('active');
            }
        });
    }
});

