/**
 * Process section, pinned version (Home 1.5). Loaded only on desktop with
 * motion allowed (see Process.astro); everyone else keeps the plain list.
 *
 * The section holds still for three screens of scrolling; each step gets an
 * equal quarter of it, so the view always rests on one whole step.
 * Changing step: the old one fades up and out, the new one fades up in
 * (0.4s), and its drawing draws itself (0.8s). A gold line fills with
 * progress. Only transform and opacity are animated.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lenis } from './smooth-scroll';

gsap.registerPlugin(ScrollTrigger);
lenis?.on('scroll', ScrollTrigger.update);

const section = document.querySelector<HTMLElement>('[data-process]');

if (section) {
  const stage = section.querySelector<HTMLElement>('[data-stage]')!;
  const steps = [...section.querySelectorAll<HTMLElement>('[data-step]')];
  const marks = [...section.querySelectorAll<HTMLElement>('[data-mark]')];
  const fill = section.querySelector<HTMLElement>('[data-fill]')!;

  gsap.matchMedia().add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    section.classList.add('process--pinned');
    let current = -1;

    const lines = (el: HTMLElement) => el.querySelectorAll('[pathLength]');

    function show(i: number, animate = true) {
      if (i === current) return;
      const prev = steps[current];
      const next = steps[i];
      current = i;
      marks.forEach((m, j) => m.classList.toggle('is-done', j <= i));

      if (!animate) {
        gsap.set(next, { autoAlpha: 1, y: 0 });
        gsap.set(lines(next), { strokeDasharray: 1, strokeDashoffset: 0 });
        return;
      }
      if (prev) gsap.to(prev, { autoAlpha: 0, y: -16, duration: 0.4, ease: 'power2.out', overwrite: true });
      gsap.fromTo(next, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out', overwrite: true });
      gsap.fromTo(
        lines(next),
        { strokeDasharray: 1, strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.8, stagger: 0.03, ease: 'power2.out', overwrite: true },
      );
    }

    gsap.set(steps, { autoAlpha: 0 });
    show(0, false);

    ScrollTrigger.create({
      trigger: stage,
      pin: true,
      start: 'top top',
      end: () => `+=${window.innerHeight * 3}`,
      invalidateOnRefresh: true,
      onUpdate(self) {
        gsap.set(fill, { scaleX: self.progress });
        // Equal share of the scroll per step: changes at 25%, 50%, 75%
        show(Math.min(steps.length - 1, Math.floor(self.progress * steps.length)));
      },
    });

    // Undo everything when the screen gets narrow or motion is turned off
    return () => {
      section.classList.remove('process--pinned');
      gsap.set(steps, { clearProps: 'all' });
      steps.forEach((s) => gsap.set(lines(s), { clearProps: 'all' }));
      gsap.set(fill, { clearProps: 'all' });
      marks.forEach((m) => m.classList.remove('is-done'));
    };
  });
}
