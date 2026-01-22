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
        offerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = offerForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Get form data
            const formData = new FormData(offerForm);
            const data = Object.fromEntries(formData);
            
            try {
                // EmailJS credentials (public key is safe to expose in client-side code)
                const EMAILJS_PUBLIC_KEY = 'bXF5c1UFpUY4KtofM';
                const EMAILJS_SERVICE_ID = 'service_utvgzgj';
                const EMAILJS_TEMPLATE_ID = 'template_uco8l4a';
                
                // Prepare email parameters for EmailJS
                const emailParams = {
                    from_name: data.name,
                    from_email: data.email,
                    phone: data.phone,
                    property_address: data.property_address,
                    situation: data.situation || 'Not specified',
                    price_range: data.price_range || 'Not specified',
                    message: data.message || 'No additional details provided',
                    to_email: 'info@acruxtrust.com'
                };
                
                // Call EmailJS directly from the browser
                const emailjsPayload = {
                    service_id: EMAILJS_SERVICE_ID,
                    template_id: EMAILJS_TEMPLATE_ID,
                    user_id: EMAILJS_PUBLIC_KEY,
                    template_params: emailParams
                };
                
                const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(emailjsPayload)
                });

                const responseText = await response.text();

                if (response.ok) {
                    alert('Thank you for your submission! We will contact you within 24 hours with a fair cash offer.');
                    offerForm.reset();
                } else {
                    let errorMessage = 'Failed to send message. Please try again or call us at (305) 925-2475.';
                    
                    // Try to parse error details
                    try {
                        const errorJson = JSON.parse(responseText);
                        if (errorJson.error || errorJson.message) {
                            errorMessage = errorJson.error || errorJson.message;
                        }
                    } catch (e) {
                        // Not JSON, use the text response
                        if (responseText) {
                            errorMessage = responseText;
                        }
                    }
                    
                    throw new Error(errorMessage);
                }
            } catch (error) {
                console.error('Form submission error:', error);
                alert('There was an error sending your message. Please try again or call us at (305) 925-2475.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
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

