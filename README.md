# 🤖 AI Chat Assistant

A modern, full-stack AI chat application powered by Google Gemini AI, created by **Tushar Parajapti**.

## 🌟 **Live Demo**

🔗 **Try it now**: [https://ai-chat-assistant-tushar.netlify.app/)

## ✨ **Features**

- 🤖 **Real AI Responses** - Powered by Google Gemini 1.5 Flash
- 💬 **Universal Chat** - Ask anything: programming, science, math, general knowledge
- 🎨 **Modern UI** - Glass morphism design with dark/light themes
- 📱 **Responsive** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast & Reliable** - Built with React + Vite for optimal performance
- 🔒 **Secure** - Environment variables for API key protection

## 🎯 **What Can You Ask?**

- **Programming**: "How do I create a React component?"
- **Math**: "What is 25 * 47?"
- **Science**: "Explain quantum physics"
- **General**: "What's the capital of Japan?"
- **Creative**: "Write a poem about coding"
- **Creator**: "Who created you?" → Tushar Parajapti

## 🚀 **Quick Start**

### **For Users**
Just visit the live demo link above and start chatting!

### **For Developers**

#### **1. Clone the Repository**
\`\`\`bash
git clone https://github.com/your-username/AtsChecker.git
cd AtsChecker
\`\`\`

#### **2. Install Dependencies**
\`\`\`bash
# Frontend dependencies
npm install

# Backend dependencies
cd chat-backend
npm install
cd ..
\`\`\`

#### **3. Set Up Environment Variables**
Create \`chat-backend/.env\`:
\`\`\`env
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=3001
\`\`\`

#### **4. Run Development Servers**
\`\`\`bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
cd chat-backend
npm start
\`\`\`

#### **5. Build for Production**
\`\`\`bash
npm run build
\`\`\`

## 🛠️ **Tech Stack**

### **Frontend**
- **React 19.1.0** - Modern UI library
- **Vite 7.0.4** - Fast build tool and dev server
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **JavaScript ES6+** - Modern JavaScript features

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js 4.18.2** - Web framework
- **Google Generative AI** - Gemini 1.5 Flash model
- **CORS** - Cross-origin resource sharing
- **ES Modules** - Modern module system

### **Deployment**
- **Vercel** - Serverless deployment platform
- **GitHub Pages** - Static site hosting
- **GitHub Actions** - CI/CD pipeline

## 📁 **Project Structure**

\`\`\`
AtsChecker/
├── 🎨 Frontend (React App)
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── hooks/              # Custom hooks
│   │   ├── services/           # API services
│   │   └── assets/             # Static assets
│   ├── public/                 # Public files
│   └── dist/                   # Build output
│
├── 🔧 Backend (Express API)
│   ├── chat-backend/
│   │   ├── server.js           # Main server
│   │   ├── package.json        # Dependencies
│   │   └── .env               # Environment variables
│   └── api/                    # Serverless functions
│
└── 📚 Documentation
    ├── README.md               # This file
    ├── DEPLOYMENT_GUIDE.md     # Deployment instructions
    └── INTEGRATION_GUIDE.md    # Setup guide
\`\`\`

## 🌐 **Deployment Options**

### **1. Vercel (Recommended)**
\`\`\`bash
npx vercel
\`\`\`

### **2. Netlify**
\`\`\`bash
npm run build
npx netlify-cli deploy --prod --dir=dist
\`\`\`

### **3. GitHub Pages**
Push to GitHub and enable Pages in repository settings.

## 🔑 **Environment Variables**

| Variable | Description | Required |
|----------|-------------|----------|
| \`GEMINI_API_KEY\` | Google Gemini API key | Yes |
| \`PORT\` | Backend server port | No (default: 3001) |

## 🤝 **Contributing**

1. **Fork** the repository
2. **Create** a feature branch: \`git checkout -b feature/amazing-feature\`
3. **Commit** your changes: \`git commit -m 'Add amazing feature'\`
4. **Push** to the branch: \`git push origin feature/amazing-feature\`
5. **Open** a Pull Request

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 **Creator**

**Tushar Parajapti**
- 🌟 Full-stack developer passionate about AI and modern web technologies
- 💼 Specializes in React, Node.js, and AI integration
- 🚀 Building the future of conversational AI applications

## 🎉 **Acknowledgments**

- **Google Gemini AI** - For providing powerful AI capabilities
- **React Team** - For the amazing frontend framework
- **Vercel** - For seamless deployment platform
- **Open Source Community** - For inspiration and tools

## 📞 **Support**

If you have any questions or need help:
1. **Open an issue** on GitHub
2. **Check the documentation** in the \`docs/\` folder
3. **Review the deployment guides**

---

**⭐ If you found this project helpful, please give it a star on GitHub!**

**🔗 Live Demo**: [Try the AI Chat Assistant](https://your-username.github.io/AtsChecker)
