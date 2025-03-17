/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palette principale
        primary: {
          DEFAULT: '#4318FF',
          50: '#F4F2FF',
          100: '#E9E3FF',
          200: '#D4C7FF',
          300: '#BFAAFF',
          400: '#AA8EFF',
          500: '#9571FF',
          600: '#7B4DFF',
          700: '#6229FF',
          800: '#4805FF',
          900: '#3700E0',
        },
        secondary: {
          DEFAULT: '#00D1FF',
          50: '#F0FCFF',
          100: '#E6F9FF',
          200: '#CCF3FF',
          300: '#B3EDFF',
          400: '#99E7FF',
          500: '#80E1FF',
          600: '#4DD4FF',
          700: '#1AC8FF',
          800: '#00BFEB',
          900: '#00A6CC',
        },
        accent: {
          DEFAULT: '#FACC15', // Jaune vif
          secondary: '#EC4899', // Rose
        },
        background: '#0F172A',
        surface: {
          DEFAULT: 'rgb(30 41 59)',
          light: 'rgb(30 41 59 / 0.5)',
        },
        text: {
          DEFAULT: '#F1F5F9', // Texte clair
          muted: 'rgba(255, 255, 255, 0.6)', // Texte atténué
        },
        border: {
          DEFAULT: 'rgba(248, 250, 252, 0.08)', // Bordure par défaut
          accent: 'rgba(59, 130, 246, 0.2)',    // Bordure accentuée
        },
        // États et feedback
        success: {
          DEFAULT: '#10B981', // Vert
          light: '#34D399',   // Vert clair
        },
        warning: {
          DEFAULT: '#F59E0B', // Orange
          light: '#FBBF24',   // Orange clair
        },
        error: {
          DEFAULT: '#EF4444', // Rouge
          light: '#F87171',   // Rouge clair
        },
        'border-accent': 'rgb(255 255 255 / 0.08)',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1' }],
        'h1': ['3.75rem', { lineHeight: '1.2' }],
        'h2': ['3rem', { lineHeight: '1.2' }],
        'h3': ['2.25rem', { lineHeight: '1.3' }],
        'h4': ['1.875rem', { lineHeight: '1.4' }],
        'h5': ['1.5rem', { lineHeight: '1.5' }],
        'body': ['1.125rem', { lineHeight: '1.6' }],
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'input-focus': '0 0 0 3px rgba(59, 130, 246, 0.3)',
        card: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'button': '0 5px 20px rgba(236, 72, 153, 0.5)',
        'logo': '0 0 15px rgba(59, 130, 246, 0.7)',
      },
      backdropBlur: {
        card: '12px',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--dark-bg) 0%, var(--black) 100%)',
        'gradient-button': 'linear-gradient(90deg, var(--secondary-color) 0%, var(--accent-color-2) 100%)',
      },
      screens: {
        'sm': {'max': '639px'},
        'md': {'max': '767px'},
        'lg': {'max': '1023px'},
        'xl': {'max': '1279px'},
      },
      transitionProperty: {
        'all': 'all',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
      },
      transitionTimingFunction: {
        'default': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'score-increase': 'score-increase 1s ease-out',
        'score-decrease': 'score-decrease 1s ease-out',
        'bounce': 'bounce 1s infinite',
        'pulse': 'pulse 2s infinite',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'score-increase': {
          '0%, 100%': { transform: 'scale(1)', color: 'inherit' },
          '50%': { transform: 'scale(1.2)', color: '#22c55e' },
        },
        'score-decrease': {
          '0%, 100%': { transform: 'scale(1)', color: 'inherit' },
          '50%': { transform: 'scale(1.2)', color: '#ef4444' },
        },
        'bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
}

