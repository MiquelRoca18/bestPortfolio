/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'field-green': '#388E3C',
        'team-primary': '#1e40af', 
        'team-secondary': '#f59e0b', 
      },
    },
  },
  plugins: [],
}