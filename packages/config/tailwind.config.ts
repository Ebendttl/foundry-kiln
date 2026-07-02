import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    '../../apps/web/app/**/*.{ts,tsx}',
    '../../apps/web/components/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Spine colors
        'foundry-black': '#121212',
        'foundry-concrete': '#EDEBE6',
        'foundry-orange': '#FF4B12',
        // The Booth — electric violet
        'booth-violet': '#7B2FF7',
        'booth-violet-light': '#9B5FF9',
        // The Line — ink red
        'line-red': '#E4002B',
        'line-red-light': '#FF1A45',
        // The Roast — caramel/espresso
        'roast-caramel': '#C08A3E',
        'roast-espresso': '#3B2314',
        // Semantic
        'surface-primary': '#121212',
        'surface-secondary': '#1A1A1A',
        'surface-tertiary': '#242424',
        'surface-light': '#EDEBE6',
        'text-primary': '#EDEBE6',
        'text-secondary': '#A8A49E',
        'text-inverse': '#121212',
        'border-hard': '#121212',
        'border-subtle': '#333333',
      },
      fontFamily: {
        'display': ['"Space Grotesk"', 'sans-serif'],
        'body': ['"IBM Plex Sans"', 'sans-serif'],
        'mono': ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        'foundry': '2px',
        'foundry-sm': '0px',
        'foundry-md': '4px',
      },
      boxShadow: {
        'stamp': '4px 4px 0px 0px #121212',
        'stamp-sm': '2px 2px 0px 0px #121212',
        'stamp-orange': '4px 4px 0px 0px #FF4B12',
        'stamp-light': '4px 4px 0px 0px #EDEBE6',
        'stamp-violet': '4px 4px 0px 0px #7B2FF7',
        'stamp-red': '4px 4px 0px 0px #E4002B',
        'stamp-caramel': '4px 4px 0px 0px #C08A3E',
      },
      animation: {
        'ticker': 'ticker 30s linear infinite',
        'slide-in-left': 'slideInLeft 150ms linear',
        'slide-in-right': 'slideInRight 150ms linear',
        'slide-in-up': 'slideInUp 150ms linear',
        'waveform': 'waveform 0.8s ease-in-out infinite alternate',
        'glitch': 'glitch 200ms linear',
        'count-up': 'countUp 600ms ease-out',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        waveform: {
          '0%': { height: '4px' },
          '100%': { height: '24px' },
        },
        glitch: {
          '0%': { transform: 'translate(0)', filter: 'none' },
          '25%': { transform: 'translate(-2px, 1px)', filter: 'hue-rotate(90deg)' },
          '50%': { transform: 'translate(2px, -1px)', filter: 'hue-rotate(180deg)' },
          '75%': { transform: 'translate(-1px, -1px)', filter: 'hue-rotate(270deg)' },
          '100%': { transform: 'translate(0)', filter: 'none' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
