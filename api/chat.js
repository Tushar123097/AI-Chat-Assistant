// Vercel serverless function for chat API
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Mock responses for when AI is unavailable
const getMockResponse = (message) => {
  const lowerMessage = message.toLowerCase();

  // Creator/developer questions
  if (lowerMessage.includes('who created') || lowerMessage.includes('who built') || lowerMessage.includes('who made') ||
    lowerMessage.includes('developer') || lowerMessage.includes('creator') || lowerMessage.includes('who developed')) {
    return "I was created and developed by Tushar Parajapti. He built this AI chat application to provide helpful assistance and answer questions on various topics.";
  }

  // Identity questions
  if (lowerMessage.includes('what are you') || lowerMessage.includes('who are you')) {
    return "I'm an AI assistant created by Tushar Parajapti. I'm designed to help answer questions, provide information, and assist with a wide variety of topics including programming, science, math, general knowledge, and more.";
  }

  // Default response
  return `I'm an AI assistant created by Tushar Parajapti, and I'm here to help with any questions you have! I can assist with programming, science, math, general knowledge, and much more. What would you like to know?`;
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Health check
  if (req.method === 'GET') {
    res.status(200).json({ status: 'OK', message: 'Chat API is running' });
    return;
  }

  // Chat endpoint
  if (req.method === 'POST') {
    try {
      const { message, context } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      // Try Google Gemini AI first
      try {
        // Build conversation history for context
        let conversationHistory = '';
        if (context && context.length > 0) {
          conversationHistory = context.map(msg => 
            `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
          ).join('\n') + '\n';
        }

        const systemPrompt = `You are a helpful AI assistant created by Tushar Parajapti. You can answer questions on a wide variety of topics including:
        - Programming and technology
        - General knowledge and information
        - Math and calculations
        - Science and education
        - Creative writing and content
        - Problem-solving and advice
        
        When asked about who created or developed you, always mention that you were created by Tushar Parajapti.
        Be helpful, friendly, and provide accurate information. If you're unsure about something, it's okay to say so.
        
        Previous conversation:
        ${conversationHistory}
        
        Current user message: ${message}`;

        const result = await model.generateContent(systemPrompt);
        const reply = result.response.text();

        return res.status(200).json({
          success: true,
          message: reply,
          usage: { total_tokens: reply.length },
          source: 'gemini'
        });

      } catch (geminiError) {
        console.log('Google Gemini API failed, using mock responses:', geminiError.message);

        // Use mock responses as fallback
        const mockResponse = getMockResponse(message);

        return res.status(200).json({
          success: true,
          message: `${mockResponse}\n\n💡 Note: Currently using offline mode due to AI API limitations.`,
          usage: { total_tokens: 0 },
          source: 'mock'
        });
      }

    } catch (error) {
      console.error('Chat API Error:', error);
      res.status(500).json({
        error: 'Failed to process chat request',
        details: error.message
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}