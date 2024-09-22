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
    fontFamily: {
      primary: 'var(--font-nunitoSans)',
    },
    extend: {
      fontSize: {
        'xs': ['clamp(.72rem, .13vw + .69rem, .84rem)', { lineHeight: '1rem' }],
        'sm': ['clamp( 0.9rem, calc(1.03125vw + 0.09375rem), 1.6rem );', { lineHeight: '1.25rem' }],
        'base': ['clamp(1.13rem, .39vw + 1.03rem, 1.5rem)', { lineHeight: '1.1' }],
        'lg': ['clamp(1.41rem, .61vw + 1.26rem, 2rem)', { lineHeight: '1.3' }],
        'xl': ['clamp( 1.2rem, calc(1.5vw), 3rem );', { lineHeight: '1.5' }],
        '2xl': ['clamp( 1.7rem, calc(2.5vw), 5rem );', { lineHeight: '1.1' }],
        '3xl': ['clamp( 2.7rem, calc(3.5vw), 7rem );', { lineHeight: '1.1' }],
        '4xl': ['clamp(4.29rem, 4.27vw + 3.29rem, 5.42rem)', { lineHeight: '1.1' }],
        '5xl': ['clamp(5rem, 5vw + 4rem, 6rem)', { lineHeight: '1.1' }],
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
        'xs-436': '436px',
        'sm-590': '590px',
        'md-830': '830px',
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
