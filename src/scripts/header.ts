/**
 * Header behaviour:
 *  1. Overlay header turns solid once the page scrolls (home page).
 *  2. Services dropdown: click / Enter / Space toggles, hover opens on
 *     mouse devices, Esc and clicking outside close it.
 *  3. Full-screen mobile menu in a <dialog> (focus trap + Esc built in).
 */
import { lenis } from './smooth-scroll';

// ---- 1. Overlay → solid on scroll ----
const overlay = document.querySelector<HTMLElement>('[data-header="overlay"]');
if (overlay) {
  const setSolid = (solid: boolean) => {
    overlay.classList.toggle('is-solid', solid);
    // over the photo the header uses white "photo" tokens; solid uses plaster ones
    overlay.classList.toggle('surface-photo', !solid);
  };
  // A 1px marker 80px down the page: once it scrolls out of view, go solid
  const marker = document.createElement('div');
  marker.setAttribute('aria-hidden', 'true');
  marker.style.cssText = 'position:absolute;top:80px;left:0;width:1px;height:1px;pointer-events:none;';
  document.body.prepend(marker);
  new IntersectionObserver(([entry]) => setSolid(!entry.isIntersecting)).observe(marker);
}

// ---- 2. Services dropdown ----
document.querySelectorAll<HTMLElement>('[data-dropdown]').forEach((item) => {
  const button = item.querySelector('button')!;
  const panel = item.querySelector<HTMLElement>('.dropdown')!;
  let closeTimer: number | undefined;

  const setOpen = (open: boolean) => {
    window.clearTimeout(closeTimer);
    button.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
  };
  const isOpen = () => button.getAttribute('aria-expanded') === 'true';

  // Hover opens on mouse/trackpad only (touch and keyboard use the click)
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let openedByHover = false;
  item.addEventListener('pointerenter', (e) => {
    if (finePointer.matches && e.pointerType === 'mouse' && !isOpen()) {
      openedByHover = true;
      setOpen(true);
    }
  });

  button.addEventListener('click', () => {
    // A mouse user who hovered then clicked expects it to stay open
    if (openedByHover) {
      openedByHover = false;
      setOpen(true);
      return;
    }
    setOpen(!isOpen());
  });
  item.addEventListener('pointerleave', (e) => {
    if (finePointer.matches && e.pointerType === 'mouse') {
      openedByHover = false;
      closeTimer = window.setTimeout(() => setOpen(false), 150);
    }
  });

  item.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      setOpen(false);
      button.focus();
    }
  });
  // Close when focus or a click leaves the item
  item.addEventListener('focusout', (e) => {
    if (!item.contains(e.relatedTarget as Node)) setOpen(false);
  });
  document.addEventListener('click', (e) => {
    if (!item.contains(e.target as Node)) setOpen(false);
  });
});

// ---- 3. Mobile menu ----
document.querySelectorAll<HTMLButtonElement>('[data-menu-open]').forEach((openBtn) => {
  const dialog = document.getElementById(openBtn.getAttribute('aria-controls') || '') as HTMLDialogElement | null;
  if (!dialog) return;

  openBtn.addEventListener('click', () => {
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
    lenis?.stop();
  });
  dialog.querySelector('[data-menu-close]')?.addEventListener('click', () => dialog.close());
  // Following a link closes the menu (matters for same-page #anchors)
  dialog.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
    lenis?.start();
    openBtn.focus();
  });
  // If the screen is widened past the mobile breakpoint, close the menu
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
    if (e.matches && dialog.open) dialog.close();
  });
});
