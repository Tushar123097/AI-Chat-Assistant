import { useState, useEffect } from 'react'

function ThemeToggle() {
    const [isDark, setIsDark] = useState(false)

    // Initialize theme on component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        
        const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
        setIsDark(shouldBeDark)
        
        // Apply theme immediately
        if (shouldBeDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [])

    // Handle theme changes
    useEffect(() => {
        const root = document.documentElement
        
        if (isDark) {
            root.classList.add('dark')
            localStorage.setItem('theme', 'dark')
            console.log('Applied dark theme') // Debug log
        } else {
            root.classList.remove('dark')
            localStorage.setItem('theme', 'light')
            console.log('Applied light theme') // Debug log
        }
    }, [isDark])

    const toggleTheme = () => {
        console.log('Theme toggle clicked, current isDark:', isDark) // Debug log
        setIsDark(!isDark)
    }

    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={toggleTheme}
                className="p-3 rounded-xl bg-white/30 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-white/40 dark:border-gray-600/40 hover:bg-white/40 dark:hover:bg-gray-700/60 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
                {isDark ? (
                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                )}
            </button>
            
            {/* Debug indicator */}
            <span className="text-xs font-mono bg-black/20 dark:bg-white/20 px-2 py-1 rounded text-gray-800 dark:text-gray-200">
                {isDark ? 'Dark' : 'Light'}
            </span>
        </div>
    )
}

export default ThemeToggle