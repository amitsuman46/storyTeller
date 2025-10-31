# 🎯 START HERE - Complete Setup in 5 Minutes!

Welcome to your **AudioBook Story Teller** app! Follow these simple steps to get started.

---

## 📋 Before You Begin

You need:
- ✅ Node.js installed (v16+) - [Download here](https://nodejs.org)
- ✅ A Google account (for Gemini API key)
- ✅ 5 minutes of your time

---

## 🚀 Setup Steps

### ⭐ STEP 1: Create .env File

**This is the most important step!**

1. In this project folder (where you see package.json), create a new file
2. Name it: `.env` (with the dot at the beginning)
3. Copy and paste this content:

```env
VITE_SECRET_KEY=mySecretPassword123
VITE_GEMINI_API_KEY=your-gemini-api-key-here
```

4. Keep this window open - we'll update the API key next

---

### ⭐ STEP 2: Get Your FREE Gemini API Key

1. Open a browser and go to: **https://makersuite.google.com/app/apikey**
2. Sign in with your Google account
3. Click **"Create API Key"** button
4. Copy the key (it looks like: `AIzaSyAbc123...`)
5. Go back to your `.env` file
6. Replace `your-gemini-api-key-here` with your actual key

Your `.env` file should now look like:
```env
VITE_SECRET_KEY=mySecretPassword123
VITE_GEMINI_API_KEY=AIzaSyAbc123xyz789...
```

**💡 Tip:** You can change `mySecretPassword123` to any password you want!

---

### ⭐ STEP 3: Install Dependencies

Open terminal/command prompt in this project folder and run:

```bash
npm install
```

Wait for it to finish (30-60 seconds). You'll see a bunch of packages being installed.

---

### ⭐ STEP 4: Start the App

In the same terminal, run:

```bash
npm run dev
```

You should see something like:
```
  ➜  Local:   http://localhost:3000/
```

---

### ⭐ STEP 5: Open in Browser

1. Open your favorite browser (Chrome, Edge, or Safari recommended)
2. Go to: **http://localhost:3000**
3. You'll see a beautiful login screen!

---

### ⭐ STEP 6: Login

Enter the secret key from your `.env` file (default: `mySecretPassword123`)

**🎉 You're in!**

---

## 🎮 How to Use

1. **Choose a Genre** - Click on any of the 8 genre cards (Fantasy, Sci-Fi, etc.)
2. **Generate Story** - Click the "Generate Story" button
3. **Wait 2-5 seconds** - Gemini AI is creating your unique story
4. **Click Play** - Listen to the story with a female voice
5. **Watch the Magic** - Words highlight in real-time as they're spoken!
6. **Control Playback** - Use Play, Pause, Stop buttons
7. **New Story** - Click "New Story" to start over

---

## 📱 Test on Your Phone

Want to test on your phone?

1. Make sure your phone and computer are on the same WiFi
2. Stop the dev server (Ctrl+C)
3. Run: `npm run dev -- --host`
4. Look for the **Network** URL (like `http://192.168.1.x:3000`)
5. Open that URL on your phone

---

## 🌐 Share with Friends (Deploy to Render)

Ready to share with your friends?

### Quick Render Deployment:

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Render:**
   - Go to [render.com](https://render.com) and sign up/login
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Settings:
     - **Build Command:** `npm install && npm run build`
     - **Publish Directory:** `dist`
   - Add environment variables:
     - `VITE_SECRET_KEY`: Your chosen password
     - `VITE_GEMINI_API_KEY`: Your Gemini key
   - Click "Create Static Site"

3. **Share with Friends:**
   - Get your Render URL: `https://your-app.onrender.com`
   - Share the URL + your secret password
   - They can access immediately!

---

## 🎨 Customization Ideas

### Change the Secret Key
Edit `.env` file and change `VITE_SECRET_KEY` to anything you want.

### Change Colors
Edit `src/index.css` and modify the CSS variables:
```css
:root {
  --primary-color: #6366f1; /* Change this! */
  --secondary-color: #ec4899; /* And this! */
}
```

### Change Voice Speed
Edit `src/components/StoryPlayer.jsx` line ~40:
```javascript
utterance.rate = 0.9 // Change to 0.5 (slower) or 1.5 (faster)
```

### Add More Genres
Edit `src/components/StoryGenerator.jsx` and add your genre to the `genres` array!

---

## ❓ Troubleshooting

### "Secret key not configured" error
- ❌ Your `.env` file is missing or incorrectly named
- ✅ Create `.env` in the project root with `VITE_SECRET_KEY`

### "Failed to generate story"
- ❌ Invalid or missing Gemini API key
- ✅ Check `VITE_GEMINI_API_KEY` in `.env` file

### No voice/No audio
- ❌ Browser doesn't support Web Speech API
- ✅ Try Chrome, Edge, or Safari
- ✅ Check if volume is not muted

### Changes not showing up
- ❌ Forgot to restart dev server
- ✅ Stop (Ctrl+C) and run `npm run dev` again

### Port 3000 already in use
- ❌ Another app is using port 3000
- ✅ Edit `vite.config.js` and change port to 3001

---

## 📚 Additional Resources

- **Full Documentation:** See `README.md`
- **Setup Guide:** See `SETUP.md`
- **Quick Reference:** See `QUICKSTART.txt`
- **Project Overview:** See `PROJECT_SUMMARY.md`

---

## 🎉 You're All Set!

Enjoy creating and listening to amazing AI-generated stories!

**Features you'll love:**
- 🤖 Unlimited story generation
- 🎧 Free text-to-speech
- 🎨 Beautiful word highlighting
- 📱 Works on phone & laptop
- 🌐 Easy to share with friends

**Need help?** Check the troubleshooting section above or the README.md file.

---

**Happy Storytelling! 📚✨**

Made with ❤️ using React, Vite, and Google Gemini AI

