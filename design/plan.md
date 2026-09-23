# SKE Interiors: design plan

Inputs: `CLAUDE.md`, the four screenshots in `/references/`, `scrape/image-report.md`, `scrape/content-gaps.md` and `content/site-content.md`.

The short version: **Modora's warmth and hero, Renova's restraint and structure, Next Concept's project depth**, set in Bodoni and Hanken on lime plaster and teak. The site is built around the few real SKE photographs we have (and the ones we're asking for), not around UI.

---

## 1. What we take from each reference

### Modora (`references/modora.png`)

| Element | What it does in the reference | What we take | What we leave |
|---|---|---|---|
| **Split hero headline** | Serif headline over a full-bleed, warm, naturally lit room. Line 1 is left-aligned; line 2 ("elevates everyday living") is pushed to the right edge, so the headline reads as two staggered blocks with the photo showing between them | The two-line stagger for "Spaces crafted / for the way you live": line 1 starts at column 1, line 2 ends at column 12. The small line "Interior designers in Coimbatore" sits above line 1 in Hanken, sentence case | Modora's all-caps nav |
| **Hero footer band** | A thin-outlined box along the bottom of the hero: paragraph on the left, a vertical hairline, then a solid white button and an underlined text link with ↗ | The band layout exactly: sub-copy left (max 60ch), 1px hairline divider, then "Get a free quote" (solid) and "See our work" (text link). Below it, our three-fact strip ("Since 2011 · 100+ projects · Handover in about 30 days") | The boxed outline: we use a single hairline above the band instead. Lighter, more Renova |
| **"Our expertise" block** | Large serif heading top-left, body copy and "More about us ↗" at bottom-left of the same column, with a lot of empty space between. Right side: a tall image with a small image offset lower-left, overlapping into the gutter | Used as-is for the Home studio intro (1.2): heading cols 1–5, body anchored to the bottom of cols 1–4, tall image cols 7–12, small image cols 6–8 dropped ~40% down. The numbers row sits under the whole block | — |
| **Services grid** | A 3×2 grid mixing light text cards (number, title, hairline, description, "See details") with image tiles, so text and photos alternate like a chequerboard | The mixed grid: three service text cards alternating with three photo tiles in a 3×2 (desktop) grid. Each text card: title, hairline, description, text link | The `/01` numbers (CLAUDE.md: service cards are not numbered), the grey card fills (we use plaster with a stone hairline), and the black "View all service" button |
| **Project carousel** | Heading left, ← → buttons right (outline previous, filled next). Cards of different widths; one taller card with a round "View" badge over the image; caption under each | The carousel: first card larger (per the prompt), captions under images, outline/filled arrow pair. Caption = project title left, location right | Prices under cards (we're not a shop), the "View" badge, and the image-tag chips ("OFFICE SPACE") from the "Smart solutions" row |
| **Mood** | Warm afternoon light, wood, linen, clay and plants. Nothing cold or blue | The photography brief for SKE (below) and the warm palette | — |

### Renova (`references/renova-1.png`, `references/renova-2.png`)

| Element | What it does in the reference | What we take | What we leave |
|---|---|---|---|
| **Restraint** | White space everywhere, one type family, hairlines instead of boxes, small text set very small. No shadows, no rounded corners | The default for everything outside the hero and the three motion moments: hairlines (`--stone`), square corners, generous section spacing (`--section-y`, 64–128px) | Renova's tiny 11px body text, which is too small for our audience |
| **Hero** | Full-bleed muted photo, one huge centred headline, a one-line intro bottom-left, two ↗ text links bottom-right | The bottom-left / bottom-right anchoring of small text in the hero (it matches Modora's band). Also used on inner-page heroes: small intro bottom-left, links bottom-right | The all-caps centred headline |
| **Philosophy cards** | 3 equal cards: the first is a photo, the other two are **thin line drawings** (vase, pendant lamps) on white with a hairline border | **The line-drawing style** for our process illustrations (conversation, measuring tape, 3D wireframe room, finished room: prompt 06), drawn as 1.25px teak strokes. Also the photo + line-drawing card mix for the About page values (2.4) | Numbering the cards (only process and timeline are numbered) |
| **Horizontal timeline** | A full-bleed dark photo with a thin horizontal line across it; years sit on the line; one year is "open", showing a white card with a title, one line of text and a photo | The About timeline exactly: dark photo, 1px plaster line, years as stops, the active year opens a plaster card (title, text, image). Draggable on desktop, a vertical list on mobile | — |
| **Text marquee** | "Crafted interior spaces / *Timeless* design" scrolling across | Nothing | Motion is limited to three places, and the italic single-word accent is banned by CLAUDE.md |
| **Team** | Label left ("People behind Renova"), statement right, then a row of tall portrait photos; under each, name left and role right on one line | The layout for About 2.5, **only when SKE sends real team photos**. Hidden otherwise | — |
| **Centred statement** | A short centred paragraph between sections | One per page at most, e.g. the Home "Clients tell us the same three things…" line | — |
| **"What we're known for"** | Small label left; heading + intro right; then a list of rows: title left, one-line description right, hairline under each row | The row list, for **"Why businesses choose SKE"** (Commercial 4.4), "What's included" (Residential 3.5) and project "Materials and finishes" | The "Design awards / Featured work" content: SKE has no confirmed awards |
| **Closing CTA** | Full-bleed dark interior with a fireplace; small centred heading and a "Start your project ↗" link | The full-bleed dark photo CTA for Home 1.10, but with our content: heading and buttons left, address / phones / "Show map" right | The centred all-caps line |
| **Footer** | Charcoal. A grid with thin vertical dividers: labels, address, a big centred phone + email, legal. Then a **giant "RENOVA" wordmark** filling the full width | All of it: columns from the content file separated by 1px dividers at 15% plaster; big centred phone and email; then **"SKE" in Bodoni** sized to exactly the viewport width | Sans-serif for the wordmark (ours is Bodoni) |

### Next Concept (`references/next-concept.png`)

| Element | What it does in the reference | What we take | What we leave |
|---|---|---|---|
| **Project detail page** | Project title as a big heading ("Elegant cashmere kitchen") over a wide hero render; a "Details" section with a label left and two text columns right, the second a technical paragraph (materials, hardware, lighting) | The project page's rhythm: H1 + location → fact strip → full-width hero → "The brief" and "What we did" as label-left / text-right two-column blocks | The dark UI: our project pages stay on plaster, so the photos provide the colour |
| **"We use the best"** | A vertical list of hardware brand logos (Blum, Häfele…) on the project page | **A "Materials and finishes" list per project**, as rows (material · where it's used · finish). Brand names appear **only if SKE confirms real brands** (TODO-client, Residential 3.5). No logos until then | Showing any brand we can't confirm |
| **Line drawing next to render** | A black-and-white line elevation of the kitchen next to the finished render of the same view | The storytelling idea behind our signature section: **the drawing you approve vs the room you get.** It confirms the design-vs-reality slider is the right signature for SKE | Making our own "drawings" from renders. The comparison must be real material from SKE (render + photo of the same room), or it isn't honest |
| **Category labels** | Small vertical labels ("Metallic furniture", "Upholstery") beside gallery images | A small horizontal caption under gallery images (room + material), since vertical text is harder to read | Vertical text |
| **Contact block** | Heading, one paragraph, icon + text rows for phone / email / address, the form on the right | Contact page layout (section 8): details left, form right | — |

### A photography brief for SKE (from the references)

All three references work because of the photographs. The scrape shows we don't have those yet: no hero-ready photo, 3 real photos in total. To ask SKE for:

1. **Wide, landscape shots of finished rooms** in daylight (morning or late afternoon), lights off or warm, camera at chest height, straight verticals. At least 2400px wide. This is the hero and closing CTA.
2. **Details**: wood grain, handles, stone edges, the oonjal swing chain. These make the material story without extra UI.
3. **The same room twice**: the 3D render view and a photo from the same spot after handover, for the signature slider.

Until then, the interim hero is `20220212_183809_IMG_3976.jpg` (landscape, 2048px, warm, wood) **only if SKE confirms ownership** (it has another studio's watermark). Otherwise it's `20190131_190715_5c7214a7…jpg` (3BHK living room, 1280px), which is soft at full width.

---

## 2. Tokens

All values live in `src/styles/tokens.css`. The contrast figures are WCAG ratios (text needs 4.5:1; large text and UI outlines need 3:1).

### Colour

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--lime-plaster` | `#ECE6DC` | Main background | — |
| `--teak` | `#5B3E2A` | Text on light, primary button | 7.8:1 on plaster, 9.7:1 on white |
| `--teak-muted` | `#78604E` (teak at 80% on plaster) | Secondary text, captions, form field borders | 4.7:1 on plaster ✓ text |
| `--stone` | `#BDB3A4` | Hairlines and dividers only (decorative) | 1.7:1, **never** text or the only edge of a control |
| `--charcoal` | `#1F1D1A` | Dark sections, footer, image overlays | Plaster on charcoal 13.6:1 |
| `--brass` | `#A5854F` | The accent **on dark backgrounds**: links, focus ring, active states | 4.9:1 on charcoal ✓; **only 2.8:1 on plaster ✗** |
| `--brass-deep` | `#7C643B` (**new**) | The same accent **on light backgrounds**: link underlines, focus ring, active nav, selected choices | 4.5:1 on plaster ✓, 5.6:1 on white ✓ |
| `--white` | `#FFFFFF` | Cards on dark, text on photos | — |
| `--error` | `#8C2F24` (**new**, functional only) | Form error text and border, always with an icon and words | 6.6:1 on plaster ✓ |

Why the two new colours: brass on plaster fails contrast even for the focus ring, so on light backgrounds the accent becomes `--brass-deep`, the same hue made darker. It's still one accent. `--error` is the only non-palette colour. It's a deep brick used solely for form errors, never decoratively, so it isn't a terracotta accent.

Links: `--brass-deep` and teak are only 1.7:1 apart, so colour alone can't mark a link. Links in running text are **always underlined** (1px brass-deep underline, 0.2em offset), and the underline thickens to 2px on hover and focus.

Photo overlay: `linear-gradient` is not allowed (no gradients), so text on photos sits on a flat 35% charcoal scrim over the lower part of the image, or on a solid band.

### Type

| Step | Mobile → desktop | Font | Use |
|---|---|---|---|
| `--step-8` | 73 → 107px | Bodoni Moda 400, 1.0, −0.02em | Home hero display line |
| `--step-7` | 61 → 86px | Bodoni Moda 400, 1.0 | Footer wordmark base (scaled to fit), About hero |
| `--step-6` | 51 → 69px | Bodoni Moda 400, 1.05 | Page H1 |
| `--step-5` | 42 → 55px | Bodoni Moda 400, 1.05 | Large H2 (section openers) |
| `--step-4` | 35 → 44px | Bodoni Moda 400, 1.1 | H2 |
| `--step-2` | 24 → 28px | Hanken 500, 1.25 | H3, card titles |
| `--step-1` | 20 → 22px | Hanken 400, 1.5 | Lead paragraphs, hero sub-copy |
| `--step-0` | 17 → 18px | Hanken 400, 1.6 | Body |
| `--step-n1` | 14px | Hanken 500, 1.4 | Labels, captions, nav, buttons |
| `--step-n2` | 12px | Hanken 400 | Legal only |

Rules: sentence case everywhere, including nav and buttons. No all-caps, no italics for emphasis. Body measure ≤ 70ch. Bodoni only at 35px and above, where its hairlines hold up; everything smaller is Hanken.

### Spacing, layout, shape, elevation, motion

| Token | Value |
|---|---|
| Spacing scale | 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px (`--space-1` … `--space-10`) |
| Section spacing | `--section-y`: 64px (mobile) → 128px (desktop) |
| Grid | 12 columns, max 1440px, gutter 16px mobile / 24px desktop, side padding 24px / 48px |
| Radius | **0** for images, cards, buttons and fields (architectural, like both references). `--corner-round: 999px` only for the round slider handle and carousel arrows |
| Borders | 1px `--stone` hairlines for dividers. 1px `--teak-muted` for form fields |
| Shadows | **None.** Depth comes from photography and layering (the Modora offset image, the Renova timeline card). The only "shadow" is the focus ring |
| Focus | 2px solid `--brass-deep` on light, `--brass` on dark, 3px offset |
| Motion | Ease `cubic-bezier(0.22, 1, 0.36, 1)`; UI transitions 200ms (colour and underline only); the three motion moments are specified in section 4 |

---

## 3. Wireframes

Legend: `[img]` photo · `▔▔` hairline · `(Btn)` solid button · `Link →` text link · `│` divider.

### Home: desktop (1440)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ SKE logo        Home  About  Services▾  Our work  Contact     (Get a free quote)│ ← transparent, plaster text
│                                                                              │
│  [full-bleed hero photo: warm, landscape, 100svh]                            │
│                                                                              │
│  Interior designers in Coimbatore                                            │  1.1 Hero (one H1)
│  Spaces crafted                                                              │
│                                           for the way you live               │  ← line 2 pushed right
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ │
│  Homes, offices and shops across…   │   (Get a free quote)   See our work →  │
│  Since 2011 · 100+ projects · Handover in about 30 days                      │
└──────────────────────────────────────────────────────────────────────────────┘
│                                                                              │
│  Fifteen years of homes,                        ┌───────────────┐            │  1.2 Studio intro
│  finished the way they                          │               │            │
│  were promised.                                 │  [tall img]   │            │
│                                        ┌──────┐ │               │            │
│  Body… (≤4 cols)                       │[img] │ │               │            │
│  More about us →                       └──────┘ └───────────────┘            │
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ │
│   15+ years   │   100+ projects   │   90+ clients   │   40 people          │  numbers (count once)
│                                                                              │
│  What we design and build                                                    │  1.3 Services
│  ┌─────────────────┐┌─────────────────┐┌─────────────────┐                   │
│  │ Residential      ││   [image]       ││ Commercial       │                  │
│  │ ▔▔▔▔▔▔           ││                 ││ ▔▔▔▔▔▔           │                  │
│  │ text…  Explore → ││                 ││ text…  Explore → │                  │
│  └─────────────────┘└─────────────────┘└─────────────────┘                   │
│  ┌─────────────────┐┌─────────────────┐┌─────────────────┐                   │
│  │   [image]        ││ Flooring        ││   [image]        │                  │
│  └─────────────────┘└─────────────────┘└─────────────────┘                   │
│                                                                              │
│  The 3D design you approve              ┌──────────────────────────────┐     │  1.4 Signature
│  is the home you get.                   │ [render │◀▶│ photo]          │     │  brush + drag
│  Body…                                  │          handle              │     │
│  Drag to compare                        └──────────────────────────────┘     │
│                                         [thumb][thumb][thumb]  (if >1 pair)  │
│                                                                              │
│ ┌────────────────────────── pinned ──────────────────────────────────────┐   │  1.5 Process
│ │ How your project moves…                                                 │   │  (sticky, 4 steps)
│ │  1                                   ┌──────────────────────┐           │   │
│ │  Plan                                │  [line drawing SVG]  │           │   │
│ │  text…                               └──────────────────────┘           │   │
│ │  ▔▔▔▔▔▔▔▔ progress 1 ── 2 ── 3 ── 4                                      │   │
│ └─────────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Recent homes                                                   (←) (→)      │  1.6 Recent work
│  ┌──────────────┐┌─────────┐┌─────────┐┌────                                │
│  │  [large]      ││ [img]   ││ [img]   ││                                    │
│  └──────────────┘└─────────┘└─────────┘└────                                │
│  3BHK home interior   Coimbatore   …                     See all work →      │
│                                                                              │
│  What our clients say          ★ 4.x from NN Google reviews · Read reviews → │  1.7 Testimonials
│  « quote card »  « quote card »  « quote card »  « quote …   (slow marquee)   │
│                                                                              │
│  Get a rough budget in 30 seconds                                            │  1.8 Estimator
│  Property  [1BHK][2BHK][3BHK][Villa][Office]                                 │
│  Scope     [Kitchen only][Kitchen + wardrobes][Full home]                    │
│  Finish    [Essential][Premium][Luxury]             (Show my estimate)       │
│                                                                              │
│  Questions we get asked                                                      │  1.9 FAQ
│  ▔▔ How much does interior design cost in Coimbatore?                  +     │
│  ▔▔ How long does a full home interior take?                           +     │
│                                                                              │
│ ████████████████ [full-bleed dark photo] ███████████████████████████████████ │  1.10 Closing CTA
│ █ Let's plan your space.              │  Address                          █ │
│ █ Body…                               │  Phones                           █ │
│ █ (Get a free quote) WhatsApp us →    │  [Show map]                       █ │
│ ████████████████████████████████████████████████████████████████████████████ │
│ ░ charcoal footer ░ Services │ Studio │ Visit │ Talk                        ░ │
│ ░ Areas we serve: Coimbatore, Tiruppur, Pollachi                            ░ │
│ ░ SKE  (Bodoni, full viewport width)                                        ░ │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Home: mobile (375)

```
┌─────────────────────────┐
│ SKE logo          ☰ Menu│
│ [hero photo, 100svh]    │
│ Interior designers in   │
│ Coimbatore              │
│ Spaces                  │
│ crafted                 │
│      for the way        │  ← stagger kept, smaller
│      you live           │
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ │
│ Homes, offices…         │
│ (Get a free quote)      │
│ See our work →          │
│ Since 2011 · 100+ · 30d │
├─────────────────────────┤
│ Heading (studio intro)  │
│ [tall image]            │
│   [small img offset]    │
│ Body… More about us →   │
│ 15+ │ 100+  (2×2 grid)  │
│ 90+ │ 40                │
├─────────────────────────┤
│ Residential (text card) │
│ [image]                 │
│ Commercial              │
│ [image]                 │
│ Flooring                │
├─────────────────────────┤
│ Signature: stacked      │
│ [render│▶│photo]        │  drag handle only
├─────────────────────────┤
│ Process: plain list     │  no pinning
│ 1 Plan  [drawing]       │
│ 2 Estimate …            │
├─────────────────────────┤
│ Recent homes → swipe    │
│ Testimonials (marquee)  │
│ Estimator (stacked)     │
│ FAQ accordion           │
│ Closing CTA (dark)      │
│ Footer + SKE wordmark   │
├─────────────────────────┤
│ [Call][WhatsApp][Quote] │ ← fixed bottom bar
└─────────────────────────┘
```

### Service page (Residential; Commercial and Flooring share the layout)

```
Desktop                                                       Mobile
┌──────────────────────────────────────────────────────┐     ┌───────────────────┐
│ header (solid, plaster)                               │     │ header            │
│ Home / Residential interiors            (breadcrumbs) │     │ breadcrumbs       │
│ Home interiors in Coimbatore,       ┌──────────────┐ │     │ H1 (3–4 lines)    │
│ designed around your family.         │ [hero image] │ │     │ Sub               │
│ Sub…                                 │              │ │     │ (Quote) Projects→ │
│ (Get a free quote)  See home projects→└──────────────┘ │     │ [hero image]      │
│ ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ │     │ Intro             │
│ Intro (centred statement, ≤60ch)                      │     │ What we design:   │
│ What we design                                        │     │  [img] Kitchens   │
│ ┌──────┐ Modular kitchens │ ┌──────┐ Wardrobes        │     │  [img] Wardrobes  │
│ │[img] │ text…            │ │[img] │ text…            │     │  …                │
│ └──────┘                  │ └──────┘                  │     │ Homes we work on  │
│ Homes we work on: 1BHK · 2BHK · 3BHK · Houses · Villas│     │ What's included   │
│ What's included (Renova rows: item │ one line)        │     │  (rows)           │
│ ▔▔ Site visit and measurement │ …                     │     │ Process link      │
│ ▔▔ 3D design with revisions   │ …                     │     │ Projects (swipe)  │
│ How we work (4 steps, compact) → full process on Home │     │ FAQ               │
│ Projects strip (3 cards)  — hidden if empty           │     │ CTA               │
│ FAQ accordion                                         │     │ footer            │
│ CTA band (dark)                                       │     │ bottom bar        │
│ footer                                                │     └───────────────────┘
└──────────────────────────────────────────────────────┘
```

### Our work

```
Desktop                                                  Mobile
┌─────────────────────────────────────────────────┐     ┌───────────────────┐
│ Our work                                         │     │ Our work          │
│ Homes and spaces we've designed and built…       │     │ Sub               │
│ [All] [Homes]   ← filters, only types with work  │     │ [All][Homes]      │
│ ┌────────────────────┐┌──────────┐               │     │ [card]            │
│ │ [large, 7 cols]    ││[5 cols]  │               │     │ 3BHK … Coimbatore │
│ └────────────────────┘└──────────┘               │     │ [card]            │
│ 3BHK home interior        Coimbatore · Home      │     │ [card]            │
│ ┌──────────┐┌────────────────────┐               │     │ Want your space   │
│ │[5 cols]  ││ [7 cols]           │  (alternates) │     │ here next? (Quote)│
│ └──────────┘└────────────────────┘               │     └───────────────────┘
│ Want your space here next?  (Get a free quote)   │
└─────────────────────────────────────────────────┘
```

### Project detail (Next Concept rhythm)

```
Desktop                                                        Mobile
┌────────────────────────────────────────────────────────┐    ┌───────────────────┐
│ Home / Our work / 3BHK home interior                    │    │ breadcrumbs       │
│ 3BHK home interior                                      │    │ H1                │
│ Coimbatore                                              │    │ Location          │
│ ▔▔ Type │ Area │ Rooms │ Timeline │ Year  (fact strip)  │    │ facts (2×3 grid)  │
│ [full-width hero image, 16:9]                           │    │ [hero]            │
│ The brief      │  2–3 sentences                         │    │ The brief         │
│ What we did    │  rooms and key elements                │    │ What we did       │
│ Materials      │  ▔▔ Laminate │ kitchen shutters        │    │ Materials (rows)  │
│                │  ▔▔ Quartz   │ counter                 │    │ Design vs reality │
│ Design vs reality slider (if a pair exists)             │    │ Gallery (1 col)   │
│ Gallery: 12-col mosaic, lightbox                        │    │ Quote             │
│ « client quote »                                        │    │ Next project →    │
│ Next project: 2BHK house interior →                     │    │ CTA               │
│ Get a quote for a home like this (CTA)                  │    └───────────────────┘
└────────────────────────────────────────────────────────┘
```

### Contact

```
Desktop                                                      Mobile
┌──────────────────────────────────────────────────────┐    ┌───────────────────┐
│ Let's talk about your space.                          │    │ H1                │
│ Sub…                                                  │    │ Sub               │
│ ┌────────────────────┐  ┌──────────────────────────┐  │    │ Call ▸ 3 numbers  │
│ │ Visit  address ↗    │  │ Name*      Phone (WA)*   │  │    │ WhatsApp ▸        │
│ │ Call   3 numbers    │  │ Email      Property type │  │    │ Email ▸           │
│ │ Email               │  │ Area / locality          │  │    │ Visit ▸ address   │
│ │ WhatsApp            │  │ Message                  │  │    │ Hours             │
│ │ Hours               │  │ (Send enquiry)           │  │    │ Form (1 col)      │
│ └────────────────────┘  └──────────────────────────┘  │    │ [Show map]        │
│ [Show map] → loads the Google map on click             │    └───────────────────┘
└──────────────────────────────────────────────────────┘
```

### Get a quote (one question per step)

```
Desktop                                                   Mobile
┌─────────────────────────────────────────────────┐      ┌───────────────────┐
│ Get a free quote                                 │      │ Get a free quote  │
│ Four quick questions…                            │      │ Step 2 of 5 ▔▔▔▔░░│
│ Step 2 of 5   ▔▔▔▔▔▔▔▔▔▔▔▔░░░░░░░░░░              │      │ Size?             │
│                                                  │      │ [1BHK]            │
│ What size is it?                                 │      │ [2BHK]            │
│ [1BHK] [2BHK] [3BHK] [Villa] [sq ft: ____]       │      │ [3BHK] …          │
│                                                  │      │                   │
│ ← Back                              (Continue)   │      │ ← Back (Continue) │
│ No spam. We only use your number to discuss…     │      └───────────────────┘
└─────────────────────────────────────────────────┘
```

---

## 4. The three motion moments

Shared rules: GSAP + ScrollTrigger. Transform and opacity only. Every moment checks `prefers-reduced-motion: reduce` through `gsap.matchMedia()` and shows the final state when it's on. Lenis drives smooth scroll on non-touch devices only (`pointer: fine`) and is off when reduced motion is on; ScrollTrigger updates from Lenis's scroll event.

### 1. Hero load (once per page view)

> **Built with CSS, not GSAP (prompt 04).** Same timings and easing as below, but as CSS keyframes. That way the animation starts on the first frame and the headline never waits for a ~30 KB script on slow 4G. The home page ships no animation JavaScript for the hero, and it needs no "wait for image decode" step. Lighthouse mobile: Performance 98, LCP 2.0s, CLS 0.

| | |
|---|---|
| Trigger | `DOMContentLoaded`, after the hero image has decoded (`img.decode()`), capped at 300ms of waiting so a slow image never holds the text back |
| Image | `scale` 1.08 → 1, **1.4s**, `power3.out`. It is visible from the first frame (scale only, no fade), so it still counts as the LCP immediately |
| Headline | Each visual line sits in an `overflow: clip` wrapper and rises from `yPercent: 110` → 0, **0.9s**, `expo.out`, **stagger 0.12s**, starting at 0.1s. Order: small line → "Spaces crafted" → "for the way you live" |
| Band | Sub-copy, buttons and fact strip: `opacity` 0 → 1 and `y` 12px → 0, 0.5s, starting at 0.7s |
| Total | Finished by 1.3s |
| No-JS / reduced motion | The initial hidden states are applied only under `.js` and `prefers-reduced-motion: no-preference`, so without JS or with reduced motion the hero renders complete |

### 2. Signature: design vs reality

| | |
|---|---|
| Structure | Render (top layer) and finished photo (bottom layer), same aspect ratio. A `<canvas>` sized to the frame holds the brush mask; the photo is drawn through it |
| Brush (desktop, `pointer: fine` only) | On pointer move, stamp a soft radial brush (radius 110px, alpha falloff from centre) into the mask. It reveals the photo where the cursor passes |
| Heal | Every frame the mask loses opacity (`destination-out` at ~4% per frame), so a stroke fully heals **~1.5s after the cursor stops**. The rAF loop runs only while the mask isn't empty and the section is in view (IntersectionObserver) |
| Drag divider | A vertical handle splits render / photo (`clip-path: inset()` on the photo layer). It works with the brush. The handle is a real slider: `role="slider"`, `aria-label="Drag to compare design and finished room"`, `aria-valuenow`, ←/→ move 5%, Home/End go to 0/100% |
| Touch | Drag handle only (no brush), with a 44px hit area |
| Several pairs | Thumbnails below switch rooms: a 200ms crossfade and the handle resets to 50% |
| Reduced motion | Static side by side with captions "3D design" / "Finished room". No brush, no heal |
| Content | Needs real render + photo pairs from SKE. Until then it shows a clearly marked dev placeholder (TODO-client) |

### 3. Process: sticky scroll

| | |
|---|---|
| Desktop (≥1024px, motion allowed) | The section **pins** for 3 × 100vh of scroll. Left: large step number (Bodoni, step 7) and title + text. Right: the step's line drawing. A thin progress line (1px stone track, 2px teak fill) runs along the bottom, `scaleX` 0 → 1 with scroll (`scrub: 0.3`) |
| Step change | At 25% / 50% / 75% progress, the outgoing step fades and moves −16px, the incoming step fades in from +16px, 0.4s. The line drawing draws itself in: `stroke-dashoffset` from length to 0, 0.8s |
| Snap | `snap: { snapTo: 1/3, duration: 0.3, ease: "power1.inOut" }`, so it never rests between steps |
| Mobile / tablet (<1024px) | No pinning. A plain vertical list: number, title, text and drawing per step, all visible |
| Reduced motion | The vertical list at every size. No pin, no scroll-jacking |

Everything else is still. There's no fade-up on sections and no hover animations on cards, only colour and underline changes on links and buttons (200ms). The testimonial marquee (prompt 07) and the number count-up are subtle and stop under reduced motion.

---

## 5. Review against the references: generic choices replaced

I went back over the plan and checked each choice against the references and CLAUDE.md. These are the generic, template-looking choices I found, and what they became:

| Generic choice | Why it's generic | Replaced with |
|---|---|---|
| Numbered service cards (`/01 Residential`), copied from Modora | CLAUDE.md forbids it, and "01 / 02 / 03" everywhere is the most common template tell | Unnumbered text cards. Numbers appear **only** in the process (1–4) and on timeline years |
| All-caps display headings, copied from Renova | Reads like every minimal template; CLAUDE.md requires sentence case | Bodoni Moda in sentence case. The high contrast does the work the capitals did |
| A centred hero headline | Default hero pattern | Modora's left/right staggered two-line H1, with the fact strip anchored to the bottom band |
| Stock-style tag chips on photos ("OFFICE SPACE") | Decorative UI chrome over photography | Plain captions **under** images. Photos stay clean |
| Prices under project cards | Modora is a shop template | Title + location (+ type). SKE sells homes, not decor items |
| "What we're known for: Design awards / Featured work" | Invented credentials | The same row layout filled with things clients actually say (clear pricing, finish, on-time handover), plus "What's included" |
| Text marquee ("Crafted interior spaces / Timeless design") | Motion for its own sake, and an italic word accent (banned) | Removed. Motion stays in the three moments |
| Brand-logo wall ("We use the best") | Borrowed trust; SKE's brands aren't confirmed | A materials-and-finishes list per project; brand names only once confirmed |
| Grey card fills and drop shadows | Generic UI depth | Plaster background, stone hairlines and square corners. Depth comes from overlapping photos (Modora intro) and the Renova timeline card |
| Generic line illustrations (vases, lamps) | Renova's are décor props | Process drawings of **SKE's actual steps**: a site conversation, a measuring tape along a wall, a 3D wireframe room, a finished room with a teak wardrobe and an oonjal swing. Drawn from SKE's own photos where possible |
| A mood of "European minimal" (bouclé chairs, grey stone) | That's the references' furniture, not SKE's | Coimbatore homes as the scrape shows them: teak and walnut slats, lit wood ceilings, brass swing chains, pooja units and quartz counters. Photo selection and alt text lead with these |
| "Get started" / "Book consultation" CTAs | Template wording | "Get a free quote" everywhere (CLAUDE.md), with Call and WhatsApp alongside. WhatsApp matters more than email in Coimbatore |
| Wordmark footer in sans | Renova's version | "SKE" in Bodoni across the full width. It becomes the brand's biggest moment, and the only place the logo shape isn't used |
| Hero relying on stock photography (the current site's slides) | The current site's biggest problem (`scrape/image-report.md`) | Real SKE work only. Interim image is named above and flagged; the photography brief is part of this plan |

## 6. Open decisions

- **Interim hero image: decided.** RJ chose the fallback: `20190131_190715_5c7214a7-65a8-4dc0-9547-690a4395b35d.jpg` (3BHK living room with staircase, 1280px). It will be soft at full width until SKE supplies new photography.
- **Logo.** Only black PNGs exist (best: `SKE-Interior.png`, 1972px). For the header I made two versions from it in `src/assets/brand/`: the mark and "SKE Interiors" **without the tagline** (unreadable at header size), in black and in plaster (for use over photos). These are stand-ins until SKE sends an SVG. The logo's heavy geometric lettering sits apart from Bodoni; that's fine for a logo, but worth a conversation if SKE ever refreshes the brand.
- **Error colour.** `#8C2F24` is outside the palette. The alternative is teak text plus an icon, but red is the convention people recognise.
