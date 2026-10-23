/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        surface: {
          950: '#020617',
          900: '#0b0f19',
          850: '#0d1322',
          800: '#0f172a',
          750: '#172033',
          700: '#1e293b',
          600: '#334155',
          500: '#475569',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow-brand': '0 0 24px rgba(56, 189, 248, 0.25)',
        'glow-success': '0 0 20px rgba(16, 185, 129, 0.25)',
      },
    },
  },
  plugins: [],
};
