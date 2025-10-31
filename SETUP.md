# 🚀 Quick Setup Guide

Follow these steps to get your AudioBook Story Teller up and running!

## Step 1: Install Node.js

If you don't have Node.js installed:
- Download from [https://nodejs.org](https://nodejs.org)
- Install version 16 or higher
- Verify installation: `node --version`

## Step 2: Get Google Gemini API Key

1. Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

## Step 3: Configure Environment Variables

1. Open the `.env` file in the project root
2. Replace `your-gemini-api-key-here` with your actual API key
3. Optionally change `mySecretKey123` to your preferred secret key

Example:
```env
VITE_SECRET_KEY=myCustomPassword2024
VITE_GEMINI_API_KEY=AIzaSyC...your-actual-key...xyz
```

## Step 4: Install Dependencies

Open terminal in the project directory and run:
```bash
npm install
```

This will install all required packages (React, Vite, Google Gemini AI, etc.)

## Step 5: Start the Development Server

```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

## Step 6: Open in Browser

1. Open your browser
2. Go to `http://localhost:3000`
3. Enter your secret key (the one you set in `.env`)
4. Start generating and listening to stories!

## 🎉 That's it!

You're ready to enjoy AI-generated stories with audio narration!

## 📱 Testing on Mobile

1. Make sure your phone and computer are on the same WiFi network
2. Run `npm run dev -- --host`
3. The terminal will show a Network URL (e.g., `http://192.168.1.x:3000`)
4. Open that URL on your phone's browser

## 🌐 Deploying to Render (Optional)

See the main README.md file for detailed deployment instructions.

## ❓ Need Help?

If you encounter any issues:
1. Make sure Node.js is installed correctly
2. Check that your `.env` file has valid API keys
3. Try deleting `node_modules` folder and running `npm install` again
4. Make sure you're using a modern browser (Chrome, Edge, Safari)

Enjoy! 🎧📚

