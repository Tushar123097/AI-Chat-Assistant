function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center py-8">
            <div className="relative">
                <div className="w-8 h-8 border-4 border-blue-200 dark:border-gray-600 rounded-full animate-spin"></div>
                <div className="absolute top-0 left-0 w-8 h-8 border-4 border-transparent border-t-blue-500 dark:border-t-purple-400 rounded-full animate-spin"></div>
            </div>
            <span className="ml-3 text-sm text-gray-600 dark:text-gray-300 animate-pulse">Loading messages...</span>
        </div>
    )
}

export default LoadingSpinner