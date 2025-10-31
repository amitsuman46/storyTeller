import { useState, useEffect, useRef } from 'react'
import './StoryPlayer.css'

function StoryPlayer({ story, genre, onReset }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(-1)
  const [words, setWords] = useState([])
  const [rate, setRate] = useState(0.95)
  const [pitch, setPitch] = useState(1.0)
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

      // Select the best natural-sounding female voice
      const voices = window.speechSynthesis.getVoices()
      
      // Priority list of natural-sounding female voices
      const preferredVoices = [
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
      
      // Find the best available voice
      let selectedVoice = null
      for (const preferred of preferredVoices) {
        selectedVoice = voices.find(voice => 
          voice.name.includes(preferred) && voice.lang.startsWith('en')
        )
        if (selectedVoice) break
      }
      
      // Fallback to any female or natural voice
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          (voice.name.toLowerCase().includes('female') || 
           voice.name.toLowerCase().includes('woman')) &&
          voice.lang.startsWith('en')
        )
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice
        console.log('Using voice:', selectedVoice.name)
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
      window.speechSynthesis.getVoices()
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
        </div>

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

