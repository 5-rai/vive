/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        default: {
          white: '#FFFFFF',
          black: '#000000',
        },
        primary: '#9694FF',
        secondary: '#EBEAFF',
        hover: '#8280FF',
        accent: '#3D3BF3',
        warning: '#FF2929',
        gray: {
          100: '#0A0A0A',
          95: '#161616',
          90: '#232323',
          80: '#3B3B3B',
          70: '#545454',
          60: '#6C6C6C',
          50: '#858585',
          40: '#9D9D9D',
          30: '#B6B6B6',
          20: '#CECECE',
          15: '#DADADA',
          10: '#E7E7E7',
          5: '#F2F2F2',
        },
      },
    },
    borderWidth: {
      DEFAULT: '1px',
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
