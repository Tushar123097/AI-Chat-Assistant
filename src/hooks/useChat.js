import { useState, useEffect, useRef } from 'react'
import { ChatAPI } from '../services/chatAPI'

export function useChat() {
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isTyping, setIsTyping] = useState(false)
    const [error, setError] = useState(null)
    const [isConnected, setIsConnected] = useState(false)
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem('chatUser')
        return saved ? JSON.parse(saved) : null
    })
    const messagesEndRef = useRef(null)

    // Load chat history from localStorage
    useEffect(() => {
        const loadMessages = () => {
            setIsLoading(true)
            setTimeout(() => {
                const savedMessages = localStorage.getItem('chatMessages')
                if (savedMessages) {
                    setMessages(JSON.parse(savedMessages))
                } else {
                    // Default messages if no history
                    setMessages([
                        {
                            id: 1,
                            message: "Hello! 👋 I'm an AI assistant created by Tushar Parajapti. I can help you with programming, technology, general questions, math, and much more! What would you like to know?",
                            isOwn: false,
                            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                            user: 'AI Assistant'
                        }
                    ])
                }
                setIsLoading(false)
            }, 1000)
        }
        
        if (currentUser) {
            loadMessages()
        }
    }, [currentUser])

    // Save messages to localStorage whenever messages change
    useEffect(() => {
        if (messages.length > 0 && !isLoading) {
            localStorage.setItem('chatMessages', JSON.stringify(messages))
        }
    }, [messages, isLoading])

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    // Check backend connection status
    useEffect(() => {
        const checkConnection = async () => {
            const connected = await ChatAPI.checkHealth()
            setIsConnected(connected)
        }
        
        if (currentUser) {
            checkConnection()
            // Check connection every 30 seconds
            const interval = setInterval(checkConnection, 30000)
            return () => clearInterval(interval)
        }
    }, [currentUser])

    const sendMessage = async (messageText) => {
        if (!messageText.trim() || !currentUser) return

        setError(null)
        
        const newMessage = {
            id: Date.now(),
            message: messageText,
            isOwn: true,
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            user: currentUser.name
        }

        setMessages(prev => [...prev, newMessage])
        setIsTyping(true)

        try {
            // Prepare context from recent messages
            const context = messages.slice(-5).map(msg => ({
                role: msg.isOwn ? 'user' : 'assistant',
                content: msg.message
            }))

            // Call the backend API
            const aiResponse = await ChatAPI.sendMessage(messageText, context)
            
            setIsTyping(false)
            
            const responseMessage = {
                id: Date.now() + 1,
                message: aiResponse,
                isOwn: false,
                timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                user: 'AI Assistant'
            }
            
            setMessages(prev => [...prev, responseMessage])
            
        } catch (error) {
            setIsTyping(false)
            setError(error.message)
            
            // Add error message to chat
            const errorMessage = {
                id: Date.now() + 1,
                message: `Sorry, I encountered an error: ${error.message}. Please make sure the backend server is running on http://localhost:3001`,
                isOwn: false,
                timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                user: 'System',
                isError: true
            }
            
            setMessages(prev => [...prev, errorMessage])
        }
    }

    const login = (userData) => {
        setCurrentUser(userData)
        localStorage.setItem('chatUser', JSON.stringify(userData))
    }

    const logout = () => {
        setCurrentUser(null)
        setMessages([])
        localStorage.removeItem('chatUser')
        localStorage.removeItem('chatMessages')
    }

    const clearHistory = () => {
        setMessages([])
        localStorage.removeItem('chatMessages')
    }

    return {
        messages,
        isLoading,
        isTyping,
        currentUser,
        messagesEndRef,
        sendMessage,
        login,
        logout,
        clearHistory,
        error,
        isConnected
    }
}