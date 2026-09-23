# CLAUDE.md — SKE Interiors website

You are building the new skeinteriors.com: a premium, Awwwards-quality marketing site for a Coimbatore interior design and build studio. Its job is to rank locally and turn visitors into quote requests. Read this file before every task.

## Owner
RJ is a UI/UX designer, not a developer. Explain choices in plain language, keep code organised and commented, and show screenshots after visual changes.

## Source of truth
- Copy: `/content/site-content.md`. Use it word for word. Never publish text inside `[CONFIRM …]` or `[IMG …]` brackets — render a visible dev-only placeholder instead and list it in `/TODO-client.md`.
- Scraped assets and data: `/scrape/` (manifest.json, pages/, images/, urls.txt).
- Visual references: `/references/` (Modora, Renova, Next Concept screenshots).

## Stack
- Astro (static output), TypeScript, Tailwind CSS
- GSAP + ScrollTrigger for scroll motion, Lenis for smooth scroll
- Astro `<Image>` / `<Picture>` for AVIF + WebP with width/height set
- Forms: Web3Forms (or a Netlify/Vercel function) → email + Google Sheet; WhatsApp deep links
- Deploy: Vercel or Cloudflare Pages
- No React unless a component truly needs state (the estimator and quote form may use a small island).

## Design direction
Quiet luxury, material-led. RJ revised the look after prompt 04 (references in `/references/`: `luxury-banner.webp`, `elite.png`, `aebele.webp`): ivory and marble-white grounds, warm charcoal text, one gold accent, light high-contrast serif headlines in capitals, small spaced-out capital labels, and a handwritten script used sparingly as a signature. Layout ideas still come from Modora (hero, services grid, carousel), Renova (restraint, timeline, wordmark footer) and Next Concept (project pages).

Tokens (adjust in `src/styles/tokens.css` only):
- `--ivory` #F4F1EC (main background), `--paper` #FBF9F6 (lighter panels)
- `--graphite` #2E2C28 (text and primary buttons), `--graphite-muted` #6B655C (secondary text)
- `--sand` #D9D1C4 (hairlines only)
- `--espresso` #221D18 (dark sections, footer, photo scrims)
- `--gold` #B8925A (single accent: rules, script, accents on dark). On ivory, small gold text uses `--gold-deep` #82643A (gold alone fails contrast)
- `--white` #FFFFFF
Do not introduce terracotta/orange accents or gradients.

Type:
- Display: Cormorant Garamond Light (300) for H1/H2/H3, card titles and the footer wordmark, set in capitals via CSS, lining numerals
- Text/UI: Jost for body; nav, buttons and labels in small spaced capitals (12px, 0.22em tracking)
- Script: Ms Madi (brush signature) as the accent (e.g. the hero's second line). At most one per section, never for information people must read quickly
- Scale: 1.25 ratio; body 17–18px, line-height 1.65; display headings tight (0.95–1.0)
- Write copy in sentence case in the HTML; capitals come from CSS (`text-transform`), so search engines and screen readers get normal text
- Line length under 75 characters for body copy.

Layout:
- 12-column grid, max width 1440px, side padding 24px mobile / 48px desktop
- Numbered markers (1, 2, 3, 4) only where content is a real sequence: the process and the timeline. Service cards are not numbered.
- Photography carries the site. Large images, minimal UI chrome over them.

## Motion rules
Spend motion in three places only:
1. Hero load: staggered headline reveal + image scale-in (once).
2. Signature: design-vs-reality brush/drag reveal.
3. Process: sticky scroll section where steps advance as you scroll.
Everything else: subtle or none. No fade-up on every section, no hover animations on every card.
- Always respect `prefers-reduced-motion` (show final state, no scroll-jacking).
- Never animate layout properties; use transform/opacity.
- Lenis off on touch devices if it harms native scroll.

## SEO rules
- Keep existing URL slugs. Every old URL must 301 to its new equivalent (see `/scrape/urls.txt` → `redirects` config).
- Each page: unique `<title>` and meta description from the content file, one H1, logical H2/H3, canonical, Open Graph + Twitter tags, OG image.
- JSON-LD per page as listed in the content file (HomeAndConstructionBusiness, Service, FAQPage, BreadcrumbList, etc.). NAP must match the content file exactly.
- All text must be in the HTML at build time (no client-only rendering of content).
- Descriptive alt text on every image using the pattern in the content file.
- `sitemap.xml`, `robots.txt`, noindex on `/thank-you/`.

## Lead-gen rules
- "Get a free quote" visible at all times (header on desktop, bottom bar on mobile with Call / WhatsApp / Quote).
- Every form: phone required, WhatsApp-friendly, clear error messages, redirect to `/thank-you/`.
- Track: GA4 `generate_lead`, `click_call`, `click_whatsapp`; Meta Pixel `Lead`. IDs in `.env`.

## Performance budget
- Lighthouse mobile ≥ 90 for Performance, Accessibility, Best Practices, SEO
- LCP < 2.5s on 4G, CLS < 0.1
- Hero image preloaded; everything below the fold lazy-loaded; map iframe loads on interaction
- Total JS on the home page < 120 KB gzipped

## Working style
- One section or page per task. After each: run the dev server, take Playwright screenshots at 375, 768 and 1440 widths, review them yourself, fix issues, then show RJ.
- Commit after each approved section with a clear message.
- If something in the content file is unclear or missing, ask; don't invent business facts (prices, years, brands, warranties, project details).
