# Content gaps: old site vs `content/site-content.md`

I compared every piece of text on the old skeinteriors.com with the new content file, looking for anything the old site has that the content file doesn't. Sources: the rendered text of all 15 pages (`scrape/pages/*.md`), the WordPress API (`scrape/api/pages.json`, `posts.json`) and the raw HTML, including hidden elements, slider captions, forms and the map. The content file has not been edited.

**Summary.** The old site has very little real content. The service pages (Residential, Commercial, Flooring) have no text at all, only image galleries, and most of the rest is keyword-stuffed filler. The content file already covers everything of substance, with five exceptions worth acting on:

1. **The three project descriptions** have real details (L-shaped kitchen, lofts, modular TV unit…) that the content file leaves as `[CONFIRM]`. See section 3.
2. **"SKE Interiors has its own manufacturing units"** is stated on the old 1BHK page. That's evidence for the `[CONFIRM in-house]` item on factory production. See section 2.
3. **Four testimonials were edited beyond typo fixes.** Sentences were cut and a phrase reworded, while the content file says "typos fixed only". See section 4.
4. **The Google Business Profile listing** can be identified from the old map embed. The map may still point at the old R.S. Puram address. See section 5.
5. **"Interior architects"** are mentioned as part of the team. See section 2.

Anything the content file already covers in reworded form isn't listed.

---

## 1. Home (`/`)

| Old site | In content file? | Notes |
|---|---|---|
| Hero slider captions: "Welcome To SKE **Residential Interiors**" / "**Commercial Interiors**", with "Right design and right ideas matter a lot of in interior design business. a style that makes a statement." and a "View more" button that links nowhere (`#`) | No | Generic and ungrammatical. Dropping it is fine. Listed only for completeness |
| "Since 2011 · 12+ years experience" | Yes (15+ years) | The old figure was written in 2023, so it's consistent with 2011 |
| About heading: "We Are Commited to Create Unique Equitable Future." | No | Filler. Fine to drop |
| "We are a team of highly-skilled and extremely prolific interior designers… can transform the client's vision into reality, even better than their imagination." | No | Marketing filler. Fine to drop |
| Numbers: 100 projects, 90 satisfied clients, 40 employees | Yes | Marked `[UPDATE]` |
| Services intro: "We are one of the best interior designers in Coimbatore, We provide best interior services." | No | Keyword stuffing. Fine to drop |
| Process intro: "We provide best interior Works for residential & Commercial." | No | Fine to drop |
| Process steps 01–04 | Yes (reworded) | Two details worth keeping in mind: step 1 says the meeting is "with the finest interior designers" (covered); step 4 says **"production work to begin at the factory"**, which supports the in-house production point in section 2 |
| Enquiry form (also on Contact and Get a Quote): First name*, Last name, **Email\***, Phone*, Service (Residential / Commercial / **Flooring Interiors**), Message, "Submit" | Partly | The new forms make email optional and add property type and locality, which is a deliberate improvement. Nothing needs carrying over |
| Hidden top bar: "Welcome to SKE Interiors · Email: skeinterior@gmail.com" | Yes (email conflict) | The Gmail address links to `tel:http://skeinterior@gmail.com`, which is broken |

## 2. About (`/about-us/`)

The whole page is one paragraph (the same text is repeated in the WordPress "Home" page body):

| Old site | In content file? | Notes |
|---|---|---|
| "We have a close-knit team of **interior designers and interior architects**…" | Partly | The content file (2.5) says "Designers, site supervisors and carpenters". **Ask SKE whether they have interior architects on the team.** If so, it's a credibility point worth adding |
| "…building residential interior spaces as well as commercial interior spaces which work both practically and aesthetically" | Yes | Covered by the services copy |
| "Our thoughtful and innovative interior design solutions are initiated by partnering closely with our clients… understanding the client's taste and likes" | Yes | Covered by the process ("starts with a conversation about how you live") |
| "**Dream Interior** decorators in Coimbatore can take every step towards excellence…" | No, correctly | "Dream Interior" is another company's name. This paragraph was probably copied from another firm's website. **Don't carry any of it over.** Worth telling SKE |
| 1BHK project page: "**SKE Interiors has its own manufacturing units**, crafts furniture with flexible features." | No | Supports `[CONFIRM in-house]` (content file 3.5, "Factory production"). If SKE confirms, "our own manufacturing unit" is a strong line for the About page, Residential 3.5 and the Process "Build" step |

## 3. Project pages

The content file leaves every project detail as `[CONFIRM]`. The old pages have descriptions that can seed the "What we did" sections once SKE confirms them:

| Project | Old site description (cleaned up) | Old "project info" |
|---|---|---|
| **3BHK Home Interior** | A 3BHK flat designed with appropriate furniture and furnishings. The living room is built around a **modular TV unit**. | Client "Vijay Kumar" · Residential · Coimbatore · 1,600 sq ft · budget ₹10,00,000 |
| **2BHK House Interior** | A 2BHK apartment in Coimbatore. An **L-shaped wooden kitchen** with cabinets and **baskets for plates, dishes and bottles**. Each bedroom has a **wardrobe with loft and an attached dresser**. | Client "Vijay Kumar" · Residential · Coimbatore · 1,600 sq ft · budget ₹10,00,000 |
| **1BHK House Interior** | A complete home interior: **kitchen, modular bedroom and living room**. Furniture made in SKE's own manufacturing unit. | Client "Vijay Kumar" · Residential · Coimbatore · 1,500 sq ft · budget ₹8,00,000 |

The "project info" is almost certainly placeholder data: the same client on all three, a 1BHK at 1,500 sq ft (larger than a typical 3BHK), and near-identical budgets. **Don't use any of it without SKE confirming.** The budgets could still be a useful starting point when asking SKE for estimator price ranges.

