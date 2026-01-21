# Vercel Setup Instructions

## Environment Variables Setup

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following three environment variables:

   ```
   EMAILJS_PUBLIC_KEY = your-actual-public-key
   EMAILJS_SERVICE_ID = your-actual-service-id
   EMAILJS_TEMPLATE_ID = your-actual-template-id
   ```

4. Make sure to add them for **Production**, **Preview**, and **Development** environments
5. Redeploy your site after adding the variables

## Local Development (Testing Locally)

To test the form locally before deploying:

1. **Install Vercel CLI** (if you haven't already):
   ```bash
   npm install -g vercel
   ```

2. **Create a `.env.local` file** in the root directory:
   ```
   EMAILJS_PUBLIC_KEY=your-public-key-here
   EMAILJS_SERVICE_ID=your-service-id-here
   EMAILJS_TEMPLATE_ID=your-template-id-here
   ```

3. **Run the local dev server**:
   ```bash
   npm install
   npm run dev
   ```
   This will start a local server (usually at `http://localhost:3000`) that mimics Vercel's environment.

4. **Test your form** at the local URL - the `/api/send-email` endpoint will work!

**Note:** `.env.local` is already in `.gitignore` and won't be committed to version control.

## How It Works

- The form now sends data to `/api/send-email` (a Vercel serverless function)
- The serverless function uses your environment variables to send emails via EmailJS
- Your credentials are never exposed to the client-side code
- All email sending happens securely on the server
