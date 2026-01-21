# Email Form Setup Instructions

## Option 1: EmailJS (Recommended - Free for up to 200 emails/month)

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

### Step 2: Create an Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. **Copy your Service ID** (you'll need this)

### Step 3: Create an Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template structure:

**Subject:** New Property Inquiry from Acrux Trust Website

**Content (HTML):**
```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 12px">
  <div>A new property inquiry has been received from the Acrux Trust, Inc. website. Kindly respond at your earliest convenience.</div>
  <div
    style="
      margin-top: 20px;
      padding: 15px 0;
      border-width: 1px 0;
      border-style: dashed;
      border-color: lightgrey;
    "
  >
    <table role="presentation" style="width: 100%">
      <tr>
        <td style="vertical-align: top">
          <div
            style="
              padding: 6px 10px;
              margin: 0 10px;
              background-color: aliceblue;
              border-radius: 5px;
              font-size: 26px;
            "
            role="img"
          >
            👤
          </div>
        </td>
        <td style="vertical-align: top; width: 100%">
          <div style="color: #2c3e50; font-size: 16px; margin-bottom: 5px">
            <strong>{{from_name}}</strong>
          </div>
          <div style="color: #7f8c8d; font-size: 13px; margin-bottom: 15px">
            📧 {{from_email}} | 📞 {{phone}}
          </div>
          
          <div style="margin-bottom: 15px">
            <div style="color: #2c3e50; font-size: 14px; font-weight: bold; margin-bottom: 5px">Property Address:</div>
            <div style="font-size: 14px; color: #34495e">{{property_address}}</div>
          </div>
          
          <div style="margin-bottom: 15px">
            <div style="color: #2c3e50; font-size: 14px; font-weight: bold; margin-bottom: 5px">Situation:</div>
            <div style="font-size: 14px; color: #34495e">{{situation}}</div>
          </div>
          
          <div style="margin-bottom: 15px">
            <div style="color: #2c3e50; font-size: 14px; font-weight: bold; margin-bottom: 5px">Price Range:</div>
            <div style="font-size: 14px; color: #34495e">{{price_range}}</div>
          </div>
          
          <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ecf0f1">
            <div style="color: #2c3e50; font-size: 14px; font-weight: bold; margin-bottom: 5px">Additional Details:</div>
            <p style="font-size: 14px; color: #34495e; margin: 0; line-height: 1.6">{{message}}</p>
          </div>
        </td>
      </tr>
    </table>
  </div>
  <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #ecf0f1; color: #95a5a6; font-size: 11px; text-align: center">
    This email was sent from the Acrux Trust, Inc. website contact form.
  </div>
</div>
```

4. **Copy your Template ID** (you'll need this)

### Step 4: Get Your Public Key
1. Go to "Account" → "General"
2. **Copy your Public Key**

### Step 5: Update the Website Code
1. Open `script.js`
2. Replace `YOUR_PUBLIC_KEY` with your actual EmailJS Public Key
3. Replace `YOUR_SERVICE_ID` with your EmailJS Service ID
4. Replace `YOUR_TEMPLATE_ID` with your EmailJS Template ID
5. Update the `to_email` field with your actual email address (or remove it if you set it in the template)

### Step 6: Test the Form
1. Open the website
2. Fill out and submit the contact form
3. Check your email inbox for the form submission

---

## Option 2: Formspree (Alternative - Free for up to 50 submissions/month)

### Step 1: Create Formspree Account
1. Go to https://formspree.io/
2. Sign up for a free account
3. Verify your email address

### Step 2: Create a Form
1. In Formspree dashboard, click "New Form"
2. Enter your email address
3. **Copy your Form Endpoint URL** (looks like: https://formspree.io/f/YOUR_FORM_ID)

### Step 3: Update the Form
1. Open `index.html`
2. Find the form with id="offer-form"
3. Add this attribute: `action="YOUR_FORMSPREE_URL" method="POST"`
4. Update `script.js` to use Formspree instead of EmailJS

---

## Option 3: Backend Server (For Production)

If you have a backend server (Node.js, PHP, Python, etc.), you can:
1. Create an API endpoint to handle form submissions
2. Use a service like SendGrid, Mailgun, or AWS SES to send emails
3. Update the form to POST to your API endpoint

---

## Current Configuration

The form is currently set up for EmailJS. You need to:
1. Sign up at https://www.emailjs.com/
2. Get your Public Key, Service ID, and Template ID
3. Update the three placeholders in `script.js`:
   - `YOUR_PUBLIC_KEY`
   - `YOUR_SERVICE_ID`
   - `YOUR_TEMPLATE_ID`
4. Update the `to_email` field with your email address

---

## Quick Setup Checklist

- [ ] Create EmailJS account
- [ ] Set up email service (Gmail, Outlook, etc.)
- [ ] Create email template
- [ ] Get Public Key, Service ID, and Template ID
- [ ] Update script.js with your credentials
- [ ] Test the form submission
- [ ] Verify emails are being received

---

## Support

If you need help setting up EmailJS, visit their documentation:
https://www.emailjs.com/docs/
