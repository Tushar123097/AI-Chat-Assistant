import { useState } from 'react'

function LoginForm({ onLogin }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (name.trim() && email.trim()) {
            onLogin({ name: name.trim(), email: email.trim() })
        }
    }

    return (
        <div className="w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="bg-white/98 dark:bg-gray-900/98 backdrop-blur-2xl rounded-[2rem] border-2 border-white/50 dark:border-gray-700/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] w-full max-w-6xl overflow-hidden">

                <div className="flex flex-col lg:flex-row min-h-[600px]">
                    {/* Left Side - Image */}
                    <div className="lg:w-1/2 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-8 sm:p-12 flex items-center justify-center relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
                            <div className="absolute top-32 right-16 w-16 h-16 bg-white rounded-full"></div>
                            <div className="absolute bottom-20 left-20 w-12 h-12 bg-white rounded-full"></div>
                            <div className="absolute bottom-32 right-10 w-24 h-24 bg-white rounded-full"></div>
                        </div>

                        {/* Main Image */}
                        <div className="relative z-10 text-center">
                            <div className="mb-8">
                                <img
                                    src="/image.png"
                                    alt="Chat App Illustration"
                                    className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-contain mx-auto drop-shadow-2xl"
                                />
                            </div>

                            <div className="text-white">
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 drop-shadow-lg">
                                    Connect & Chat
                                </h2>
                                <p className="text-lg sm:text-xl font-medium opacity-90 leading-relaxed max-w-sm mx-auto">
                                    Experience seamless communication with chat
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-slate-50/98 via-blue-50/95 to-purple-50/92 dark:from-gray-900/98 dark:via-slate-800/95 dark:to-gray-800/92 backdrop-blur-2xl relative overflow-hidden border-l border-white/30 dark:border-gray-700/30">
                        {/* Enhanced Background Pattern */}
                        <div className="absolute inset-0">
                            {/* Gradient Overlays */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full blur-3xl"></div>
                            <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-bl from-pink-400/15 to-transparent rounded-full blur-2xl"></div>

                            {/* Geometric Shapes */}
                            <div className="absolute top-16 right-16 w-20 h-20 bg-blue-200/10 dark:bg-blue-400/10 rounded-2xl rotate-12 blur-sm"></div>
                            <div className="absolute bottom-24 left-12 w-16 h-16 bg-purple-200/10 dark:bg-purple-400/10 rounded-full blur-sm"></div>
                            <div className="absolute top-1/2 left-8 w-12 h-12 bg-pink-200/10 dark:bg-pink-400/10 rounded-lg rotate-45 blur-sm"></div>

                            {/* Subtle Grid Pattern */}
                            <div className="absolute inset-0 opacity-5 dark:opacity-10" style={{
                                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(147, 51, 234, 0.3) 1px, transparent 0)`,
                                backgroundSize: '20px 20px'
                            }}></div>
                        </div>

                        {/* Content with relative positioning */}
                        <div className="relative z-10">
                            {/* Header */}
                            <div className="mb-8 lg:mb-12 text-center">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-6 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl mx-auto">
                                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>

                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 sm:mb-8 tracking-tight leading-tight">
                                    Welcome!
                                </h1>

                                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg font-medium leading-relaxed mb-8 sm:mb-6">
                                    Sign in to continue
                                </p>
                            </div>

                            {/* Login Form */}
                            <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-10">
                                <div className="space-y-4 sm:space-y-5 text-center">
                                    <label className="block text-sm sm:text-base font-bold text-gray-800 dark:text-gray-100 tracking-wide mb-3">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your full name"
                                        className="w-full px-5 py-4 sm:px-6 sm:py-5 bg-gradient-to-r from-gray-50/95 to-blue-50/95 dark:from-gray-800/95 dark:to-gray-700/95 border-2 border-gray-300/70 dark:border-gray-600/70 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-semibold text-base sm:text-lg shadow-inner backdrop-blur-sm text-center"
                                        required
                                    />
                                </div>

                                <div className="space-y-4 sm:space-y-5 text-center">
                                    <label className="block text-sm sm:text-base font-bold text-gray-800 dark:text-gray-100 tracking-wide mb-3">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="w-full px-5 py-4 sm:px-6 sm:py-5 bg-gradient-to-r from-gray-50/95 to-blue-50/95 dark:from-gray-800/95 dark:to-gray-700/95 border-2 border-gray-300/70 dark:border-gray-600/70 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-semibold text-base sm:text-lg shadow-inner backdrop-blur-sm text-center"
                                        required
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 text-white py-4 sm:py-5 px-6 rounded-xl font-black text-lg sm:text-xl transition-all duration-400 shadow-2xl hover:shadow-[0_20px_40px_-12px_rgba(147,51,234,0.4)] transform hover:scale-[1.02] active:scale-[0.98] border-2 border-white/30 backdrop-blur-sm"
                                    >
                                        <span className="flex items-center justify-center space-x-3">
                                            <span className="tracking-wide">Start Chatting</span>
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                            </form>

                            {/* Footer */}
                            <div className="text-center mt-8 lg:mt-10 pt-6 border-t-2 border-gray-200/60 dark:border-gray-700/60">
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                    By continuing, you agree to our
                                    <span className="text-purple-600 dark:text-purple-400 font-semibold"> Terms </span>
                                    and
                                    <span className="text-purple-600 dark:text-purple-400 font-semibold"> Privacy Policy</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm