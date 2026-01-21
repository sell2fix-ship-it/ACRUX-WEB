# Local Testing Setup Guide

## Step 1: Install Node.js

1. Download Node.js from: https://nodejs.org/
2. Download the **LTS version** (recommended)
3. Run the installer and follow the setup wizard
4. **Restart your terminal/PowerShell** after installation

## Step 2: Verify Installation

Open a new terminal/PowerShell and run:
```bash
node --version
npm --version
```

Both should show version numbers if installed correctly.

## Step 3: Install Vercel CLI

Run this command:
```bash
npm install -g vercel
```

## Step 4: Create .env.local File

Create a file named `.env.local` in the root directory with your EmailJS credentials:

```
EMAILJS_PUBLIC_KEY=your-actual-public-key-here
EMAILJS_SERVICE_ID=your-actual-service-id-here
EMAILJS_TEMPLATE_ID=your-actual-template-id-here
```

**Replace the values with your actual EmailJS credentials!**

## Step 5: Start Local Development Server

Run this command in the project directory:
```bash
vercel dev
```

The first time, it will ask you to log in and link your project. Follow the prompts.

Once it's running, you'll see a URL like `http://localhost:3000` - open that in your browser and test the form!

## Step 6: Test the Form

1. Navigate to the contact form section
2. Fill out the form
3. Submit it
4. Check your email inbox for the submission

---

**Note:** When you're done testing, you can stop the server with `Ctrl+C` in the terminal.
