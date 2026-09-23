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
      // Display: H1/H2 and the footer wordmark. The "standard" file carries
      // both weight and optical-size axes; optical size gives Bodoni its
      // fine hairlines at large sizes.
      provider: fontProviders.local(),
      name: 'Bodoni Moda',
      cssVariable: '--font-bodoni',
      fallbacks: ['Times New Roman', 'serif'],
      display: 'swap',
      options: {
        variants: [
          {
            src: [fontsource('bodoni-moda', 'bodoni-moda-latin-standard-normal.woff2')],
            weight: '400 900',
            style: 'normal',
          },
        ],
      },
    },
    {
      // Text and UI: body, nav, buttons, labels
      provider: fontProviders.local(),
      name: 'Hanken Grotesk',
      cssVariable: '--font-hanken',
      fallbacks: ['Arial', 'sans-serif'],
      display: 'swap',
      options: {
        variants: [
          {
            src: [fontsource('hanken-grotesk', 'hanken-grotesk-latin-wght-normal.woff2')],
            weight: '100 900',
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
