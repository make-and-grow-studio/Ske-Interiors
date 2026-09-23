# skeinteriors.com

Marketing site for SKE Interiors, Coimbatore. Built with Astro (static), Tailwind CSS, GSAP and Lenis. Read `CLAUDE.md` first.

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install everything (first time only) |
| `npx playwright install chromium` | Download the browser used for screenshots (first time only) |
| `npm run dev` | Local site at http://localhost:4321 |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve the built site |
| `npm run check` | Type-check |
| `npm run shots -- <url> [name]` | Full-page screenshots at 375, 768 and 1440px into `screenshots/` |

## Where things live

- `content/site-content.md`: all copy (source of truth)
- `TODO-client.md`: everything waiting on SKE
- `src/styles/tokens.css`: colours, type scale, spacing (change design tokens here only)
- `src/layouts`, `src/components`, `src/pages`, `src/data`: site code
- `scrape/`: images and data from the old WordPress site (see `scrape/image-report.md`)
- `references/`: visual reference screenshots
- `docs/prompt-pack.md`: the build prompts, in order
- `.env.example`: analytics and form keys to copy into `.env`
