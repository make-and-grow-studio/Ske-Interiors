# SKE Interiors — Claude Code Prompt Pack

Run these in order, one per session or task. Wait for each to finish, check the screenshots, then move to the next.

**Before Prompt 00**, create an empty folder `ske-website/` and put in it:
- `CLAUDE.md` (from this pack)
- `/content/site-content.md` (file 01 from this pack)
- `/references/` with your 4 screenshots (Modora, Renova x2, Next Concept) named `modora.png`, `renova-1.png`, `renova-2.png`, `next-concept.png`

Then open Claude Code inside `ske-website/`.

---

## 00 — Project setup

```
Read CLAUDE.md and /content/site-content.md fully.

Set up the project:
1. Create an Astro project (static output, TypeScript strict) with Tailwind, GSAP, Lenis, @astrojs/sitemap, and Playwright (for screenshots and scraping).
2. Create src/styles/tokens.css with the colours, fonts and type scale from CLAUDE.md, and wire them into Tailwind.
3. Load Bodoni Moda and Hanken Grotesk self-hosted (via @fontsource), with font-display: swap and proper fallbacks.
4. Create the folder structure: src/layouts, src/components, src/pages, src/data, /scrape, /references.
5. Add a script `npm run shots` that uses Playwright to screenshot any given URL at 375, 768 and 1440 widths into /screenshots.
6. Create /TODO-client.md and copy every [CONFIRM …] item from the content file into it as a checklist, grouped by page.

Don't build any pages yet. When done, summarise what you set up in plain language.
```

---

## 01 — Scrape the existing site (content + all images)

```
Scrape the current site https://skeinteriors.com so we keep every image and piece of content. The site is WordPress, and its inner pages render with JavaScript, so try the API first.

1. Try the WordPress REST API:
   - https://skeinteriors.com/wp-json/wp/v2/pages?per_page=100
   - https://skeinteriors.com/wp-json/wp/v2/posts?per_page=100
   - https://skeinteriors.com/wp-json/wp/v2/media?per_page=100 (paginate until empty)
   Save raw JSON to /scrape/api/.
2. Fetch https://skeinteriors.com/wp-sitemap.xml (and /sitemap.xml, /sitemap_index.xml). Build /scrape/urls.txt listing every public URL.
3. If the API is blocked, use Playwright: visit every URL from the sitemap plus the menu links, wait for network idle, and save rendered text as Markdown in /scrape/pages/<slug>.md.
4. Download every image from the media library and every <img>/background image found on each page into /scrape/images/. For WordPress thumbnails (e.g. photo-1024x768.jpg), always download the original full-size file (remove the -WxH suffix).
5. Write /scrape/manifest.json with, for each image: filename, original URL, pages it appeared on, width, height, file size.
6. Now look at every image yourself. Add to the manifest: room/subject (kitchen, living, bedroom, wardrobe, office, flooring, exterior, etc.), which project it belongs to (if any), orientation, and a quality rating (hero-ready / good / low-res / unusable). Flag duplicates.
7. Create /scrape/image-report.md: best 10 hero candidates, images per project, low-res images SKE should re-supply, and any render/photo pairs of the same room (for the design-vs-reality slider).
8. Compare scraped page text with /content/site-content.md. List anything on the old site that's missing from the content file in /scrape/content-gaps.md. Don't edit the content file.

Be polite to the server: one request at a time with a short delay.
```

---

## 02 — Design system and plan (no page code yet)

```
Read CLAUDE.md, look at every image in /references/, and read /scrape/image-report.md.

Write /design/plan.md:
1. What to take from each reference (Modora: warmth, split hero headline, image+text services grid, horizontal project carousel; Renova: restraint, horizontal timeline, team cards, "known for" list, giant wordmark footer; Next Concept: project detail layout, materials list). Be specific about each element.
2. Final token table (colour, type scale, spacing scale, radii, shadows — keep radii and shadows minimal).
3. ASCII wireframes for Home (every section in order from the content file), a service page, Our Work, a project detail page, Contact, and Get a Quote — desktop and mobile.
4. The three motion moments from CLAUDE.md, described precisely (timing, easing, trigger, reduced-motion fallback).
5. Review your plan against the references and CLAUDE.md. Point out anything that looks like a generic template choice and replace it with something specific to a Coimbatore wood-and-stone interior studio. Say what you changed.

Then build /design-system as a single Astro page showing: colours, type scale, buttons (primary, secondary, text link), form fields with error states, image card, and the header in both light and dark states. Screenshot it at 375/768/1440 and show me. Wait for my approval before building pages.
```

---

## 03 — Layout shell: header, footer, mobile bar

