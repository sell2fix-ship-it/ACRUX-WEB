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
        const requestData = req.body;

        // Prepare email parameters
        const emailParams = {
            from_name: requestData.name,
            from_email: requestData.email,
            phone: requestData.phone,
            property_address: requestData.property_address,
            situation: requestData.situation || 'Not specified',
            price_range: requestData.price_range || 'Not specified',
            message: requestData.message || 'No additional details provided',
            to_email: 'info@acruxtrust.com'
        };

        // Send email via EmailJS REST API
        // EmailJS API v1.0 uses JSON format
        const emailjsPayload = {
            service_id: SERVICE_ID,
            template_id: TEMPLATE_ID,
            user_id: PUBLIC_KEY,
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
        
        if (!response.ok) {
            console.error('EmailJS API error:', response.status, responseText);
            // Try to parse as JSON for detailed error, otherwise use text
            let errorDetails = responseText;
            try {
                const errorJson = JSON.parse(responseText);
                errorDetails = errorJson;
            } catch (e) {
                // Not JSON, use text as-is
            }
            return res.status(500).json({ 
                error: 'Failed to send email. Please try again later.',
                details: errorDetails
            });
        }

        // EmailJS returns "OK" text on success, not JSON
        console.log('EmailJS success:', response.status, responseText);

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
