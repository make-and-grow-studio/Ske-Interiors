// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Self-hosted fonts from the @fontsource-variable packages (no Google Fonts
// request). Astro serves them with font-display: swap and generates
// metric-matched fallbacks (Times New Roman / Arial sized to match), so text
// doesn't jump when the real font arrives (keeps CLS low).
/** @param {string} pkg @param {string} file */
const fontsource = (pkg, file) => `./node_modules/@fontsource-variable/${pkg}/files/${file}`;

export default defineConfig({
  site: 'https://skeinteriors.com',
  output: 'static',
  trailingSlash: 'always', // matches the old WordPress URLs (/about-us/)

  integrations: [
    sitemap({
      // /thank-you/ is noindex; /design-system/ is an internal page
      filter: (page) => !/\/(thank-you|design-system)\/$/.test(page),
    }),
  ],

  fonts: [
    {
      // Display: headlines (in capitals via CSS) and the footer wordmark.
      // Light high-contrast serif, the free stand-in for Ivar Fine.
      provider: fontProviders.local(),
      name: 'Cormorant Garamond',
      cssVariable: '--font-cormorant',
      fallbacks: ['Georgia', 'serif'],
      display: 'swap',
      options: {
        variants: [
          {
            src: [fontsource('cormorant-garamond', 'cormorant-garamond-latin-wght-normal.woff2')],
            weight: '300 700',
            style: 'normal',
          },
        ],
      },
    },
    {
      // Text and UI: body, nav, buttons, spaced capital labels
      provider: fontProviders.local(),
      name: 'Jost',
      cssVariable: '--font-jost',
      fallbacks: ['Arial', 'sans-serif'],
      display: 'swap',
      options: {
        variants: [
          {
            src: [fontsource('jost', 'jost-latin-wght-normal.woff2')],
            weight: '100 900',
            style: 'normal',
          },
        ],
      },
    },
    {
      // Script: a handwritten signature accent, used sparingly
      provider: fontProviders.local(),
      name: 'Herr Von Muellerhoff',
      cssVariable: '--font-script',
      fallbacks: ['cursive'],
      display: 'swap',
      options: {
        variants: [
          {
            src: ['./node_modules/@fontsource/herr-von-muellerhoff/files/herr-von-muellerhoff-latin-400-normal.woff2'],
            weight: '400',
            style: 'normal',
          },
        ],
      },
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
