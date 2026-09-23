/**
 * Count-up for number rows (Home studio intro).
 * Numbers are rendered at their final value in the HTML. When the row first
 * scrolls into view they reset to 0 and count up once (1.2s, ease-out).
 * Nothing happens with reduced motion: the final numbers simply stay.
 */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);

  const run = (row: Element) => {
    const nums = [...row.querySelectorAll<HTMLElement>('[data-count-to]')];
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      nums.forEach((el) => {
        el.textContent = String(Math.round(Number(el.dataset.countTo) * ease(t)));
      });
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        run(entry.target);
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll('[data-count-up]').forEach((row) => observer.observe(row));
}
