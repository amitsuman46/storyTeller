import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

if (!API_KEY) {
  console.error('VITE_GEMINI_API_KEY is not set in environment variables')
}

const genAI = new GoogleGenerativeAI(API_KEY)

const genrePrompts = {
  fantasy: 'Write a captivating fantasy short story with magical elements, mythical creatures, and an enchanting world. Keep it around 500 - 600 words.',
  scifi: 'Write an exciting science fiction short story set in the future with advanced technology and space exploration. Keep it around 500 words.',
  mystery: 'Write an intriguing mystery short story with suspense, clues, and an unexpected twist. Keep it around 500 - 600 words.',
  romance: 'Write a heartwarming romance short story about two people falling in love with emotional depth. Keep it around 500 - 600 words.',
  horror: 'Write a chilling horror short story that creates suspense and fear with a spooky atmosphere. Keep it around 500 - 600 words.',
  adventure: 'Write an thrilling adventure short story with exploration, challenges, and exciting discoveries. Keep it around 500 - 600 words.',
  comedy: 'Write a hilarious comedy short story with funny situations and witty dialogue. Keep it around 500 - 600 words.',
  thriller: 'Write an intense thriller short story with high stakes, tension, and adrenaline-pumping action. Keep it around 500 - 600 words.'
}

export async function generateStory(genre) {
  if (!API_KEY) {
    throw new Error('Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your environment variables.')
  }

  try {
    // Using gemini-1.5-flash which is available in the free tier
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash'
    })
    const prompt = genrePrompts[genre] || genrePrompts.fantasy

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    if (!text || text.trim().length === 0) {
      throw new Error('Generated story is empty')
    }

    return text
  } catch (error) {
    console.error('Error generating story:', error)
    
    if (error.message?.includes('API key')) {
      throw new Error('Invalid API key. Please check your Gemini API configuration.')
    } else if (error.message?.includes('quota')) {
      throw new Error('API quota exceeded. Please try again later.')
    } else {
      throw new Error('Failed to generate story. Please try again.')
    }
  }
}

