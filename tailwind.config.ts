import type { Config } from 'tailwindcss'
import scrollbar from 'tailwind-scrollbar'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './site/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [scrollbar],
}

export default config
