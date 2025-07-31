import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Chat backend is running' });
});

// Comprehensive ChatGPT-like response system for when OpenAI is unavailable
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

  // Greetings
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('good morning') || lowerMessage.includes('good evening')) {
    return "Hello! I'm an AI assistant created by Tushar Parajapti. I'm here to help answer your questions and provide assistance on any topic. What would you like to know?";
  }

  // Math and calculations
  if (lowerMessage.includes('calculate') || lowerMessage.includes('math') || lowerMessage.includes('solve') || /\d+[\+\-\*\/]\d+/.test(lowerMessage)) {
    // Try to perform simple calculations
    const mathMatch = message.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);
    if (mathMatch) {
      const [, num1, operator, num2] = mathMatch;
      const a = parseFloat(num1);
      const b = parseFloat(num2);
      let result;
      switch (operator) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = b !== 0 ? a / b : 'Cannot divide by zero'; break;
        default: result = 'Invalid operation';
      }
      return `The answer is: ${result}`;
    }
    return "I can help with math calculations! Please provide your mathematical expression and I'll solve it for you.";
  }

  // Programming questions
  if (lowerMessage.includes('javascript') || lowerMessage.includes('python') || lowerMessage.includes('react') ||
    lowerMessage.includes('programming') || lowerMessage.includes('code') || lowerMessage.includes('html') ||
    lowerMessage.includes('css') || lowerMessage.includes('node') || lowerMessage.includes('api')) {
    return "I'd be happy to help with programming! I can assist with JavaScript, Python, React, HTML, CSS, Node.js, APIs, and many other programming topics. What specific programming question do you have?";
  }

  // Science questions
  if (lowerMessage.includes('science') || lowerMessage.includes('physics') || lowerMessage.includes('chemistry') ||
    lowerMessage.includes('biology') || lowerMessage.includes('astronomy') || lowerMessage.includes('earth')) {
    return "Science is fascinating! I can help explain concepts in physics, chemistry, biology, astronomy, earth science, and more. What scientific topic interests you?";
  }

  // History questions
  if (lowerMessage.includes('history') || lowerMessage.includes('historical') || lowerMessage.includes('ancient') ||
    lowerMessage.includes('war') || lowerMessage.includes('civilization')) {
    return "History is full of interesting stories and lessons! I can discuss various historical periods, events, civilizations, and figures. What historical topic would you like to explore?";
  }

  // Geography questions
  if (lowerMessage.includes('geography') || lowerMessage.includes('country') || lowerMessage.includes('capital') ||
    lowerMessage.includes('continent') || lowerMessage.includes('ocean') || lowerMessage.includes('mountain')) {
    return "Geography covers our amazing world! I can help with information about countries, capitals, continents, oceans, mountains, and geographical features. What would you like to know?";
  }

  // Literature and writing
  if (lowerMessage.includes('literature') || lowerMessage.includes('book') || lowerMessage.includes('write') ||
    lowerMessage.includes('story') || lowerMessage.includes('poem') || lowerMessage.includes('author')) {
    return "Literature and writing are wonderful forms of expression! I can help with writing tips, discuss books and authors, analyze literature, or help with creative writing. What interests you?";
  }

  // Technology questions
  if (lowerMessage.includes('technology') || lowerMessage.includes('computer') || lowerMessage.includes('software') ||
    lowerMessage.includes('internet') || lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
    return "Technology shapes our modern world! I can discuss computers, software, internet, AI, mobile technology, and emerging tech trends. What technology topic interests you?";
  }

  // Health and medicine
  if (lowerMessage.includes('health') || lowerMessage.includes('medicine') || lowerMessage.includes('medical') ||
    lowerMessage.includes('doctor') || lowerMessage.includes('disease') || lowerMessage.includes('fitness')) {
    return "Health and medicine are important topics! I can provide general information about health, fitness, medical concepts, and wellness. However, for specific medical advice, always consult healthcare professionals. What would you like to know?";
  }

  // Food and cooking
  if (lowerMessage.includes('food') || lowerMessage.includes('cook') || lowerMessage.includes('recipe') ||
    lowerMessage.includes('cuisine') || lowerMessage.includes('restaurant') || lowerMessage.includes('nutrition')) {
    return "Food and cooking are delightful topics! I can share information about cuisines, cooking techniques, nutrition, recipes, and food culture. What culinary topic interests you?";
  }

  // Sports and games
  if (lowerMessage.includes('sport') || lowerMessage.includes('game') || lowerMessage.includes('football') ||
    lowerMessage.includes('basketball') || lowerMessage.includes('cricket') || lowerMessage.includes('olympics')) {
    return "Sports and games bring people together! I can discuss various sports, rules, history, famous athletes, and gaming. What sport or game would you like to talk about?";
  }

  // Music and arts
  if (lowerMessage.includes('music') || lowerMessage.includes('art') || lowerMessage.includes('painting') ||
    lowerMessage.includes('song') || lowerMessage.includes('instrument') || lowerMessage.includes('artist')) {
    return "Music and arts enrich our lives! I can discuss musical genres, instruments, famous artists, art movements, and creative expression. What artistic topic interests you?";
  }

  // Business and economics
  if (lowerMessage.includes('business') || lowerMessage.includes('economy') || lowerMessage.includes('market') ||
    lowerMessage.includes('finance') || lowerMessage.includes('investment') || lowerMessage.includes('startup')) {
    return "Business and economics drive our global society! I can discuss business concepts, economic principles, markets, entrepreneurship, and financial topics. What would you like to explore?";
  }

  // Education questions
  if (lowerMessage.includes('education') || lowerMessage.includes('school') || lowerMessage.includes('university') ||
    lowerMessage.includes('study') || lowerMessage.includes('learn') || lowerMessage.includes('student')) {
    return "Education opens doors to knowledge! I can help with study tips, explain academic concepts, discuss educational systems, and support learning. What educational topic can I help with?";
  }

  // Philosophy and psychology
  if (lowerMessage.includes('philosophy') || lowerMessage.includes('psychology') || lowerMessage.includes('mind') ||
    lowerMessage.includes('consciousness') || lowerMessage.includes('ethics') || lowerMessage.includes('meaning')) {
    return "Philosophy and psychology explore the depths of human thought and behavior! I can discuss philosophical concepts, psychological principles, ethics, and questions about consciousness and meaning. What interests you?";
  }

  // Travel questions
  if (lowerMessage.includes('travel') || lowerMessage.includes('vacation') || lowerMessage.includes('tourism') ||
    lowerMessage.includes('visit') || lowerMessage.includes('trip') || lowerMessage.includes('destination')) {
    return "Travel broadens our horizons! I can share information about destinations, travel tips, cultures, landmarks, and tourism. Where would you like to explore or what travel topic interests you?";
  }

  // Weather and climate
  if (lowerMessage.includes('weather') || lowerMessage.includes('climate') || lowerMessage.includes('rain') ||
    lowerMessage.includes('temperature') || lowerMessage.includes('storm') || lowerMessage.includes('season')) {
    return "Weather and climate affect our daily lives! I can explain weather patterns, climate systems, seasonal changes, and meteorological phenomena. What weather-related topic would you like to know about?";
  }

  // How-to questions
  if (lowerMessage.includes('how to') || lowerMessage.includes('how do') || lowerMessage.includes('tutorial') ||
    lowerMessage.includes('guide') || lowerMessage.includes('steps')) {
    return "I love helping with how-to questions! I can provide step-by-step guidance on many topics. What specific task or skill would you like help with?";
  }

  // Why questions
  if (lowerMessage.includes('why') || lowerMessage.includes('reason') || lowerMessage.includes('because') ||
    lowerMessage.includes('explain')) {
    return "Great question! I enjoy explaining the 'why' behind things. Please share your specific question and I'll do my best to provide a clear explanation.";
  }

  // What questions
  if (lowerMessage.includes('what is') || lowerMessage.includes('what are') || lowerMessage.includes('define') ||
    lowerMessage.includes('definition')) {
    return "I can help define and explain concepts! Please share what specific term or topic you'd like me to explain.";
  }

  // Time and date questions
  if (lowerMessage.includes('time') || lowerMessage.includes('date') || lowerMessage.includes('calendar') ||
    lowerMessage.includes('today') || lowerMessage.includes('tomorrow')) {
    const now = new Date();
    return `Today is ${now.toDateString()} and the current time is ${now.toLocaleTimeString()}. How can I help you with time-related questions?`;
  }

  // Random facts
  if (lowerMessage.includes('fact') || lowerMessage.includes('interesting') || lowerMessage.includes('random') ||
    lowerMessage.includes('tell me something')) {
    const facts = [
      "Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!",
      "The human brain contains approximately 86 billion neurons, each connected to thousands of others, creating trillions of connections!",
      "A group of flamingos is called a 'flamboyance' - quite fitting for such colorful birds!",
      "The shortest war in history lasted only 38-45 minutes between Britain and Zanzibar in 1896.",
      "Octopuses have three hearts and blue blood! Two hearts pump blood to the gills, while the third pumps blood to the rest of the body."
    ];
    return facts[Math.floor(Math.random() * facts.length)];
  }

  // Default comprehensive response
  return `I'm an AI assistant created by Tushar Parajapti, and I'm here to help with any questions you have! I can assist with:

📚 Education & Learning
💻 Programming & Technology  
🔬 Science & Mathematics
📖 Literature & Writing
🎨 Arts & Music
🏃 Sports & Health
🌍 Geography & Travel
📈 Business & Economics
🤔 Philosophy & Psychology
🍳 Food & Cooking
📰 Current Events & History

Just ask me anything you're curious about, and I'll do my best to provide helpful information!`;
};

// Chat endpoint
app.post('/api/chat', async (req, res) => {
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

      return res.json({
        success: true,
        message: reply,
        usage: { total_tokens: reply.length },
        source: 'gemini'
      });

    } catch (geminiError) {
      console.log('Google Gemini API failed, using mock responses:', geminiError.message);

      // Use mock responses as fallback
      const mockResponse = getMockResponse(message);

      return res.json({
        success: true,
        message: `${mockResponse}\n\n💡 Note: Currently using offline mode due to AI API limitations. For full AI-powered responses, please check your API configuration.`,
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
});

// Start server
app.listen(PORT, () => {
  console.log(`Chat backend server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});