```
Build the global layout from CLAUDE.md and section 0 of /content/site-content.md:

1. BaseLayout.astro: <head> with title/meta/canonical/OG/Twitter props, JSON-LD slot, preloaded fonts, GA4 and Meta Pixel loaded after interaction or idle (IDs from .env).
2. Header: logo left, nav centre (Services opens a small dropdown with the three services), "Get a free quote" button right. Transparent over the home hero, solid on scroll and on inner pages. Mobile: full-screen menu with large serif links, phone and WhatsApp at the bottom.
3. Mobile bottom bar (below 768px): Call / WhatsApp / Get a quote. WhatsApp uses the prefilled message from the content file. Track clicks as click_call, click_whatsapp.
4. Footer on the charcoal colour: columns from the content file, areas served line, then a giant full-width "SKE" wordmark in Bodoni Moda (Renova reference) that fits the viewport width exactly.
5. A reusable CTA block component (heading, text, two buttons, optional background image).
6. Lenis smooth scroll setup (disabled for reduced motion).

Screenshot at 375/768/1440, review it against /references/renova-2.png for the footer, fix issues, then show me.
```

---

## 04 — Home: hero + studio intro

```
Build sections 1.1 and 1.2 of the Home page from /content/site-content.md.

Hero (reference: /references/modora.png):
- Full-viewport image using the best hero candidate from /scrape/image-report.md.
- One H1 element: small line "Interior designers in Coimbatore", then the large display line split across two staggered lines, the second offset to the right, like Modora.
- Sub-copy and two buttons in a bottom band, separated by a thin line, like Modora's hero footer.
- Bottom strip with the three facts.
- Load animation (motion moment 1): lines of the headline rise from a mask one after another, the image eases from scale 1.08 to 1. Total under 1.4s. Reduced motion: show the final state.
- Preload the hero image; serve AVIF/WebP at correct sizes.

Studio intro: heading + body left, a tall image and a small image offset right (Modora "Our expertise" block). Numbers row below with a count-up that runs once when in view.

Screenshot at 375/768/1440, run Lighthouse on mobile, report LCP and CLS, fix, then show me.
```

---

## 05 — Home: services + signature before/after reveal

```
Build sections 1.3 and 1.4 of the Home page.

Services: a mixed grid of text cards and image tiles (Modora "Complete interior services" grid) — three services, not numbered. Each card: title, description, text link. Images from the scrape, matched by subject.

Signature section — design vs reality (motion moment 2):
- Two stacked images of the same room: 3D render (top) and finished photo (bottom). Use pairs from the image report; if none exist, use a placeholder pair and add it to /TODO-client.md.
- Desktop: as the cursor moves over the image, a soft-edged brush mask reveals the finished photo, and the reveal slowly heals back over ~1.5s when the cursor stops. Build with canvas as a mask, no libraries beyond GSAP.
- Also include a draggable vertical divider handle (keyboard accessible with arrow keys, aria-label "Drag to compare design and finished room").
- Touch devices: drag handle only.
- If there are several pairs, add small thumbnails below to switch rooms.
- Reduced motion: static side-by-side.

Keep everything else in these sections still. Screenshot, test with keyboard only, then show me.
```

---

## 06 — Home: process (sticky scroll) + recent work

```
Build sections 1.5 and 1.6.

Process (motion moment 3):
- Desktop: a pinned section. Left: large step number and title; right: an image or simple line drawing per step (like Renova's line illustrations — draw these as inline SVG: a conversation, a measuring tape, a 3D room wireframe, a finished room). As the user scrolls, steps 1→4 advance, with a thin progress line.
- Mobile: no pinning, simple vertical list with the same content.
- Reduced motion: vertical list on all sizes.

Recent work: horizontal carousel (Modora "Modern interior projects"), large first card, prev/next buttons plus drag/swipe, cards link to project pages. Show title + location under each image. A "See all work" link at the end.

Screenshot, test scroll on mobile width, then show me.
```

---

## 07 — Home: testimonials, estimator, FAQ, closing CTA

```
Build sections 1.7 to 1.10.

Testimonials: slow horizontal marquee of the four quotes (pauses on hover and focus, stops for reduced motion). Show name + town, initials instead of photos. Above it, the Google rating line linking to the GBP URL from .env (hide the line if the env var is empty).

Estimator (Astro island):
- Three segmented choices (property, scope, finish) from the content file.
- Pricing table lives in src/data/pricing.json with PLACEHOLDER values and a clear comment that SKE must approve them.
- On "Show my estimate", ask for name + phone (validated Indian mobile number), submit to the form endpoint with all selections, fire generate_lead, then reveal the range with the small-print disclaimer and a WhatsApp button prefilled with their selections.

FAQ: accessible accordion (button + aria-expanded), content from the file, FAQPage JSON-LD generated from the same data.

Closing CTA: full-bleed dark image with heading, text, buttons, and beside it the address, phones and a map that loads only when clicked ("Show map").

Screenshot, test the estimator end to end with a test submission, then show me.
```

---

## 08 — Inner pages: About, services, flooring