Every project page also carries the same block of text ("We has truly exceeded Our expectations… Your home is now a stunning and comfortable haven…"). It's a template review written in the wrong voice, not a real client quote. Correctly left out of the content file.

The 2BHK description (L-shaped wooden kitchen, grey and wood units) matches the 2BHK kitchen renders (`IMG_3871`, `IMG_3872`), which supports assigning those renders to that project. See `scrape/image-report.md`.

## 4. Testimonials: edits beyond typo fixes

The content file says "Use client wording as given (typos fixed only)". These changes go further. Either restore the wording or get each client's OK for the edited version:

- **Rajesh Kumar**: closing sentence "Extremely satisfied." removed. Also "had a plan of doing interior design for" became "planned the interior for", and "our house space" became "our house".
- **Vijayakumar**: "I am very much impressed by the work of Team SKE Interiors." removed; "Best part of them is that…" became "Best part is that…"; trailing "Interior Designers in Coimbatore." removed. Removing that last one is right: it was keyword stuffing, not the client's words. Location is spelled "Tirupur" on the old site and "Tiruppur" in the content file. Tiruppur is the official spelling, so keep it.
- **Jacline**: opening "Thank you SKE Interiors!" removed; "my friends and relatives are honored the interior work" became "appreciated the interior work", which is a meaning edit, not a typo fix; "finishing work is satisfied with 100 percent" became "I'm 100 percent satisfied with the finishing".
- **Jayakumar**: typo-level only (ellipsis, capital I). Fine.

Suggestion: keep the light grammar fixes (they read better and keep the meaning), but restore "Extremely satisfied.", "I am very much impressed by the work of Team SKE Interiors." and "Thank you SKE Interiors!". They're genuine client voice, and warmth sells.

## 5. Contact details found in the HTML

| Old site | In content file? | Notes |
|---|---|---|
| `info@skeinteriors.in`: header, contact page, footer | Yes (email conflict) | The only email shown to visitors |
| `skeinterior@gmail.com`: hidden top bar, broken link | Yes (email conflict) | |
| `info@skeinteriors.com` | Listed in the content file | **Not found anywhere on the current site.** It may come from IndiaMART or another listing. Worth checking before choosing the one email |
| Old address (56-H, Subramaniam Road East, R.S. Puram) and landline 0422 457 4830 | Listed in the content file as appearing on the Commercial page | **Not on the current site.** Every page, Commercial included, now shows the Kottaipalayam address. The conflict remains on IndiaMART (per the content file) and possibly on Google Maps (next row) |
| **Google Maps embed** (Home and Contact pages) links to the place named **"SKE Interiors"** (place ID `0x3ba8597b6dd51793:0xe4d6a16ee311ed75`). That gives the listing link **https://maps.google.com/?cid=16489544583291727221** | No | This is very likely SKE's **Google Business Profile**, which the content file has as `[CONFIRM: GBP URL]`. Confirm with SKE that it's theirs. **The map is centred at 11.0060, 76.9540**, which appears to be central Coimbatore (the R.S. Puram area), not Kottaipalayam / S.S. Kulam in the north. If so, the Google listing may still show the **old address**, which matters for local SEO. Check the pin on the listing and update it to match the website |
| Phone numbers: 98945 88673, 99405 88673, 0422 421 8673 | Yes | Match |
| Facebook `facebook.com/skeinteriors/`, Instagram `instagram.com/ske_interiors/` | Yes | Match. No WhatsApp link on the old site; the new site adds one |
| Footer: "Designed & Developed by Widelast Technology Pvt Ltd.", "Copyright © 2023" | n/a | Useful as a contact for recovering the missing photos (see `scrape/image-report.md`) |

## 6. Pages with nothing to carry over

- **Residential interiors, Commercial interiors, Flooring**: no text at all, only image galleries, most of which are now broken. The content file's copy for these pages is all new, so every factual claim in it (services list, flooring types, spaces) depends on the `[CONFIRM]` items in `TODO-client.md`.
- **`/residential/`, `/commercial/`, `/industries/`**: one-line stub posts ("Our power of choice is and when nothing prevents work every pleasure Flooring."). Redirect them; no content to keep.
- **`/sample-page/`**: the WordPress default page. Redirect to Home.
- **`/our-works/`**: three project cards (covered).
- **Titles and meta descriptions**: the old site has no meta descriptions and generic titles ("About Us – SKE Interiors"). Nothing to keep; the content file's titles and descriptions are all new.

## 7. For balance: content file claims the old site doesn't support

Not a gap in the content file, but worth knowing, because CLAUDE.md says not to invent business facts. These appear in the new copy and have no source on the old site. Most are already marked `[CONFIRM]`; the unmarked ones are listed here so they get confirmed too:

- "Handover **on the date we agreed**" and "ready on time" as a promise. The old site supports this only through testimonials; there's no stated guarantee.
- "We'll call you back **within one working day**" (marked `[CONFIRM]`).
- Serving **Tiruppur and Pollachi**. The only evidence is the testimonial locations, which is reasonable, and it's marked `[CONFIRM]`.
- **"Offices, shops and hospitality spaces"** on the Home services card (1.3). The old site shows only stock commercial photos, and its commercial gallery is gone, so there's no evidence of real hospitality or retail work yet. The card isn't marked `[CONFIRM]`, but the matching list on the Commercial page (4.3) is.
- **"Built and fitted by our own carpenters"** (hero sub-line). Supported by testimonials ("efficient carpenter team") and the manufacturing-unit line. Fine.
- **"Supplied and installed by our team"** (flooring). No source; covered by the flooring `[CONFIRM]`.
