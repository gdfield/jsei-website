/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'rgb(var(--ink-rgb) / <alpha-value>)',
          700: 'rgb(var(--ink-700-rgb) / <alpha-value>)',
          soft: 'rgb(var(--ink-soft-rgb) / <alpha-value>)',
        },
        sea: {
          DEFAULT: 'rgb(var(--sea-rgb) / <alpha-value>)',
          600: 'rgb(var(--sea-600-rgb) / <alpha-value>)',
        },
        sky: 'rgb(var(--sky-rgb) / <alpha-value>)',
        gold: {
          DEFAULT: 'rgb(var(--gold-rgb) / <alpha-value>)',
          deep: 'rgb(var(--gold-deep-rgb) / <alpha-value>)',
        },
        paper: 'rgb(var(--paper-rgb) / <alpha-value>)',
        surface: 'rgb(var(--surface-rgb) / <alpha-value>)',
        mist: 'rgb(var(--mist-rgb) / <alpha-value>)',
        muted: 'rgb(var(--muted-rgb) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      // bg-sea/8 is used for small pills; 8% is not in Tailwind's default opacity scale.
      opacity: {
        8: '0.08',
      },
      boxShadow: {
        card: '0 1px 2px rgba(6, 38, 63, 0.04), 0 8px 24px -12px rgba(6, 38, 63, 0.18)',
        lift: '0 18px 48px -20px rgba(6, 38, 63, 0.35)',
      },
      maxWidth: {
        content: '80rem',
      },
      keyframes: {
        aperture: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.55' },
          '50%': { transform: 'scale(1.06)', opacity: '0.8' },
        },
      },
      animation: {
        aperture: 'aperture 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
