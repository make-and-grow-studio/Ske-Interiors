# SKE Interiors — Website Content (v1 draft)

Page-by-page copy for the skeinteriors.com rebuild. Drop this file into the repo at `/content/site-content.md`; the Claude Code prompts read from it.

**How to read this file**
- `[CONFIRM: …]` = fact I could not verify. Ask SKE before launch. Never publish a bracket.
- `[IMG: …]` = image slot. Filenames are from the current site's `/wp-content/uploads/2023/04/`. Final mapping happens after the scrape (Prompt 01), when Claude Code has viewed every image.
- Slugs keep the existing URLs wherever possible so current Google rankings carry over.
- Substance is the same as the current site (services, process, projects, testimonials, stats). The wording is rewritten: the old copy had placeholder text, typos and keyword stuffing.

---

## 0. Global

### Business details (NAP) — must be identical everywhere
| Field | Value |
|---|---|
| Name | SKE Interiors |
| Address | No. 1, S.F. No. 151/2B, Sendadu Road, Kottaipalayam, S.S. Kulam, Coimbatore – 641110, Tamil Nadu |
| Mobile | +91 98945 88673, +91 99405 88673 |
| Landline | 0422 421 8673 |
| Email | [CONFIRM: one email only — site shows info@skeinteriors.in, info@skeinteriors.com and skeinterior@gmail.com] |
| Instagram | https://www.instagram.com/ske_interiors/ |
| Facebook | https://www.facebook.com/skeinteriors/ |
| Hours | [CONFIRM] |
| Founded | [CONFIRM: site says 2011, IndiaMART profile says 2013] |
| Google Business Profile | [CONFIRM: GBP URL + current rating and review count] |

**Address conflict to resolve:** the Commercial Interiors page and the IndiaMART profile still show the old address (56-H, Subramaniam Road East, R.S. Puram, Coimbatore – 641002, landline 0422 457 4830). The homepage shows Kottaipalayam. Google treats mismatched addresses as a trust problem. Confirm which is current and update IndiaMART, Justdial and GBP to match.

### Navigation
Home · About · Services (Residential Interiors, Commercial Interiors, Flooring) · Our Work · Contact
Primary button (always visible): **Get a free quote**
Secondary (mobile bottom bar): **Call** · **WhatsApp** · **Get a quote**

### WhatsApp prefilled message
"Hi SKE Interiors, I'd like a quote for my [home/office] interior in [area]."

### Footer
**Line:** Home and commercial interiors in Coimbatore, designed in 3D and built by our own team.
**Columns:** Services (Residential, Commercial, Flooring) · Studio (About, Our Work, Contact, Get a quote) · Visit (address, map link) · Talk (phones, email, WhatsApp)
**Areas we serve:** Coimbatore, Tiruppur, Pollachi [CONFIRM more areas]
**Bottom:** © 2026 SKE Interiors. All rights reserved. · Privacy
**Wordmark:** giant "SKE" / "SKE INTERIORS" set across the full width (Renova footer reference)

---

## 1. Home — `/`

**Title (≤60):** Interior Designers in Coimbatore | SKE Interiors
**Meta description (≤155):** Home and commercial interiors in Coimbatore since 2011. See your space in 3D before we build, with on-time handover. Get a free quote today.
**Schema:** HomeAndConstructionBusiness (NAP, geo, hours, sameAs social, aggregateRating from GBP), WebSite, FAQPage

### 1.1 Hero
H1 is one element with two visual lines:
- Small line: **Interior designers in Coimbatore**
- Display line (staggered, Modora style): **Spaces crafted / for the way you live**

Sub: Homes, offices and shops across Coimbatore, Tiruppur and Pollachi. Designed in 3D first, then built and fitted by our own carpenters.

Buttons: **Get a free quote** · **See our work**
Bottom strip: Since 2011 | 100+ projects completed | Handover in about 30 days after design approval [CONFIRM]
[IMG: slider3.jpg, slider2.jpg, slider5.jpg, slider6.jpg — pick the strongest wide living-room shot for the hero; slow crossfade or a single still. Optional: a 6–8s ambient video if SKE has site footage]

### 1.2 Studio intro
**Heading:** Fifteen years of homes, finished the way they were promised.
[CONFIRM: "fifteen" assumes founding in 2011]

