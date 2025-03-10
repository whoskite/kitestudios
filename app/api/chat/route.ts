import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

// Get Anthropic API key from environment variables
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

export async function POST(req: NextRequest) {
  // Check if user is authenticated
  const session = await getServerSession()
  
  if (!session) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    )
  }
  
  // Check if API key is available
  if (!ANTHROPIC_API_KEY) {
    console.error('Anthropic API key not found in environment variables')
    return NextResponse.json(
      { error: 'API configuration error' },
      { status: 500 }
    )
  }
  
  try {
    const { message, conversationHistory = [] } = await req.json()
    
    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        max_tokens: 1000,
        messages: [
          ...conversationHistory,
          { role: 'user', content: message }
        ],
        system: "You are Garu, the AI assistant for KITESTUDIOS. You're helpful, creative, and knowledgeable about design, art, and technology. Keep responses concise and in a friendly, professional tone."
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Anthropic API error:', errorData)
      throw new Error(`Anthropic API error: ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json({
      response: data.content[0].text,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error in chat API:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
} 