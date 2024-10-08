// tailwind.config.js

import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const defaultTheme = require("tailwindcss/defaultTheme");

const svgToDataUri = require("mini-svg-data-uri");

const colors = require("tailwindcss/colors");

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-nunito-sans)', 'sans-serif'],
    },
    
      padding: {
        'clamp-tagtape': 'clamp(1rem, 0.5rem + 1vw, 3rem)',
    },
      fontSize: {
        'fluid-sm': ['clamp( 0.9rem, calc(1.1vw), 4rem );', { lineHeight: '1.25rem' }],
        'fluid-xl': ['clamp( 1.178rem, calc(1.5vw), 1.7rem ); ', { lineHeight: '1.4' }],
        'fluid-lg': ['clamp( 1.5rem, calc(2vw), 3rem );', { lineHeight: '1.35' }],
        'fluid-2xl': ['clamp( 2rem, calc(2.5vw), 3.3rem );', { lineHeight: '1.1' }],
        'fluid-3xl': ['clamp( 2.678rem, calc(3.2vw), 4.5rem );', { lineHeight: '1.1' }],
        '3xl': '2.675rem',
      },
      height: {
        'screen-footer': 'calc(100vh - 6.5rem)',
        'screen-custom': 'calc(100vh - 4.5rem)',
      },
      colors: {
        'text': 'var(--text)',
        'background': 'var(--background)',
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'accent': 'var(--accent)',
        'ui': 'var(--ui)',
        'uihover': 'var(--uihover)',
      },
      screens: {
        'xs-328': '328px',
        'xs-357': '357px',
        'xs-436': '436px',
        'sm-570': '570px',
        'sm-590': '590px',
        'md-830': '830px',
        'md-840': '840px',
        'md-930': '930px',
        'md-954': '954px',
        'lg-1007': '1007px',
        'lg-1080': '1080px',
        'lg-1242': '1242px',
        '2xl-1800': '1800px',
      },
      animation: {
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        scroll: 'scroll 60s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({}),
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
    require('@tailwindcss/aspect-ratio'),
  ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g., var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}


export default config;