**Body:** SKE Interiors is a Coimbatore interior design and execution studio. We plan, design and build residential and commercial interiors, and we handle flooring too. Every project starts with a conversation about how you live or work, becomes a 3D design you can see and change, and ends with a space handed over on the date we agreed.

Clients tell us the same three things after handover: the pricing was clear, the finish was right, and it was ready on time. That's the standard we hold every project to.

Link: **More about us**

**Numbers** (animate once on view):
- 15+ years [CONFIRM]
- 100+ projects completed [UPDATE: site figure is from 2023]
- 90+ happy clients [UPDATE]
- 40 people on the team [UPDATE]

[IMG: residencial1_8.jpg + residencial_36.jpg — tall + small pair, like Modora "Our expertise" block]

### 1.3 Services
**Heading:** What we design and build

**Residential interiors**
Complete home interiors for apartments, independent houses and villas. Kitchens, wardrobes, living rooms and bedrooms, planned around your family and your budget.
Link: Explore residential

**Commercial interiors**
Offices, shops and hospitality spaces that work hard and look the part. Layouts planned for how your team and customers actually move.
Link: Explore commercial

**Flooring solutions**
The right floor for every room, from hard-wearing finishes for busy spaces to warmer surfaces for bedrooms. Supplied and installed by our team.
Link: Explore flooring

[IMG: one image per service card — assign after scrape]

### 1.4 Signature: design vs reality (before/after reveal)
**Heading:** The 3D design you approve is the home you get.
**Body:** Before a single panel is cut, you see your space in 3D and change what you want. Drag across to compare the approved design with the finished room.
Control label: Drag to compare
[IMG: pairs of 3D render + final photo of the same room. REQUEST FROM SKE. Fallback: bare site photo + finished photo]

### 1.5 Process
**Heading:** How your project moves, from first call to handover

**1. Plan**
We meet, at our studio or your site, and talk through how you use the space, what you love, and what isn't working. You leave with a clear brief.

**2. Estimate**
We measure your space and prepare a detailed estimate based on your size, needs and budget. No surprises later.

**3. Design**
Our designers build your space in 3D from that brief. You review it, ask for changes, and approve the final design.

**4. Build**
Materials are procured and furniture goes into production. Our carpenters install everything on site, with handover in about 30 days from production start. [CONFIRM timeline]

Link: Get a free quote

### 1.6 Recent work
**Heading:** Recent homes
Cards (horizontal carousel, Modora style):
- **3BHK Home Interior** — Coimbatore → `/3bhk-home-interior/` [IMG: 20190131_190717_153528da-cd8d-431c-849f-7317bd5e206a.jpg]
- **2BHK House Interior** — Coimbatore → `/2bhk-house-interior/` [IMG: FB_IMG_1671554675670.jpg]
- **1BHK House Interior** — Coimbatore → `/1bhk-house-interior/` [IMG: FB_IMG_1669397475101.jpg]
Link: See all work
[CONFIRM: 3 projects is thin for a 15-year studio — ask SKE for 6–10 more with photos]

### 1.7 Testimonials
**Heading:** What our clients say
Rating line: [CONFIRM: ★ 4.x from NN Google reviews] · Read reviews on Google

Use client wording as given (typos fixed only):

> "Best interior in my opinion. Great in terms of pricing, transparency and open to modifications anytime. Can go blindfolded for interior works. Very economical and efficient carpenter team with loads of experience. Special thanks to SKE Interiors team and carpenters. Keep up the good work!"
> — **Jayakumar**, Coimbatore

> "SKE Interiors have amazing ideas and their execution is marvelous. Aesthetically everything was just like they narrated and I dreamt about my home. I had researched a couple of weeks before hiring them and I am happy that I have taken the right decision. Best part is that they completed my house in the given time. Highly recommended!"
> — **Vijayakumar**, Tiruppur

> "The interior work was well designed and I'm 100 percent satisfied with the finishing. Especially your carpenters were well experienced. My friends and relatives appreciated the interior work done by you. Another good mark is my flat was handed over on time."
> — **Jacline**, Pollachi

