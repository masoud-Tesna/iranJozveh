import type { Config } from 'tailwindcss';

const config: Config = {
  corePlugins: {
    preflight: false
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1600px'
    },
    extend: {
      spacing: {
        4: '4px',
        8: '8px',
        16: '16px',
        24: '24px',
        32: '32px',
        40: '40px',
        48: '48px',
        56: '56px',
        64: '64px',
        80: '80px',
        120: '120px',
        160: '160px'
      },
      borderRadius: {
        4: '4px',
        8: '8px',
        16: '16px',
        24: '24px',
        32: '32px',
        64: '64px'
      },
      backgroundImage: {
        primary: 'linear-gradient(180deg, #050138 73.44%, #6251DD 170.4%)',
        auth: 'linear-gradient(180deg, rgba(5, 1, 56, 0.50) 62.39%, rgba(255, 255, 255, 0.04) 144.75%)'
      },
      boxShadow: {
        1: '0 4px 10px 2px rgba(0, 0, 0, .05)',
        2: '0 6px 12px 0 rgba(0, 0, 0, .08)',
        3: '0 6px 12px 0 rgba(0, 0, 0, .12)',
        4: '0 10px 25px 0 rgba(0, 0, 0, .30) inset',
        8: '0px 1px 0px 0px #E2E8F0',
        9: '-2px 0px 5px 0px rgba(53, 53, 53, 0.03) inset'
      },
      colors: {
        primary: '#6251DD',
        secondary: '#050138',
        gray: {
          10: '#F8F8F8',
          20: '#F5F5F5',
          30: '#DDDDDD',
          40: '#A8A8A8',
          50: '#757575',
          60: '#D9D9D9',
          70: '#6D6D6D',
          80: '#656565',
          90: '#F5F7F9',
          100: '#090937'
        },
        neutral: {
          white: '#FFFFFF',
          gray: {
            1: '#F9F9F9',
            2: '#EDEDED',
            3: '#E1E1E1',
            4: '#CBCBCB',
            5: '#ADADAD',
            6: '#757575',
            7: '#353535',
            8: '#E5E7EB',
            9: '#F5F7F9'
          },
          black: '#0C0C0C',
          black2: '#202020'
        }
      },
      fontSize: {
        captionSm: ['.75rem', { lineHeight: '160%', fontWeight: 400 }],
        captionMd: ['.813rem', { lineHeight: '160%', fontWeight: 400 }],
        captionLg: ['1rem', { lineHeight: '160%', fontWeight: 400 }],
        captionXl: ['1.2rem', { lineHeight: '160%', fontWeight: 400 }],
        captionXl2: ['1.5rem', { lineHeight: '160%', fontWeight: 400 }],
        captionXxl: ['1.8rem', { lineHeight: '160%', fontWeight: 400 }],
        xs: ['.6255rem', { lineHeight: '160%', fontWeight: 400 }],
        sm: ['.875rem', { lineHeight: '160%', fontWeight: 400 }]
      },
      fontFamily: {
        samim: 'samimFont'
      }
    }
  },
  plugins: []
};
export default config;
