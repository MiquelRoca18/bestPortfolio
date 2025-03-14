/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Colores principales del Valencia C.F.
        'valencia-white': '#FFFFFF',
        'valencia-black': '#000000',
        'valencia-orange': {
          DEFAULT: '#FA4616',
          50: '#FEE8E2',
          100: '#FED1C5',
          200: '#FDA48C',
          300: '#FC7752',
          400: '#FB5F34',
          500: '#FA4616',
          600: '#E13508',
          700: '#B42A06',
          800: '#871F05',
          900: '#5A1503',
          950: '#2D0B02'
        },
        // Colores del escudo (inspirados en la Senyera)
        'valencia-red': {
          DEFAULT: '#DA291C',
          50: '#F9D1CE',
          100: '#F6B9B4',
          200: '#F08A82',
          300: '#EA5B4F',
          400: '#E42D1D',
          500: '#DA291C',
          600: '#B22216',
          700: '#8A1A11',
          800: '#62130C',
          900: '#3A0B07',
          950: '#1D0604'
        },
        'valencia-yellow': {
          DEFAULT: '#FFD700',
          50: '#FFFAE6',
          100: '#FFF6CC',
          200: '#FFED99',
          300: '#FFE466',
          400: '#FFDB33',
          500: '#FFD700',
          600: '#CCAC00',
          700: '#998100',
          800: '#665600',
          900: '#332B00',
          950: '#1A1500'
        },
        'valencia-blue': {
          DEFAULT: '#0057B8',
          50: '#E6F0FF',
          100: '#CCE1FF',
          200: '#99C3FF',
          300: '#66A5FF',
          400: '#3387FF',
          500: '#0069FF',
          600: '#0057B8',
          700: '#004494',
          800: '#003170',
          900: '#001F4C',
          950: '#000F26'
        },
        // Alias para compatibilidad con el código existente
        'team-primary': '#FA4616', // valencia-orange (antes era valencia-blue)
        'team-secondary': '#FFD700', // valencia-yellow
        'team-accent': '#DA291C', // valencia-red (antes era valencia-orange)
        'field-green': '#2e8b57',
        'field-green-light': '#46b171',
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'skill': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        'trophy': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'grass-pattern': "url('/src/assets/grass-pattern.svg')",
        'field-texture': "linear-gradient(to right, #2e8b57, #3a9e64, #46b171)",
        'player-card': "linear-gradient(135deg, #FA4616 0%, #DA291C 100%)",
        'valencia-gradient': "linear-gradient(135deg, #FA4616 0%, #DA291C 100%)",
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}