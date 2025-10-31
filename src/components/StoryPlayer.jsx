import { useState, useEffect, useRef } from 'react'
import './StoryPlayer.css'

function StoryPlayer({ story, genre, language = 'english', onReset }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(-1)
  const [words, setWords] = useState([])
  const [rate, setRate] = useState(0.95)
  const [pitch, setPitch] = useState(1.0)
  const [showVoices, setShowVoices] = useState(false)
  const [availableVoices, setAvailableVoices] = useState([])
  const utteranceRef = useRef(null)
  const wordIndexRef = useRef(-1)

  useEffect(() => {
    // Split story into words with their positions
    const wordArray = story.split(/(\s+)/).filter(w => w.trim().length > 0)
    setWords(wordArray)
  }, [story])

  const speakStory = () => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(story)
      utteranceRef.current = utterance

      // Select the best natural-sounding voice based on language
      const voices = window.speechSynthesis.getVoices()
      
      // Debug: Log all available voices
      console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`).join(', '))
      
      let selectedVoice = null
      
      if (language === 'hindi') {
        // Set the language explicitly for Hindi
        utterance.lang = 'hi-IN'
        
        // Try to find Hindi voices with more flexible matching
        selectedVoice = voices.find(voice => 
          voice.lang && (
            voice.lang.toLowerCase().includes('hi-in') ||
            voice.lang.toLowerCase().includes('hi_in') ||
            voice.lang.toLowerCase().startsWith('hi')
          )
        )
        
        // Try matching by name if lang doesn't work
        if (!selectedVoice) {
          const hindiVoiceNames = ['hindi', 'हिंदी', 'lekha', 'hemant', 'kalpana']
          selectedVoice = voices.find(voice => 
            hindiVoiceNames.some(name => 
              voice.name.toLowerCase().includes(name)
            )
          )
        }
        
        if (selectedVoice) {
          console.log('✅ Found Hindi voice:', selectedVoice.name, '| Language:', selectedVoice.lang)
        } else {
          console.warn('⚠️ No Hindi voice found. Available voices:', voices.length)
          console.warn('Hindi voices might not be installed. Install Google Chrome for best Hindi support.')
        }
      } else {
        // Set the language explicitly for English
        utterance.lang = 'en-US'
        
        // Priority list for English voices
        const englishVoices = [
          'Samantha',           // macOS - Very natural
          'Alex',               // macOS - Natural male voice (backup)
          'Google US English',  // Google voices are natural
          'Google UK English Female',
          'Microsoft Zira',     // Windows - Natural
          'Microsoft Eva',      // Windows - Natural
          'Karen',              // macOS
          'Victoria',           // macOS
          'Fiona',              // macOS
          'Moira',              // macOS
          'Tessa',              // macOS
          'Serena',             // macOS
        ]
        
        for (const preferred of englishVoices) {
          selectedVoice = voices.find(voice => 
            voice.name.includes(preferred) && voice.lang.startsWith('en')
          )
          if (selectedVoice) break
        }
        
        // Fallback to any female or natural English voice
        if (!selectedVoice) {
          selectedVoice = voices.find(voice => 
            (voice.name.toLowerCase().includes('female') || 
             voice.name.toLowerCase().includes('woman')) &&
            voice.lang.startsWith('en')
          )
        }
        
        if (selectedVoice) {
          console.log('✅ Using English voice:', selectedVoice.name, '| Language:', selectedVoice.lang)
        }
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice
      } else {
        console.warn('⚠️ Using default browser voice for language:', language)
      }

      // Use user-controlled speech settings
      utterance.rate = rate    // User-adjustable speaking pace
      utterance.pitch = pitch  // User-adjustable pitch
      utterance.volume = 1

      // Word boundary event for highlighting
      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          const spokenText = story.substring(0, event.charIndex + event.charLength)
          const wordCount = spokenText.split(/\s+/).filter(w => w.length > 0).length
          wordIndexRef.current = wordCount - 1
          setCurrentWordIndex(wordCount - 1)
        }
      }

      utterance.onend = () => {
        setIsPlaying(false)
        setIsPaused(false)
        setCurrentWordIndex(-1)
        wordIndexRef.current = -1
      }

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event)
        setIsPlaying(false)
        setIsPaused(false)
      }

      window.speechSynthesis.speak(utterance)
      setIsPlaying(true)
      setIsPaused(false)
    } else {
      alert('Text-to-speech is not supported in your browser.')
    }
  }

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
    } else {
      speakStory()
    }
  }

  const handlePause = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause()
      setIsPaused(true)
    }
  }

  const handleStop = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
    setCurrentWordIndex(-1)
    wordIndexRef.current = -1
  }

  // Load voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      setAvailableVoices(voices)
      
      // Log Hindi voices specifically
      const hindiVoices = voices.filter(v => 
        v.lang && (v.lang.toLowerCase().includes('hi') || v.name.toLowerCase().includes('hindi'))
      )
      if (hindiVoices.length > 0) {
        console.log('✅ Hindi voices available:', hindiVoices.map(v => `${v.name} (${v.lang})`))
      } else {
        console.warn('⚠️ No Hindi voices found on this system')
      }
    }
    
    loadVoices()
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }

    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])

  return (
    <div className="story-player">
      <div className="player-controls">
        <div className="control-buttons">
          {!isPlaying || isPaused ? (
            <button className="control-button play" onClick={handlePlay}>
              ▶️ Play
            </button>
          ) : (
            <button className="control-button pause" onClick={handlePause}>
              ⏸️ Pause
            </button>
          )}
          <button className="control-button stop" onClick={handleStop} disabled={!isPlaying}>
            ⏹️ Stop
          </button>
          <button className="control-button reset" onClick={onReset}>
            🔄 New Story
          </button>
          <button 
            className="control-button info" 
            onClick={() => setShowVoices(!showVoices)}
          >
            {showVoices ? '🔼 Hide' : '🔽 Show'} Voices
          </button>
        </div>

        {showVoices && (
          <div className="voice-info">
            <h3>Available Voices ({availableVoices.length})</h3>
            {language === 'hindi' && (
              <div className="hindi-voices">
                <strong>Hindi Voices:</strong>
                {availableVoices.filter(v => 
                  v.lang && (v.lang.toLowerCase().includes('hi') || v.name.toLowerCase().includes('hindi'))
                ).length > 0 ? (
                  <ul>
                    {availableVoices
                      .filter(v => v.lang && (v.lang.toLowerCase().includes('hi') || v.name.toLowerCase().includes('hindi')))
                      .map((v, i) => (
                        <li key={i}>{v.name} ({v.lang})</li>
                      ))
                    }
                  </ul>
                ) : (
                  <p className="no-hindi">
                    ❌ No Hindi voices found. 
                    <br />
                    <strong>Solution:</strong> Use Google Chrome browser for Hindi support.
                  </p>
                )}
              </div>
            )}
            <details>
              <summary>All Voices</summary>
              <ul className="all-voices-list">
                {availableVoices.map((voice, index) => (
                  <li key={index}>
                    {voice.name} <span className="voice-lang">({voice.lang})</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        )}

        <div className="voice-controls">
          <div className="voice-control">
            <label>
              🎚️ Speed: <span className="control-value">{rate.toFixed(2)}x</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              disabled={isPlaying && !isPaused}
              className="voice-slider"
            />
          </div>
          <div className="voice-control">
            <label>
              🎵 Pitch: <span className="control-value">{pitch.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0.8"
              max="1.3"
              step="0.05"
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              disabled={isPlaying && !isPaused}
              className="voice-slider"
            />
          </div>
        </div>
      </div>

      <div className="story-content">
        <div className="story-text">
          {words.map((word, index) => (
            <span
              key={index}
              className={`word ${index === currentWordIndex ? 'highlighted' : ''} ${
                index < currentWordIndex ? 'played' : ''
              }`}
            >
              {word}{' '}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StoryPlayer

