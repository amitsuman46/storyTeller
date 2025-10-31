import { useState, useEffect } from 'react'
import './App.css'
import AuthScreen from './components/AuthScreen'
import StoryGenerator from './components/StoryGenerator'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = sessionStorage.getItem('authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleAuthentication = (status) => {
    setIsAuthenticated(status)
    if (status) {
      sessionStorage.setItem('authenticated', 'true')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('authenticated')
  }

  return (
    <div className="app">
      {!isAuthenticated ? (
        <AuthScreen onAuthenticate={handleAuthentication} />
      ) : (
        <StoryGenerator onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App

