import Groq from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'
import { portfolioKnowledge, systemPrompt } from '@/lib/portfolio-knowledge'

// Initialize Groq - FREE and FAST! (optional)
const groq = process.env.GROQ_API_KEY ? new Groq({
  apiKey: process.env.GROQ_API_KEY
}) : null

// Simple prompt injection detection
function detectPromptInjection(message: string): boolean {
  const injectionPatterns = [
    /ignore (all |previous |above )?instructions/i,
    /forget (all |previous |everything)/i,
    /you are now/i,
    /new (instructions|rules|role)/i,
    /disregard (all |previous )/i,
    /system prompt/i,
    /act as/i,
    /pretend (to be|you are)/i
  ]
  
  return injectionPatterns.some(pattern => pattern.test(message))
}

// Fallback knowledge base responses (no API needed)
const knowledgeBase: Record<string, string> = {
  'skills': "Jan Padua is proficient in TypeScript, React, Next.js, Node.js, Tailwind CSS, and modern web technologies. He has expertise in full-stack development, cloud architecture, and security implementations including penetration testing and threat detection systems.",
  'education': "Jan has pursued continuous learning in web development, cloud technologies, and cybersecurity. He has completed certifications and training in modern development frameworks and security practices.",
  'experience': "Jan has built comprehensive portfolio projects including digital twin systems, security analytics platforms, and real-time threat detection dashboards. He demonstrates expertise in implementing secure authentication, API design, and real-time data visualization.",
  'goals': "Jan's career goals include advancing in security-focused development, building scalable cloud applications, and contributing to open-source security tools. He aims to combine technical excellence with proactive threat prevention.",
  'events': "Jan actively attends technology and security conferences, networking events, and professional development workshops to stay current with industry trends and best practices.",
  'certificates': "Jan has earned certifications in web development frameworks, cloud platforms, and security practices, demonstrating commitment to professional growth.",
  'security': "Jan has implemented comprehensive security systems including attack detection middleware, real-time analytics dashboards, and penetration testing frameworks. His security work demonstrates knowledge of SQL injection prevention, XSS protection, rate limiting, and bot detection.",
  'about': "I'm Jan Padua's Professional Digital Twin - designed to discuss his skills, experience, education, and career goals. I answer questions about his portfolio and expertise to help with interviews and professional inquiries."
}

// Generate contextual response based on keywords
function generateFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  // Check for keyword matches
  for (const [keyword, response] of Object.entries(knowledgeBase)) {
    if (lowerMessage.includes(keyword)) {
      return response
    }
  }
  
  // Check for common question patterns
  if (lowerMessage.includes('what') || lowerMessage.includes('tell')) {
    if (lowerMessage.includes('skill')) return knowledgeBase['skills']
    if (lowerMessage.includes('education') || lowerMessage.includes('school') || lowerMessage.includes('learn')) return knowledgeBase['education']
    if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('project')) return knowledgeBase['experience']
    if (lowerMessage.includes('goal') || lowerMessage.includes('career') || lowerMessage.includes('future')) return knowledgeBase['goals']
    if (lowerMessage.includes('event') || lowerMessage.includes('conference')) return knowledgeBase['events']
    if (lowerMessage.includes('certificate') || lowerMessage.includes('certified') || lowerMessage.includes('certification')) return knowledgeBase['certificates']
    if (lowerMessage.includes('secure') || lowerMessage.includes('security') || lowerMessage.includes('attack') || lowerMessage.includes('protect')) return knowledgeBase['security']
  }
  
  // Default helpful response
  return "I can help you learn about Jan Padua's skills, experience, education, certifications, and professional goals. Try asking: 'What are Jan's skills?' or 'Tell me about his experience' or 'What's his background?'"
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      )
    }

    // Check for prompt injection
    if (detectPromptInjection(message)) {
      return NextResponse.json({
        response: "I'm designed specifically to answer questions about Jan Padua's portfolio and background. How can I help you learn about his skills and experience?"
      })
    }

    // Try to use Groq API if configured
    if (groq && process.env.GROQ_API_KEY) {
      try {
        const completion = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: `${systemPrompt}\n\nPORTFOLIO INFORMATION:\n${portfolioKnowledge}` },
            { role: 'user', content: message }
          ],
          max_tokens: 300,
          temperature: 0.7
        })

        const response = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.'
        return NextResponse.json({ response })
      } catch (groqError: any) {
        console.warn('Groq API error, falling back to knowledge base:', groqError?.message)
        // Fall through to knowledge base
      }
    }

    // Use fallback knowledge base
    const response = generateFallbackResponse(message)
    return NextResponse.json({ response })

  } catch (error: any) {
    console.error('Chat API error:', error)
    
    return NextResponse.json({
      response: 'I can help answer questions about Jan Padua. Try asking about his skills, experience, or career goals!'
    })
  }
}
