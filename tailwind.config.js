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
          DEFAULT: 'var(--ink)',
          700: 'var(--ink-700)',
          soft: 'var(--ink-soft)',
        },
        sea: {
          DEFAULT: 'var(--sea)',
          600: 'var(--sea-600)',
        },
        sky: 'var(--sky)',
        gold: {
          DEFAULT: 'var(--gold)',
          deep: 'var(--gold-deep)',
        },
        paper: 'var(--paper)',
        surface: 'var(--surface)',
        mist: 'var(--mist)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
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
