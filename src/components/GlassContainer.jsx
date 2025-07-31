import { useState } from 'react'
import sendIcon from '../assets/image.png'
import ChatMessage from './ChatMessage'
import LoadingSpinner from './LoadingSpinner'
import ThemeToggle from './ThemeToggle'
import LoginForm from './LoginForm'
import { useChat } from '../hooks/useChat'

function GlassContainer() {
    const [inputMessage, setInputMessage] = useState('')
    const {
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
    } = useChat()

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (inputMessage.trim()) {
            sendMessage(inputMessage)
            setInputMessage('')
        }
    }

    // Show login form if user is not logged in
    if (!currentUser) {
        return (
            <div className="w-full h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
                <div className="w-full h-full bg-transparent backdrop-blur-lg rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-dashed border-blue-300/70 dark:border-purple-400/70 shadow-xl">
                    <div className="absolute top-4 right-4">
                        <ThemeToggle />
                    </div>
                    <LoginForm onLogin={login} />
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="w-full h-full bg-transparent backdrop-blur-lg rounded-xl sm:rounded-2xl md:rounded-3xl border-2 border-dashed border-blue-300/70 dark:border-purple-400/70 shadow-xl">
                <div className="w-full h-full flex flex-col relative px-4 sm:px-6 md:px-8">
                    {/* Chat Header */}
                    <div className="flex items-center justify-between py-4 sm:py-6 border-b border-white/10 dark:border-gray-600/20">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-sm sm:text-base">
                                    {currentUser.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white dark:text-gray-100 drop-shadow-lg">
                                    Welcome, {currentUser.name}
                                </h1>
                                <p className="text-xs sm:text-sm text-white/70 dark:text-gray-300 font-medium">
                                    {currentUser.email}
                                </p>
                                <div className="flex items-center space-x-1 mt-1">
                                    <div className={`w-2 h-2 rounded-full ${
                                        isConnected 
                                            ? 'bg-green-400 animate-pulse' 
                                            : 'bg-red-400 animate-pulse'
                                    }`}></div>
                                    <span className={`text-xs font-medium ${
                                        isConnected 
                                            ? 'text-green-300 dark:text-green-400' 
                                            : 'text-red-300 dark:text-red-400'
                                    }`}>
                                        {isConnected ? 'Backend Connected' : 'Backend Offline'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 sm:space-x-6">
                            {/* User Email Display (Mobile Hidden) */}
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-sm font-semibold text-white dark:text-gray-100">
                                    {currentUser.name}
                                </span>
                                <span className="text-xs text-white/70 dark:text-gray-400">
                                    {currentUser.email}
                                </span>
                            </div>

                            {/* Separator */}
                            <div className="hidden sm:block w-px h-8 bg-white/20 dark:bg-gray-600/30"></div>

                            {/* Theme Toggle */}
                            <div className="flex items-center">
                                <ThemeToggle />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={clearHistory}
                                    className="p-2 sm:p-3 rounded-lg bg-white/20 dark:bg-gray-700/50 backdrop-blur-sm border border-white/30 dark:border-gray-600/50 hover:bg-white/30 dark:hover:bg-gray-600/50 transition-all duration-300 shadow-sm hover:shadow-md"
                                    title="Clear History"
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>

                                <button
                                    onClick={logout}
                                    className="p-2 sm:p-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm border border-red-400/30 hover:border-red-400/50 transition-all duration-300 shadow-sm hover:shadow-md"
                                    title="Logout"
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 hover:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Chat Messages Display Area */}
                    <div className="flex-1 mb-4 sm:mb-6 bg-white/10 dark:bg-gray-800/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-600/30 shadow-inner overflow-hidden">
                        <div className="h-full overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/20 dark:scrollbar-thumb-gray-600/50 scrollbar-track-transparent">
                            {isLoading ? (
                                <LoadingSpinner />
                            ) : (
                                <>
                                    {messages.map((message) => (
                                        <ChatMessage
                                            key={message.id}
                                            message={message.message}
                                            isOwn={message.isOwn}
                                            timestamp={message.timestamp}
                                            isError={message.isError}
                                        />
                                    ))}
                                    {isTyping && (
                                        <ChatMessage
                                            message=""
                                            isOwn={false}
                                            timestamp=""
                                            isTyping={true}
                                        />
                                    )}
                                    <div ref={messagesEndRef} />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Chat Message Input Area */}
                    <form onSubmit={handleSendMessage} className="flex justify-center">
                        <div className="w-full max-w-[500px] min-h-[80px] sm:min-h-[90px] md:min-h-[100px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl border-2 border-gray-400/70 dark:border-gray-600/70 shadow-lg hover:shadow-xl transition-all duration-300 relative">
                            <div className="flex items-center p-3 sm:p-4 gap-3">
                                {/* Message Input */}
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        placeholder="✨ Type your message here..."
                                        className="w-full pl-6 sm:pl-8 pr-4 py-2 sm:py-3 bg-gradient-to-r from-white/95 to-blue-50/90 dark:from-gray-700/95 dark:to-gray-600/90 rounded-lg sm:rounded-xl focus:outline-none transition-all duration-300 text-sm sm:text-base placeholder-purple-400/70 dark:placeholder-gray-400/70 placeholder:font-medium shadow-inner backdrop-blur-sm text-gray-800 dark:text-white"
                                        disabled={isLoading}
                                    />
                                </div>

                                {/* Send Button with Image Icon */}
                                <button
                                    type="submit"
                                    disabled={!inputMessage.trim() || isLoading}
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed p-3 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:transform-none min-w-[48px] sm:min-w-[56px]"
                                >
                                    <img
                                        src={sendIcon}
                                        alt="Send"
                                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain filter brightness-0 invert"
                                    />
                                </button>
                            </div>

                            {/* Online Status Indicator */}
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-800 shadow-sm animate-pulse"></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GlassContainer