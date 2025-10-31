import { useState } from 'react'
import './AuthScreen.css'

function AuthScreen({ onAuthenticate }) {
  const [secretKey, setSecretKey] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const correctKey = import.meta.env.VITE_SECRET_KEY

    if (!correctKey) {
      setError('Secret key not configured. Please set VITE_SECRET_KEY in environment variables.')
      return
    }

    if (secretKey === correctKey) {
      setError('')
      onAuthenticate(true)
    } else {
      setError('Invalid secret key. Please try again.')
      setSecretKey('')
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">🎧 AudioBook Story Teller</h1>
          <p className="auth-subtitle">Enter your secret key to continue</p>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="Enter secret key"
              className="auth-input"
              autoFocus
            />
            {error && <div className="auth-error">{error}</div>}
            <button type="submit" className="auth-button">
              Unlock Stories
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthScreen

