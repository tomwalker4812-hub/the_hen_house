/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F5DC',
        brown: '#8B4513',
        rust: '#B7410E',
        tan: '#D2B48C',
        sage: '#9CAF88',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-crimson)', 'Georgia', 'serif'],
      },
    },
  },
  // Enable JIT mode for faster builds
  mode: 'jit',
  plugins: [],
}