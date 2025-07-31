# ATS Checker - Frontend & Backend Integration Guide

## 🚀 Complete Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenAI API Key

### 1. Backend Setup (Express + OpenAI)

#### Navigate to backend directory:
```bash
cd AtsChecker/chat-backend
```

#### Install dependencies:
```bash
npm install
```

#### Configure environment variables:
1. Copy `.env.example` to `.env`:
```bash
copy .env.example .env
```

2. Edit `.env` file and add your OpenAI API key:
```env
OPENAI_API_KEY=your_actual_openai_api_key_here
PORT=3001
```

#### Start the backend server:
```bash
# For production
npm start

# For development (with auto-restart)
npm run dev
```

The backend will run on `http://localhost:3001`

### 2. Frontend Setup (React + Vite)

#### Navigate to frontend directory:
```bash
cd AtsChecker
```

#### Install dependencies (if not already done):
```bash
npm install
```

#### Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 3. Testing the Integration

1. **Start Backend First**: Make sure the backend is running on port 3001
2. **Start Frontend**: Launch the React app on port 5173
3. **Login**: Use any name and email to access the chat
4. **Check Connection**: Look for "Backend Connected" status in the chat header
5. **Send Message**: Type an ATS-related question and hit send

### 4. API Endpoints

#### Backend Endpoints:
- `GET /health` - Health check endpoint
- `POST /api/chat` - Main chat endpoint

#### Example API Request:
```javascript
POST http://localhost:3001/api/chat
Content-Type: application/json

{
  "message": "How do I optimize my resume for ATS?",
  "context": [
    {"role": "user", "content": "Previous message"},
    {"role": "assistant", "content": "Previous response"}
  ]
}
```

### 5. Features Implemented

#### Frontend Features:
- ✅ Real-time chat interface
- ✅ Backend connection status indicator
- ✅ Error handling and display
- ✅ Message history persistence
- ✅ Typing indicators
- ✅ Responsive design
- ✅ Dark/Light theme toggle

#### Backend Features:
- ✅ OpenAI GPT-3.5-turbo integration
- ✅ ATS-focused system prompt
- ✅ Conversation context handling
- ✅ Error handling (API key, quota, etc.)
- ✅ CORS enabled for frontend
- ✅ Health check endpoint

### 6. Troubleshooting

#### Backend Issues:
- **"Invalid API Key"**: Check your OpenAI API key in `.env`
- **"Quota Exceeded"**: Check your OpenAI billing and usage
- **Port 3001 in use**: Change PORT in `.env` file

#### Frontend Issues:
- **"Backend Offline"**: Ensure backend is running on port 3001
- **CORS errors**: Backend has CORS enabled, check if backend is accessible
- **Connection failed**: Verify backend URL in `src/services/chatAPI.js`

#### Common Solutions:
1. Restart both servers
2. Check console for error messages
3. Verify OpenAI API key is valid
4. Ensure both servers are running on correct ports

### 7. File Structure

```
AtsChecker/
├── chat-backend/           # Express backend
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   ├── .env              # Environment variables
│   └── .env.example      # Environment template
├── src/                   # React frontend
│   ├── components/        # React components
│   ├── hooks/            # Custom hooks
│   ├── services/         # API services
│   └── ...
└── package.json          # Frontend dependencies
```

### 8. Next Steps

- Add file upload for resume analysis
- Implement user authentication
- Add more ATS optimization features
- Deploy to production
- Add rate limiting and security measures

## 🎉 You're All Set!

Your ATS Checker app now has full frontend-backend integration with OpenAI! Users can chat with an AI assistant specialized in ATS optimization advice.