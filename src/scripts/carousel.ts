/**
 * Recent work carousel (Home 1.6).
 * The track is a native horizontal scroller with scroll snapping, so touch
 * swipe and trackpads need nothing from here. This adds:
 * - previous / next buttons that move one card, disabled at either end
 * - drag with a mouse (a dragged card doesn't open on release)
 */
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
  const track = root.querySelector<HTMLElement>('[data-rail]')!;
  const prev = root.querySelector<HTMLButtonElement>('[data-prev]')!;
  const next = root.querySelector<HTMLButtonElement>('[data-next]')!;
  const cards = [...track.querySelectorAll<HTMLElement>('[data-card]')];

  /** Left padding of the track = where a snapped card starts */
  const edge = () => parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
  const maxScroll = () => track.scrollWidth - track.clientWidth;

  function update() {
    root.toggleAttribute('data-fits', maxScroll() <= 1);
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= maxScroll() - 1;
  }

  function go(dir: 1 | -1) {
    const x = track.scrollLeft;
    const starts = cards.map((c) => c.offsetLeft - edge());
    const target =
      dir === 1 ? starts.find((s) => s > x + 1) : [...starts].reverse().find((s) => s < x - 1);
    track.scrollTo({
      left: Math.max(0, Math.min(target ?? (dir === 1 ? maxScroll() : 0), maxScroll())),
      behavior: reducedMotion.matches ? 'auto' : 'smooth',
    });
  }

  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  track.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(update).observe(track);
  update();

  /* ---- Mouse drag ---- */
  let startX = 0;
  let startScroll = 0;
  let pointerId: number | null = null;
  let moved = false;

  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    pointerId = e.pointerId;
    startX = e.clientX;
    startScroll = track.scrollLeft;
    moved = false;
  });
  track.addEventListener('pointermove', (e) => {
    if (e.pointerId !== pointerId) return;
    const dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > 5) {
      moved = true;
      track.setPointerCapture(e.pointerId);
      track.classList.add('is-dragging');
    }
    if (moved) track.scrollLeft = startScroll - dx;
  });
  const end = () => {
    if (pointerId === null) return;
    pointerId = null;
    if (!moved) return;
    // Let the browser snap to the nearest card again
    const x = track.scrollLeft;
    track.classList.remove('is-dragging');
    track.scrollLeft = x;
    // (cards near the end can't reach the left edge, so compare where they can actually go)
    const stops = cards.map((c) => Math.min(c.offsetLeft - edge(), maxScroll()));
    const nearest = stops.reduce((a, b) => (Math.abs(b - x) < Math.abs(a - x) ? b : a));
    track.scrollTo({ left: nearest, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  };
  track.addEventListener('pointerup', end);
  track.addEventListener('pointercancel', end);
  // A drag shouldn't count as a click on the card underneath
  track.addEventListener(
    'click',
    (e) => {
      if (moved) {
        e.preventDefault();
        moved = false;
      }
    },
    true,
  );
});

export {}; // a module, so its names stay private to this file
