// Vercel Serverless Function for sending emails via EmailJS
// Environment variables are accessed via process.env

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get environment variables
        const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
        const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;

        // Validate environment variables
        if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
            console.error('Missing EmailJS environment variables');
            return res.status(500).json({ 
                error: 'Server configuration error. Please contact support.' 
            });
        }

        // Get form data from request body
        const formData = req.body;

        // Prepare email parameters
        const emailParams = {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            property_address: formData.property_address,
            situation: formData.situation || 'Not specified',
            price_range: formData.price_range || 'Not specified',
            message: formData.message || 'No additional details provided',
            to_email: 'info@acruxtrust.com'
        };

        // Send email via EmailJS API
        const response = await fetch(`https://api.emailjs.com/api/v1.0/email/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: SERVICE_ID,
                template_id: TEMPLATE_ID,
                user_id: PUBLIC_KEY,
                template_params: emailParams
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('EmailJS API error:', errorData);
            return res.status(500).json({ 
                error: 'Failed to send email. Please try again later.' 
            });
        }

        // Success
        return res.status(200).json({ 
            success: true, 
            message: 'Email sent successfully' 
        });

    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ 
            error: 'Internal server error. Please try again later.' 
        });
    }
}