> "When we planned the interior for our new house, we approached SKE Interiors. They were very professional and transparent in explaining various designs, and gave us ideas based on the design of our house. We were extremely satisfied with their work and the timelines given were adhered to."
> — **Rajesh Kumar**, Coimbatore

Note: current avatars (profile1–4.png) look like stock images. Use initials, or real client photos with permission.

### 1.8 Budget estimator (lead magnet)
**Heading:** Get a rough budget in 30 seconds
**Body:** Pick your home and what you want done. We'll show an indicative range, then refine it with a free site visit.
Inputs: Property (1BHK / 2BHK / 3BHK / Villa / Office) · Scope (Kitchen only / Kitchen + wardrobes / Full home) · Finish (Essential / Premium / Luxury)
Output: Indicative range ₹X – ₹Y [CONFIRM pricing table with SKE — do not publish without approval]
Small print: This is an estimate for planning only. Your final quote comes after measurement and design.
Gate: to see the range, ask for Name + Phone (WhatsApp) → lead captured.
Button: **Show my estimate**

### 1.9 FAQ (also FAQPage schema)
**Heading:** Questions we get asked

**How much does interior design cost in Coimbatore?**
It depends on the size of your home, the rooms you want done and the materials you choose. Use the estimator above for an indicative range, or book a free visit and we'll give you a detailed estimate. [CONFIRM: add a real starting range if SKE agrees]

**How long does a full home interior take?**
Once you approve the 3D design, production and installation take about 30 days for most homes. We confirm the exact timeline in your estimate. [CONFIRM]

**Will I see the design before work starts?**
Yes. We create a 3D design of your space and revise it with you until you approve it. Nothing goes into production before that.

**Do you handle everything, or just design?**
Both. We design, supply materials, manufacture and install, so you deal with one team from start to finish.

**Which areas do you work in?**
Coimbatore and nearby towns including Tiruppur and Pollachi. [CONFIRM full list]

**Is the quote free?**
Yes. The first consultation and quote are free. [CONFIRM site visit is free]

**Do you offer a warranty?**
[CONFIRM warranty terms — high-trust answer if SKE offers one]

