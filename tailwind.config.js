/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Quantra-style Cosmic Palette
                primary: {
                    DEFAULT: '#05030a', // Deep cosmic black
                    light: '#0d0a14',   // Slightly lighter
                    card: 'rgba(255, 255, 255, 0.02)',
                    border: 'rgba(255, 255, 255, 0.06)',
                },
                accent: {
                    purple: '#a855f7',  // Vibrant purple
                    pink: '#ec4899',    // Hot pink
                    orange: '#f97316',  // Glow orange
                    blue: '#3b82f6',    // Electric blue
                    emerald: '#10B981', // Keep for success states
                },
                text: {
                    DEFAULT: '#FFFFFF',
                    secondary: '#a1a1aa', // Zinc-400
                    muted: '#71717a',     // Zinc-500
                },
            },
            backgroundImage: {
                // Cosmic gradients
                'cosmic-glow': 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.1) 30%, transparent 70%)',
                'cosmic-portal': 'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(168, 85, 247, 0.3) 0%, rgba(236, 72, 153, 0.2) 40%, transparent 70%)',
                'gradient-purple-pink': 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)',
                'gradient-card': 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.0) 100%)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 2s infinite',
                'float-reverse': 'floatReverse 7s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'fade-in-left': 'fadeInLeft 0.8s ease-out forwards',
                'fade-in-right': 'fadeInRight 0.8s ease-out forwards',
                'scale-in': 'scaleIn 0.6s ease-out forwards',
                'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'gradient-shift': 'gradientShift 8s ease infinite',
                'spin-slow': 'spin 20s linear infinite',
                'orbit': 'orbit 15s linear infinite',
                'glow-pulse': 'glowPulse 4s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                floatReverse: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(20px)' },
                },
                pulseGlow: {
                    '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.05)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                fadeInRight: {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                bounceSubtle: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                orbit: {
                    '0%': { transform: 'rotate(0deg) translateX(150px) rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg) translateX(150px) rotate(-360deg)' },
                },
                glowPulse: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.3), 0 0 40px rgba(236, 72, 153, 0.2)' },
                    '50%': { boxShadow: '0 0 40px rgba(168, 85, 247, 0.5), 0 0 80px rgba(236, 72, 153, 0.3)' },
                },
            },
            boxShadow: {
                'glow-purple': '0 0 30px rgba(168, 85, 247, 0.3)',
                'glow-pink': '0 0 30px rgba(236, 72, 153, 0.3)',
                'glow-orange': '0 0 30px rgba(249, 115, 22, 0.3)',
            }
        },
    },
    plugins: [],
}
