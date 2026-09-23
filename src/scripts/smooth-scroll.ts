/**
 * Lenis smooth scroll.
 * Only on devices with a mouse/trackpad: on touch screens native scrolling
 * is already smooth and Lenis can make it feel worse (CLAUDE.md).
 * Off entirely when the visitor prefers reduced motion.
 *
 * Motion scripts that use GSAP ScrollTrigger should call
 *   lenis?.on('scroll', ScrollTrigger.update)
 * so both stay in sync.
 */
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export const lenis: Lenis | null =
  !reduceMotion && finePointer
    ? new Lenis({
        autoRaf: true,
        lerp: 0.12, // gentle, not floaty
        anchors: true, // smooth scroll for same-page #links
      })
    : null;
