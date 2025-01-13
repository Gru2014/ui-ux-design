/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#60A5FA', // Soft blue
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
        },
        secondary: {
          light: '#F3F4F6',
          DEFAULT: '#9CA3AF',
          dark: '#4B5563',
        },
        highlight: {
          green: '#10B981', // Vibrant green
          red: '#EF4444',   // Vibrant red
        },
        teal: {
          light: '#5EEAD4',
          DEFAULT: '#14B8A6',
          dark: '#0D9488',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
        display: ['Open Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'heading-1': ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }],
        'heading-2': ['2rem', { lineHeight: '2.5rem', fontWeight: '600' }],
        'heading-3': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.5rem' }],
        'label': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }],
        'input': ['0.875rem', { lineHeight: '1.25rem' }],
        'small': ['0.75rem', { lineHeight: '1rem' }],
      },
    },
  },
  plugins: [],
};
