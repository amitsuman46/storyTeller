import { useState } from 'react'
import './StoryGenerator.css'
import StoryPlayer from './StoryPlayer'
import { generateStory } from '../services/geminiService'

const genres = [
  { id: 'fantasy', name: '✨ Fantasy', emoji: '✨' },
  { id: 'scifi', name: '🚀 Sci-Fi', emoji: '🚀' },
  { id: 'mystery', name: '🔍 Mystery', emoji: '🔍' },
  { id: 'romance', name: '💖 Romance', emoji: '💖' },
  { id: 'horror', name: '👻 Horror', emoji: '👻' },
  { id: 'adventure', name: '🗺️ Adventure', emoji: '🗺️' },
  { id: 'comedy', name: '😂 Comedy', emoji: '😂' },
  { id: 'thriller', name: '⚡ Thriller', emoji: '⚡' },
]

function StoryGenerator({ onLogout }) {
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('english')
  const [story, setStory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerateStory = async () => {
    if (!selectedGenre) {
      setError('Please select a genre first!')
      return
    }

    setLoading(true)
    setError('')
    setStory('')

    try {
      const generatedStory = await generateStory(selectedGenre, selectedLanguage)
      setStory(generatedStory)
    } catch (err) {
      setError(err.message || 'Failed to generate story. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setStory('')
    setSelectedGenre('')
    setError('')
  }

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang)
    setSelectedGenre('') // Reset genre when changing language
  }

  return (
    <div className="story-generator">
      <header className="header">
        <h1>🎧 AudioBook Story Teller</h1>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </header>

      {!story ? (
        <div className="generator-container">
          <div className="language-section">
            <h2>Choose Language / भाषा चुनें</h2>
            <div className="language-buttons">
              <button
                className={`language-button ${selectedLanguage === 'english' ? 'selected' : ''}`}
                onClick={() => handleLanguageChange('english')}
                disabled={loading}
              >
                🇬🇧 English
              </button>
              <button
                className={`language-button ${selectedLanguage === 'hindi' ? 'selected' : ''}`}
                onClick={() => handleLanguageChange('hindi')}
                disabled={loading}
              >
                🇮🇳 हिंदी (Hindi)
              </button>
            </div>
          </div>

          <div className="genre-section">
            <h2>{selectedLanguage === 'hindi' ? 'अपनी कहानी की शैली चुनें' : 'Choose Your Story Genre'}</h2>
            <div className="genre-grid">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  className={`genre-button ${selectedGenre === genre.id ? 'selected' : ''}`}
                  onClick={() => setSelectedGenre(genre.id)}
                  disabled={loading}
                >
                  <span className="genre-emoji">{genre.emoji}</span>
                  <span className="genre-name">{genre.name.replace(/[^a-zA-Z\s]/g, '')}</span>
                </button>
              ))}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            className="generate-button"
            onClick={handleGenerateStory}
            disabled={loading || !selectedGenre}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                {selectedLanguage === 'hindi' ? 'आपकी कहानी बनाई जा रही है...' : 'Crafting Your Story...'}
              </>
            ) : (
              selectedLanguage === 'hindi' ? 'कहानी बनाएं' : 'Generate Story'
            )}
          </button>
        </div>
      ) : (
        <StoryPlayer story={story} genre={selectedGenre} language={selectedLanguage} onReset={handleReset} />
      )}
    </div>
  )
}

export default StoryGenerator

