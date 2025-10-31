# 🎧 AudioBook Story Teller

A beautiful React application that generates stories using Google Gemini AI and narrates them with synchronized word highlighting. Built with Vite for fast development and optimized performance.

## ✨ Features

- 🔐 **Secure Authentication** - Protected access with secret key
- 🤖 **AI Story Generation** - Powered by Google Gemini API
- 🎭 **Multiple Genres** - Fantasy, Sci-Fi, Mystery, Romance, Horror, Adventure, Comedy, Thriller
- 🗣️ **Text-to-Speech** - Female voice narration using Web Speech API (100% free)
- 🎨 **Word Highlighting** - Real-time word highlighting synchronized with audio
- 📱 **Responsive Design** - Works perfectly on mobile phones, tablets, and laptops
- 🎬 **Playback Controls** - Play, Pause, Stop, and Reset functionality

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone or download this project**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SECRET_KEY=your-secret-key-here
   VITE_GEMINI_API_KEY=your-gemini-api-key-here
   ```

   - `VITE_SECRET_KEY`: Your custom secret key for authentication (choose any password)
   - `VITE_GEMINI_API_KEY`: Your Google Gemini API key

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🌐 Deploying to Render

### Step 1: Prepare Your Repository

1. Initialize git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Push to GitHub/GitLab:
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

### Step 2: Deploy on Render

1. **Sign up/Login to Render**
   - Go to [https://render.com](https://render.com)
   - Sign up or log in with your GitHub/GitLab account

2. **Create a New Static Site**
   - Click "New +" button
   - Select "Static Site"
   - Connect your repository

3. **Configure the Build Settings**
   - **Name**: `audiobook-story-teller` (or your preferred name)
   - **Branch**: `main` (or your default branch)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Add Environment Variables**
   - Click "Advanced" or go to "Environment" tab after creation
   - Add the following environment variables:
     - `VITE_SECRET_KEY`: Your secret key for authentication
     - `VITE_GEMINI_API_KEY`: Your Google Gemini API key

5. **Deploy**
   - Click "Create Static Site"
   - Wait for the build to complete (usually 2-5 minutes)
   - Your app will be live at `https://your-app-name.onrender.com`

### Step 3: Share with Friends

1. Get your Render URL (e.g., `https://audiobook-story-teller.onrender.com`)
2. Share the URL and the `VITE_SECRET_KEY` with your friends
3. They can access the app by entering the secret key

## 🔧 Configuration Options

### Changing Story Length

Edit `src/services/geminiService.js` and modify the word count in the prompts:
```javascript
const genrePrompts = {
  fantasy: 'Write a captivating fantasy short story... Keep it around 200-300 words.',
  // Change to: Keep it around 500-600 words.
}
```

### Adjusting Voice Settings

Edit `src/components/StoryPlayer.jsx` to customize the voice:
```javascript
utterance.rate = 0.9 // Speech speed (0.1 to 10)
utterance.pitch = 1.1 // Voice pitch (0 to 2)
utterance.volume = 1 // Volume (0 to 1)
```

### Adding More Genres

Edit `src/components/StoryGenerator.jsx` to add new genres:
```javascript
const genres = [
  // Add your new genre
  { id: 'western', name: '🤠 Western', emoji: '🤠' },
]
```

Then add the prompt in `src/services/geminiService.js`:
```javascript
const genrePrompts = {
  western: 'Write an exciting western short story...',
}
```

## 🎨 Customization

### Colors and Theme

Edit the CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #6366f1; /* Change primary color */
  --secondary-color: #ec4899; /* Change secondary color */
  --background: #0f172a; /* Change background */
}
```

## 🆓 Free Services Used

- **Google Gemini API**: Free tier with generous limits
- **Web Speech API**: Built into browsers, completely free
- **Render**: Free tier for static sites (750 hours/month)

## 🔒 Security Notes

- Never commit your `.env` file to git
- Keep your `VITE_SECRET_KEY` and `VITE_GEMINI_API_KEY` private
- Only share the secret key with trusted friends
- On Render, environment variables are stored securely

## 📝 Usage

1. **Login**: Enter the secret key provided to you
2. **Select Genre**: Choose from 8 different story genres
3. **Generate**: Click "Generate Story" to create a new story
4. **Listen**: Click "Play" to start narration with word highlighting
5. **Controls**: Use Pause, Stop, or New Story buttons as needed

## 🐛 Troubleshooting

### Story Generation Fails
- Check if your Gemini API key is valid
- Ensure you haven't exceeded the API quota
- Check your internet connection

### No Voice/Audio
- Ensure your browser supports Web Speech API (Chrome, Edge, Safari recommended)
- Check if your device volume is not muted
- Try a different browser

### Build Issues
- Delete `node_modules` and run `npm install` again
- Clear npm cache: `npm cache clean --force`
- Ensure Node.js version is 16 or higher

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

This project is open source and available for personal use.

## 🙏 Acknowledgments

- Google Gemini AI for story generation
- Web Speech API for text-to-speech
- Render for free hosting
- React and Vite for the amazing developer experience

---

**Enjoy your storytelling experience!** 📚✨

