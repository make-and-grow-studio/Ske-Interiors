/**
 * The home hero image, generated once and shared by the page (for the
 * <link rel="preload"> in <head>) and the Hero component, so the preloaded
 * file is exactly the one the page uses.
 */
import { getImage } from 'astro:assets';
// Interim hero chosen by RJ (design/plan.md): 3BHK living room render, 1280px
import heroImage from '../../scrape/images/shared/20190131_190715_5c7214a7-65a8-4dc0-9547-690a4395b35d.jpg';

export const heroAlt =
  '3D design of a living room with a wooden TV partition and open staircase in a 3BHK in Coimbatore, designed by SKE Interiors';

// On portrait phones the landscape photo is scaled up to fill the height,
// so it renders about 1.5× the screen height wide.
const widths = [640, 960, 1280];
export const heroSizes = `(max-aspect-ratio: ${heroImage.width}/${heroImage.height}) ${Math.round(
  (100 * heroImage.width) / heroImage.height
)}vh, 100vw`;

export async function getHeroImage() {
  const [avif, webp, fallback] = await Promise.all([
    getImage({ src: heroImage, format: 'avif', widths, sizes: heroSizes }),
    getImage({ src: heroImage, format: 'webp', widths, sizes: heroSizes }),
    getImage({ src: heroImage, format: 'jpg', width: 1280 }),
  ]);
  return { avif, webp, fallback, width: heroImage.width, height: heroImage.height, sizes: heroSizes, alt: heroAlt };
}
