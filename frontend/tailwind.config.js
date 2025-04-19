/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Extend for 3D effects
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      perspective: {
        '1000': '1000px',
      },
      rotate: {
        'y-6': 'rotateY(6deg)',
      },
      // Additional gradient colors
      backgroundImage: {
        'blue-cyan': 'linear-gradient(to right, #06b6d4, #3b82f6)',
        'cyan-blue': 'linear-gradient(to right, #3b82f6, #06b6d4)',
      },
      // Animation extensions
      transitionProperty: {
        'transform': 'transform',
        'rotate': 'rotate',
      },
      // Shadow extensions
      boxShadow: {
        '3d': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      // Custom colors if needed
      colors: {
        'travel-blue': {
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        'travel-cyan': {
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // For better form styling (optional)
  ],
}