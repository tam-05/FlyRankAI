/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // === FlyRankAI Design Tokens ===
      colors: {
        // Brand primaries
        brand: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Dark surface palette
        surface: {
          950: '#020617',
          900: '#0b0f19',
          800: '#0f172a',
          700: '#1e293b',
          600: '#334155',
          500: '#475569',
        },
        // Semantic colours
        success: '#10b981',
        warning: '#f59e0b',
        danger:  '#ef4444',
        info:    '#38bdf8',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glow-brand': '0 0 20px rgba(56, 189, 248, 0.25)',
        'glow-success': '0 0 15px rgba(16, 185, 129, 0.25)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fade-in':   'fadeIn 0.3s ease-out forwards',
        'slide-in':  'slideIn 0.25s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
