// tailwind.config.js

import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      secondary: 'var(--font-jetbrainsMono)',
      primary: 'var(--font-nunitoSans)',
    },
    extend: {
      colors: {
        primary: '#1c1c22',
        accentdark:{
          DEFAULT: "#fbcc6c",
          hover: "#fbcc6c",
        },
        'accentlight': '#071952',
      },
    },  
  },
  darkMode: 'class',
  plugins: [
    nextui({}),
  ],
};

export default config;