### 1.10 Closing call to action
**Heading:** Let's plan your space.
**Body:** Tell us about your home or office. We'll call you back within one working day. [CONFIRM response time]
Buttons: **Get a free quote** · **WhatsApp us**
Beside it: address, phones, embedded map (lazy-loaded)
[IMG: residencial_20.jpg or strongest dark/moody shot as full-bleed background, like Renova's closing section]

---

## 2. About — `/about-us/`

**Title:** About SKE Interiors | Interior Design Studio, Coimbatore
**Meta:** Since 2011, SKE Interiors has designed and built homes and workplaces across Coimbatore. Meet the studio, our process and the people behind it.
**Schema:** AboutPage + Organization

### 2.1 Hero
**H1:** A Coimbatore interior studio that designs and builds.
**Sub:** Since 2011, we've turned bare walls into homes, offices and shops across Coimbatore, Tiruppur and Pollachi.
[IMG: widest studio or project shot]

### 2.2 Our story
**Heading:** Where we started
**Body:** SKE Interiors began in Coimbatore in 2011 with a simple idea: interiors should look exactly as designed and be ready when promised. Fifteen years and more than a hundred projects later, that's still how we work. [CONFIRM founding story, founder name(s), and anything SKE wants to say about how it started]

### 2.3 Timeline (Renova style, horizontal)
- **2011** — SKE Interiors founded in Coimbatore [CONFIRM]
- **20XX** — First full-home project [CONFIRM]
- **20XX** — Commercial interiors added [CONFIRM]
- **20XX** — Moved to Kottaipalayam studio [CONFIRM]
- **2026** — 100+ projects completed [UPDATE]

### 2.4 What we stand for
Three values, taken from what clients actually say about SKE:

**Clear pricing** — A detailed estimate before work begins, and open conversations when you want to change something.
**Finish you can feel** — Experienced carpenters and careful detailing, so the finished space matches the design.
**On-time handover** — We agree a date, and we plan production around keeping it.

### 2.5 The team
**Heading:** The people behind SKE
**Body:** Designers, site supervisors and carpenters, [CONFIRM: ~40] people who've worked on homes like yours.
Cards: Name, role, photo [REQUEST FROM SKE: 3–6 team photos. If none, skip this section rather than use stock photos.]

### 2.6 Numbers
Same four numbers as Home 1.2.

### 2.7 Call to action
**Heading:** Ready to start?
Buttons: **Get a free quote** · **See our work**

---

## 3. Residential Interiors — `/residential-interiors/`

**Title:** Home Interior Designers in Coimbatore | SKE Interiors
**Meta:** Complete home interiors in Coimbatore for 1, 2 and 3BHK apartments and villas. 3D design, in-house production and on-time handover. Free quote.
**Schema:** Service (serviceType: Residential interior design, areaServed) + FAQPage + BreadcrumbList

### 3.1 Hero
**H1:** Home interiors in Coimbatore, designed around your family.
**Sub:** From a single modular kitchen to a complete 3BHK, we design, build and install everything.
Buttons: **Get a free quote** · **See home projects**

### 3.2 Intro
**Body:** A good home interior makes daily life easier: storage where you need it, rooms that feel calm, and finishes that last. We start with how your family lives, then design every room in 3D so you can see it before we build it.

### 3.3 What we design
[CONFIRM list with SKE — these are standard for Coimbatore homes and several appear on SKE's IndiaMART profile]
- **Modular kitchens** — layouts, cabinets and countertops planned around how you cook.
- **Wardrobes** — sliding or hinged, with internal storage planned for your things.
- **Living rooms** — TV units, wall panelling and seating layouts.
- **Bedrooms** — beds, headboards, dressers and study corners.
- **Pooja units** [CONFIRM]
- **False ceilings and lighting** — ceilings that define the room and hide the wiring.
- **Dining and crockery units**
- **Kids' rooms** [CONFIRM]

### 3.4 Homes we work on
1BHK · 2BHK · 3BHK apartments · Independent houses · Villas
Each links to the matching project page where one exists.

### 3.5 What's included
- Site visit and measurement
- 3D design with revisions until you approve
- Materials and hardware [CONFIRM brands SKE uses — e.g. plywood, laminates, fittings]
- Factory production [CONFIRM in-house]
- Installation by our carpenters
- Final cleaning and handover

### 3.6 Process (short version of Home 1.5, links to it)

### 3.7 Projects strip — the 3 residential projects

### 3.8 FAQs (residential)
**How much does a 2BHK interior cost in Coimbatore?** [CONFIRM range]
**Can I do only the kitchen and wardrobes first?** Yes. Many clients start with the kitchen and wardrobes and add the rest later. We design the whole home in 3D so everything matches when you do.
**Do I need to be on site during installation?** No. Our site supervisor manages the work and keeps you updated. [CONFIRM]

### 3.9 Call to action
**Heading:** Planning your new home?
Buttons: **Get a free quote** · **WhatsApp us**

---

## 4. Commercial Interiors — `/commercial-interiors/`

**Title:** Commercial & Office Interior Designers in Coimbatore | SKE
**Meta:** Office, retail and hospitality interiors in Coimbatore, designed and built by one team. Turnkey delivery, clear pricing and on-time handover.
**Schema:** Service + FAQPage + BreadcrumbList

### 4.1 Hero
**H1:** Commercial interiors that work as hard as you do.
**Sub:** Offices, shops and hospitality spaces in Coimbatore, delivered turnkey by one team.

### 4.2 Intro
**Body:** A commercial space has to impress customers, help your team work, and open on schedule. We plan the layout around how people move through it, design it in 3D, then build and fit it out, so you manage one team, not five contractors.

### 4.3 Spaces we design
[CONFIRM — listed on SKE's IndiaMART profile; keep only what SKE wants to be known for]
- **Offices** — workstations, cabins, meeting rooms and reception, delivered turnkey.
- **Retail stores and showrooms** — displays and layouts that guide customers.
- **Hospitality** — restaurants, cafés, hotel lounges.
- **Clinics** [CONFIRM]
- **Play schools** [CONFIRM]

### 4.4 Why businesses choose SKE
- One team from layout to handover
- Work planned around your opening date
- Durable materials for high-traffic spaces
- Clear estimate before work begins

### 4.5 Projects — [REQUEST FROM SKE: at least 2 commercial projects. If none, show a "Commercial work coming soon" note and hide the strip, not an empty grid.]

### 4.6 FAQ
**Can you work while our business stays open?** [CONFIRM: phased / night work]
**Do you handle electrical and false ceiling work?** [CONFIRM]

### 4.7 Call to action
**Heading:** Opening or upgrading a space?
Buttons: **Get a free quote** · **Call us**

---

## 5. Flooring Solutions — `/flooring/`
(301 redirect `/flooring-interiors/` → `/flooring/`)

**Title:** Flooring Solutions in Coimbatore | SKE Interiors
**Meta:** Flooring for homes, offices and shops in Coimbatore, supplied and installed by SKE Interiors. Get help choosing the right floor for every room.
**Schema:** Service + BreadcrumbList

### 5.1 Hero
**H1:** The right floor for every room.
**Sub:** We help you choose, supply and install flooring for homes and commercial spaces across Coimbatore.

### 5.2 Intro
**Body:** Flooring sets the feel of a room and takes more wear than anything else in it. We'll recommend a floor based on how the room is used, your budget and how much upkeep you want, then install it with the rest of your interior.

### 5.3 Flooring we install
[CONFIRM with SKE — the old page had no real content, so this list needs SKE's input]
- Wooden flooring
- Laminate flooring
- Vinyl / SPC flooring
- [others]

For each: one line on where it works best, e.g. "Laminate: a warm wood look that handles daily family life, at a lower cost than solid wood."

### 5.4 How to choose (short comparison table: look, durability, water resistance, upkeep, relative cost) [CONFIRM content]

### 5.5 Call to action
**Heading:** Not sure which floor suits your space?
Button: **Talk to us**

---

## 6. Our Work — `/our-works/`

**Title:** Our Work | Interior Projects in Coimbatore | SKE Interiors
**Meta:** Browse completed home and commercial interior projects by SKE Interiors across Coimbatore, Tiruppur and Pollachi.
**Schema:** CollectionPage + BreadcrumbList

**H1:** Our work
**Sub:** Homes and spaces we've designed and built across Coimbatore.
**Filters:** All · Homes · Commercial · Flooring (show only filters that have projects)
**Grid:** masonry or Modora-style mixed grid. Card: image, title, location, type.
**End block:** Want your space here next? → **Get a free quote**

---

## 7. Project detail — template
Slugs kept: `/3bhk-home-interior/`, `/2bhk-house-interior/`, `/1bhk-house-interior/`

**Title pattern:** [Project name] in [Area], Coimbatore | SKE Interiors
**Meta pattern:** See how SKE Interiors designed and built a [type] in [area]: [2–3 highlights]. Designed in 3D, handed over in [X] days.
**Schema:** CreativeWork/Article + ImageObject + BreadcrumbList

Structure (Next Concept detail-page reference):
1. **H1** project name + location
2. Fact strip: Type · Area (sq ft) · Rooms done · Timeline · Year [CONFIRM all]
3. Hero image, full width
4. **The brief** — 2–3 sentences on what the client wanted [CONFIRM]
5. **What we did** — rooms and key elements [CONFIRM]
6. **Materials and finishes** [CONFIRM]
7. Design vs reality slider (render ↔ photo), if renders exist
8. Gallery (lightbox)
9. Client quote, if one exists for this project
10. Next project link + **Get a quote for a home like this**

### 7.1 3BHK Home Interior — Coimbatore
Name: 3BHK Home Interior, Coimbatore. [CONFIRM area, locality, scope, year, timeline]
[IMG: 20190131_190717_…jpg + all images found on that page during scrape]

### 7.2 2BHK House Interior — Coimbatore
[CONFIRM details] [IMG: FB_IMG_1671554675670.jpg + page gallery]

### 7.3 1BHK House Interior — Coimbatore
[CONFIRM details] [IMG: FB_IMG_1669397475101.jpg + page gallery]

Alt text pattern for every image: "[Room] of a [type] in [area], Coimbatore, designed by SKE Interiors" (e.g. "Modular kitchen with white cabinets in a 3BHK in Saravanampatti, Coimbatore").

---

## 8. Contact — `/contact-us/`

**Title:** Contact SKE Interiors | Interior Designers, Coimbatore
**Meta:** Visit our Coimbatore studio, call +91 98945 88673 or send your requirements online. Free consultation and quote.
**Schema:** ContactPage + LocalBusiness

**H1:** Let's talk about your space.
**Sub:** Call, WhatsApp, or send your details and we'll get back within one working day. [CONFIRM]
Blocks: Visit (address + directions link) · Call (3 numbers) · Email · WhatsApp · Hours
Form: Name* · Phone (WhatsApp)* · Email · Property type · Area/locality · Message · **Send enquiry**
Map embed (lazy).

Form messages:
- Success → redirect to `/thank-you/`
- Error: "Your enquiry didn't send. Check your phone number and try again, or WhatsApp us on +91 98945 88673."

---

## 9. Get a Quote — `/get-a-quote/` (new; fixes the broken "Get a Free Quote" link)

**Title:** Get a Free Interior Design Quote | SKE Interiors Coimbatore
**Meta:** Tell us about your home or office in under a minute. SKE Interiors will call you with a free consultation and estimate.

**H1:** Get a free quote
**Sub:** Four quick questions. We'll call you within one working day.

Step 1 — What's the space? Home / Office / Shop / Other
Step 2 — Size: 1BHK / 2BHK / 3BHK / Villa / sq ft (commercial)
Step 3 — What do you need? (multi) Kitchen · Wardrobes · Living · Bedrooms · False ceiling · Flooring · Full interior
Step 4 — When? Within 1 month / 1–3 months / Just exploring
Step 5 — Your details: Name* · Phone (WhatsApp)* · Locality
Button: **Get my free quote**
Trust line under button: No spam. We only use your number to discuss your project.

---

## 10. Thank you — `/thank-you/` (noindex)
**H1:** Thanks, we've got your details.
**Body:** Our team will call you within one working day. Want to speed things up? Send us photos or a floor plan on WhatsApp.
Buttons: **Send on WhatsApp** · **See our work**
(Fire GA4 `generate_lead` + Meta Pixel `Lead` on this page.)

---

## 11. 404
**H1:** This page has moved.
**Body:** We rebuilt our website, so some old links changed. Try one of these:
Links: Home · Our work · Get a free quote

---

## 12. Phase 2 SEO pages (after launch)
- `/interior-designers-tiruppur/` and `/interior-designers-pollachi/` — only with real local projects/reviews per town, not copy-paste pages.
- `/modular-kitchen-coimbatore/` — biggest search demand; split out from Residential once there are kitchen photos.
- Guides: "2BHK interior cost in Coimbatore (2026)", "Laminate vs wooden flooring for Coimbatore homes", "How long does a home interior take?"

---

## 13. Image inventory (from homepage; full inventory comes from the scrape)
| File | Current use | Planned slot |
|---|---|---|
| slider3.jpg, slider2.jpg, slider5.jpg, slider6.jpg | Hero slider | Home hero, About hero |
| residencial1_8.jpg, residencial1_2.jpg | Gallery | Intro pair, Residential hero |
| residencial_36.jpg, residencial_35.jpg, residencial_20.jpg | Gallery | Services cards, closing CTA background |
| 20190131_190717_153528da-….jpg | 3BHK cover | 3BHK project |
| FB_IMG_1671554675670.jpg | 2BHK cover | 2BHK project (check resolution — Facebook copies are compressed) |
| FB_IMG_1669397475101.jpg | 1BHK cover | 1BHK project (same) |
| Ske-1.png | Logo | Header/footer — request SVG from SKE |
| cropped-fav.png | Favicon | Regenerate from SVG |
| profile1–4.png | Review avatars | Don't use (likely stock) |

---

## 14. Questions for SKE before launch
1. Current address, one email, landline, hours
2. Founding year (2011 or 2013) and short founder story
3. Updated project, client and team numbers
4. Google Business Profile link, rating and review count
5. Full service list (residential rooms, commercial sectors, flooring types)
6. Material and hardware brands used (for a brand strip — only real ones)
7. Warranty terms
8. Pricing ranges for the estimator (and approval to show them)
9. 6–10 more projects with photos, locality, area, scope, year
10. 3D render + final photo pairs (for the design-vs-reality slider)
11. Team photos
12. Logo in SVG
13. Areas served
14. Lead routing: who receives enquiries (email, WhatsApp number, Google Sheet?)
