/**
 * Design vs reality compare (Home 1.4). No libraries.
 *
 * - Divider: drag the line or knob, or focus the knob and use the arrow keys.
 *   The position lives in the CSS variable --pos on [data-compare]; CSS clips
 *   the finished photo and moves the handle from it.
 * - Brush (mouse/trackpad only, motion allowed): moving over the frame stamps
 *   a soft round brush into an offscreen mask, and a canvas shows the
 *   finished photo only where the mask is. When the cursor stops, the reveal
 *   eases back to the design over HEAL_MS. The loop runs only while there is
 *   something to draw and the section is on screen, so it costs nothing idle.
 * - Thumbnails switch rooms (200ms crossfade) and reset the handle to 50%.
 */

const BRUSH_RADIUS = 110; // CSS px
const HEAL_MS = 1500; // a stroke is gone this long after the cursor stops
const KEY_STEP = 5;
const PAGE_STEP = 10;

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

function setup(root: HTMLElement) {
  const frame = root.querySelector<HTMLElement>('[data-frame]')!;
  const handle = root.querySelector<HTMLElement>('[data-handle]')!;
  const canvas = root.querySelector<HTMLCanvasElement>('[data-brush]')!;
  const pairs = [...root.querySelectorAll<HTMLElement>('[data-pair]')];
  const thumbs = [...root.querySelectorAll<HTMLButtonElement>('[data-thumb]')];
  let active = 0;
  let pos = 50;

  /* ---------- Divider ---------- */
  function setPos(value: number) {
    pos = Math.round(Math.min(100, Math.max(0, value)) * 10) / 10;
    root.style.setProperty('--pos', `${pos}%`);
    const now = Math.round(pos);
    handle.setAttribute('aria-valuenow', String(now));
    handle.setAttribute(
      'aria-valuetext',
      now === 50 ? 'Half design, half finished room' : `${now}% design, ${100 - now}% finished room`,
    );
  }

  function posFromEvent(e: PointerEvent) {
    const r = frame.getBoundingClientRect();
    return ((e.clientX - r.left) / r.width) * 100;
  }

  let dragging = false;
  root.querySelectorAll<HTMLElement>('[data-drag]').forEach((el) => {
    el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      dragging = true;
      el.setPointerCapture(e.pointerId);
      setPos(posFromEvent(e));
      e.preventDefault();
    });
    el.addEventListener('pointermove', (e) => {
      if (dragging) setPos(posFromEvent(e));
    });
    const stop = () => (dragging = false);
    el.addEventListener('pointerup', stop);
    el.addEventListener('pointercancel', stop);
  });

  handle.addEventListener('keydown', (e) => {
    const moves: Record<string, number> = {
      ArrowLeft: pos - KEY_STEP,
      ArrowDown: pos - KEY_STEP,
      ArrowRight: pos + KEY_STEP,
      ArrowUp: pos + KEY_STEP,
      PageDown: pos - PAGE_STEP,
      PageUp: pos + PAGE_STEP,
      Home: 0,
      End: 100,
    };
    if (!(e.key in moves)) return;
    e.preventDefault();
    setPos(moves[e.key]);
  });

  /* ---------- Rooms ---------- */
  thumbs.forEach((btn) => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.thumb);
      if (i === active) return;
      pairs[active].removeAttribute('data-active');
      pairs[i].setAttribute('data-active', '');
      thumbs.forEach((t, j) => t.setAttribute('aria-pressed', String(j === i)));
      active = i;
      setPos(50);
      clearBrush();
    });
  });

  /* ---------- Brush ---------- */
  const ctx = canvas.getContext('2d');
  const mask = document.createElement('canvas');
  const mctx = mask.getContext('2d');
  let dpr = 1;
  let last: { x: number; y: number } | null = null;
  let lastStroke = 0;
  let running = false;
  let inView = false;

  const brushOn = () => finePointer.matches && !reducedMotion.matches && !!ctx && !!mctx;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = frame.getBoundingClientRect();
    canvas.width = mask.width = Math.round(r.width * dpr);
    canvas.height = mask.height = Math.round(r.height * dpr);
  }

  function clearBrush() {
    mctx?.clearRect(0, 0, mask.width, mask.height);
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    last = null;
  }

  function stamp(x: number, y: number) {
    const r = BRUSH_RADIUS * dpr;
    const g = mctx!.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, 'rgba(0,0,0,1)');
    g.addColorStop(0.45, 'rgba(0,0,0,0.85)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    mctx!.fillStyle = g;
    mctx!.fillRect(x - r, y - r, r * 2, r * 2);
  }

  /** The finished photo of the current room, drawn like object-fit: cover */
  function drawReality() {
    const img = pairs[active].querySelector<HTMLImageElement>('.compare__layer--reality img');
    if (!img || !img.complete || !img.naturalWidth) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx!.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
  }

  /** How much of the reveal is left: 1 while painting, easing to 0 over HEAL_MS */
  function strength(now: number) {
    const t = Math.min(1, (now - lastStroke) / HEAL_MS);
    return 0.5 + 0.5 * Math.cos(Math.PI * t); // slow start, slow finish
  }

  function frameLoop(now: number) {
    if (now - lastStroke >= HEAL_MS) {
      // Fully healed: clear and stop until the next stroke
      clearBrush();
      running = false;
      return;
    }

    // Show the finished photo only where the mask is, faded by the heal
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    ctx!.globalAlpha = strength(now);
    ctx!.drawImage(mask, 0, 0);
    ctx!.globalAlpha = 1;
    ctx!.globalCompositeOperation = 'source-in';
    drawReality();
    ctx!.globalCompositeOperation = 'source-over';

    if (inView) requestAnimationFrame(frameLoop);
    else running = false;
  }

  frame.addEventListener('pointermove', (e) => {
    if (dragging || e.pointerType !== 'mouse' || !brushOn()) return;
    if ((e.target as HTMLElement).closest('[data-drag]')) {
      last = null;
      return;
    }
    const r = frame.getBoundingClientRect();
    if (canvas.width !== Math.round(r.width * dpr)) resize();
    const x = (e.clientX - r.left) * dpr;
    const y = (e.clientY - r.top) * dpr;

    // If an earlier stroke is part-healed, keep it where it is (don't snap back)
    const now = performance.now();
    const left = running ? strength(now) : 1;
    if (left < 1) {
      mctx!.globalCompositeOperation = 'destination-out';
      mctx!.fillStyle = `rgba(0,0,0,${1 - left})`;
      mctx!.fillRect(0, 0, mask.width, mask.height);
      mctx!.globalCompositeOperation = 'source-over';
    }

    // Fill the gap since the last event so fast strokes stay continuous
    if (last) {
      const dist = Math.hypot(x - last.x, y - last.y);
      const step = (BRUSH_RADIUS * dpr) / 4;
      for (let d = step; d < dist; d += step) {
        stamp(last.x + ((x - last.x) * d) / dist, last.y + ((y - last.y) * d) / dist);
      }
    }
    stamp(x, y);
    last = { x, y };
    lastStroke = now;

    if (!running) {
      running = true;
      requestAnimationFrame(frameLoop);
    }
  });
  frame.addEventListener('pointerleave', () => (last = null));

  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
  }).observe(frame);
  new ResizeObserver(() => {
    resize();
    clearBrush();
  }).observe(frame);

  reducedMotion.addEventListener('change', clearBrush);
}

document.querySelectorAll<HTMLElement>('[data-compare]').forEach(setup);

export {}; // a module, so its names stay private to this file
