document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });

        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
            });
        });
    }

    // Shared EmailJS sender
    async function sendViaEmailJS(params) {
        const emailjsPayload = {
            service_id: 'service_utvgzgj',
            template_id: 'template_uco8l4a',
            user_id: 'bXF5c1UFpUY4KtofM',
            template_params: {
                from_name: params.name,
                from_email: params.email || '',
                phone: params.phone,
                property_address: params.address || params.property_address || '',
                situation: params.situation || 'Not specified',
                price_range: params.price_range || 'Not specified',
                message: params.message || 'No additional details provided',
                to_email: 'info@acruxtrust.com'
            }
        };

        const response = await fetch('https://api.emailjs.com/api/v1.1/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emailjsPayload)
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text || 'Failed to send');
        }
    }

    // Generic form handler
    function attachFormHandler(formId) {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            try {
                await sendViaEmailJS(data);
                alert('Thank you for your submission! We will contact you within 24 hours with a fair cash offer.');
                form.reset();
            } catch (error) {
                console.error('Form submission error:', error);
                alert('There was an error sending your message. Please try again or call us at (305) 925-2475.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    // Attach to both forms
    attachFormHandler('offer-form');
    attachFormHandler('offer-form-2');

    // Smooth scroll
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
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            }
        });
    });

    // Header scroll shadow
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        }
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

        acruxPopup.addEventListener('click', function(e) {
            if (e.target === acruxPopup) {
                acruxPopup.classList.remove('active');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && acruxPopup.classList.contains('active')) {
                acruxPopup.classList.remove('active');
            }
        });
    }
});