```
Build /about-us/, /residential-interiors/, /commercial-interiors/ and /flooring/ from sections 2–5 of /content/site-content.md, reusing existing components.

- About: hero, story, horizontal timeline (Renova reference — draggable, years along a line), values, team section (hide it entirely if there are no team photos yet), numbers, CTA.
- Service pages share one ServicePage layout: hero, intro, "what we design" list with images per item where available, homes/spaces list, included list, short process link, projects strip (hide if empty), FAQs, CTA.
- Each page gets its title, meta, Service + FAQPage + BreadcrumbList JSON-LD and visible breadcrumbs.
- Internal links: every service page links to the relevant projects and to Get a Quote; Home links to each service.

Screenshot each page at 375 and 1440, then show me.
```

---

## 09 — Our Work + project pages

```
Build /our-works/ and the project detail pages.

1. Store projects as an Astro content collection in src/content/projects/ (one Markdown file per project with frontmatter: title, slug, location, type, area, rooms, timeline, year, cover, gallery, renderPairs, quote). Create the three existing projects using the scraped images for each, with [CONFIRM] fields shown as dev placeholders.
2. Keep the slugs /3bhk-home-interior/, /2bhk-house-interior/, /1bhk-house-interior/ at the root.
3. Our Work: filter tabs (only show types that have projects), mixed-size grid, lazy-loaded images.
4. Project detail layout (reference: /references/next-concept.png): H1 + location, fact strip, hero image, brief, what we did, materials, design-vs-reality slider (reuse the component), gallery with an accessible lightbox, quote, next-project link, CTA "Get a quote for a home like this".
5. Alt text per image using the pattern in the content file.
6. JSON-LD per project + breadcrumbs.

Adding a new project should only need a new Markdown file and images — write a short /docs/add-a-project.md for RJ.
```

---

## 10 — Contact, Get a Quote, Thank you, 404

```
Build sections 8–11 of the content file.

- Contact: blocks + form + click-to-load map.
- Get a Quote: multi-step form (one question per step, progress indicator, back button, keyboard friendly, state kept if the user goes back). Final step asks for name, phone, locality. Submit to the form endpoint, and also append the lead to a Google Sheet via Apps Script webhook (URL from .env). Send the lead email to the address in .env.
- On success redirect to /thank-you/ (noindex), which fires generate_lead (GA4) and Lead (Meta Pixel) once.
- Error messages exactly as in the content file.
- 404 page with the three links.
- Point every "Get a free quote" button on the site to /get-a-quote/.

Do a real test submission and show me the email/Sheet result.
```

---

## 11 — SEO, redirects, and schema check

```
Do a full SEO pass:
1. Using /scrape/urls.txt, create the redirect map (vercel.json or _redirects). Every old URL → new URL with 301. Include /flooring-interiors/ → /flooring/ and any old WordPress paths (/wp-content/uploads/... images that Google has indexed → new image paths where possible, /feed/, /category/..., /author/... → home).
2. Confirm every page has a unique title (≤60 chars), meta description (≤155), one H1, canonical, OG image (generate branded 1200x630 OG images per page at build time).
3. Validate all JSON-LD against schema.org types; list any errors.
4. sitemap.xml (exclude thank-you and design-system), robots.txt pointing to it.
5. Check that all page text is present in the built HTML (view-source), not injected by JS.
6. Output /docs/seo-report.md with a table of every page: URL, title, description, H1, schema types, word count, internal links in/out.
```

---

## 12 — Performance, accessibility, final QA

```
Final QA:
1. Build and run Lighthouse (mobile and desktop) on Home, a service page, a project page and Get a Quote. Target ≥90 in every category. Fix issues and report before/after scores.
2. Check image weights: nothing above the fold over 200 KB, all images have width/height, AVIF/WebP served.
3. Accessibility: keyboard-only walkthrough of every page (menu, dropdown, slider, carousel, accordion, forms, lightbox); visible focus states in brass; colour contrast AA; reduced-motion mode shows everything without animation.
4. Screenshot every page at 375/768/1440 into /screenshots/final/ and check for overflow, overlapping text, or orphaned words in headings.
5. Test all tel:, mailto: and WhatsApp links.
6. Update /TODO-client.md with everything still waiting on SKE.
Show me a summary of what passed and what's left.
```

---

## 13 — Launch checklist (you do these, Claude Code can help)

```
Write /docs/launch.md: a step-by-step launch checklist for RJ covering:
- Deploy to Vercel/Cloudflare and connect skeinteriors.com (DNS steps)
- Keep the old WordPress site backed up before switching
- Verify redirects on the live domain with a script that checks every URL in /scrape/urls.txt returns 301 → 200
- Submit sitemap in Google Search Console, request indexing for the main pages
- Update the website link and details on Google Business Profile, IndiaMART, Justdial, Facebook and Instagram so the address and phone match exactly
- Check GA4 real-time for a test lead
- Monitor Search Console for 404s for two weeks
```

---

## Tips while working

- If a result looks generic, say: "This looks like a template. Look at /references/modora.png again and make it feel more like a wood-and-stone interior studio — less UI, more photography and type."
- To change one thing, point at it: "In the services grid on desktop, the second card's image is too short — match the row height." Small, specific requests work better than "make it better".
- Run `/clear` between big sections so the context stays focused; CLAUDE.md reloads automatically.
- Commit after every approved section so you can roll back.
