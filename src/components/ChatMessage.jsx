function ChatMessage({ message, isOwn, timestamp, isTyping = false, isError = false }) {
    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3`}>
            <div className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg shadow-sm ${
                isError
                    ? 'bg-red-100 border border-red-300 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-red-200'
                    : isOwn 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                        : 'bg-white/90 backdrop-blur-sm text-gray-800 dark:bg-gray-700/90 dark:text-white'
            }`}>
                {isTyping ? (
                    <div className="flex items-center space-x-1">
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">typing...</span>
                    </div>
                ) : (
                    <>
                        <p className="text-sm">{message}</p>
                        <span className={`text-xs mt-1 block ${
                            isOwn ? 'text-blue-100 text-right' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                            {timestamp}
                        </span>
                    </>
                )}
            </div>
        </div>
    )
}

export default ChatMessage