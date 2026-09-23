# SKE Interiors: image report

Scrape of https://skeinteriors.com on 23 September 2026. Visual review: open `scrape/contact-sheet.html`. Full data per image: `scrape/manifest.json`.

## In short

- **229 image files** are referenced by the site or its WordPress media library.
- **78 downloaded** (after removing 4 byte-identical copies). Every one is the original upload; none are resized copies.
- **147 no longer exist on the server.** WordPress still lists them, but the files are gone, so the live site shows empty grey boxes in their place. This includes the whole Flooring gallery, the whole Commercial gallery and about 90 of the Residential gallery images.
- Of the 78 downloaded, **only 40 show SKE's own work** (3 real photos and 37 3D renders across the three projects and the residential gallery). The rest are logos (8), theme backgrounds (3), and stock or theme-demo pictures (27, among them the four home hero slides and the four testimonial faces).
- **Nothing is truly hero-ready.** The largest SKE images are 2048px wide and carry another studio's watermark. The real photos are Facebook copies at 1080px. For a full-width 1440px+ hero we need the original files or new photography.

## Two problems to raise with SKE first

1. **The site is hacked.** All three sitemaps (`/wp-sitemap.xml`, `/sitemap.xml`, `/sitemap_index.xml`) list about 1,108 fake `/products/<id>` URLs that change on every request. Google's crawler gets Japanese spam pages (car parts) at those URLs, while people get a 404. This is a cloaked "Japanese keyword hack". It damages SKE's Google rankings now. Moving to the new site fixes it, but the old site should be cleaned or taken down, and Search Console checked for spam pages and a manual action. Sample URLs: `scrape/api/sitemap-spam-sample.txt`.
2. **Most of their photos are gone from the server** (see above). SKE or their previous developer (the footer credits Widelast Technology Pvt Ltd) may still have the originals, or a hosting backup.

## Hero candidates (best 10, with caveats)

None pass as hero-ready. These are the strongest options, ranked:

| # | File | What it shows | Size | Caveat |
|---|---|---|---|---|
| 1 | `shared/FB_IMG_1671554675670.jpg` | **Real photo**: living room with brass-chain oonjal swing, lit wood-slat ceiling | 1080×1350 portrait | Facebook-compressed. Best real photo on the site. Works for a split or portrait hero; ask for the camera original |
| 2 | `shared/FB_IMG_1671554686721.jpg` | **Real photo**: lit wood-slat ceiling corridor, open stair | 1080×1350 portrait | Facebook-compressed |
| 3 | `shared/FB_IMG_1671554681269.jpg` | **Real photo**: quartz kitchen counter, walnut slats | 1080×1349 portrait | Facebook-compressed |
| 4 | `shared/20220212_183809_IMG_3976.jpg` | Render: living room, olive sofa, slatted planter partition | 2048×1152 | Faint third-party watermark ("monnfie"). Confirm SKE owns it |
| 5 | `shared/20220212_183806_IMG_3975.jpg` | Render: living room, L-sofa, metal lattice partition | 2048×1152 | Same watermark. Confirm ownership |
| 6 | `shared/FB_IMG_1669397490899.jpg` | Render: bedroom, walnut headboard wall | 1080×1219 portrait | — |
| 7 | `shared/FB_IMG_1669397475101.jpg` | Render: bedroom seating corner, bookshelf | 1080×1215 portrait | — |
| 8 | `shared/20190131_190717_153528da-cd8d-431c-849f-7317bd5e206a.jpg` | Render: family lounge, glass balustrade | 1280×870 | Dated 2019 render style |
| 9 | `shared/20190131_190715_5c7214a7-65a8-4dc0-9547-690a4395b35d.jpg` | Render: living room with staircase | 1280×868 | Dated render style |
| 10 | `shared/FB_IMG_1669397482531.jpg` | Render: walnut wardrobe | 1080×1218 portrait | — |

**Don't use** `slider2/3/5/6.jpg` (the current home hero slides). They are stock photos, not SKE's work, although the content file lists them for the hero.

## Images by project

Folders: images used on one page are in `scrape/images/<page>/`; images used on several pages are in `scrape/images/shared/`; library images not used on any page are in `scrape/images/media-library/`.

### 3BHK Home Interior (`/3bhk-home-interior/`): 12 images, all 3D renders, 1280px, good
- Living rooms: `20190131_190715_5c7214a7…`, `190716_6c612b6a…`, `190716_8eecb74a…`, `190717_153528da…` (cover), `190717_4c9f42c4…`
- Bedrooms: `190713_ddcd44fa…`, `190713_e5677a83…`, `190716_51d626d3…`, `190716_f87a3dc2…`, `190717_8322be1c…`, `190718_61abca03…`, `190719_60a5f79f…`
- `190716_6c612b6a…` and `190717_4c9f42c4…` are near-identical (the same render with a tiny change). Use one.

### 2BHK House Interior (`/2bhk-house-interior/`): 12 images
- Real photos (3): `FB_IMG_1671554675670` (cover, living + swing), `FB_IMG_1671554681269` (kitchen), `FB_IMG_1671554686721` (ceiling / stair). Their style doesn't match the 2BHK renders, so they may be a different home. Confirm with SKE.
- Renders, 2048px (2): `20220212_183806_IMG_3975`, `20220212_183809_IMG_3976` (living rooms, watermarked)
- Renders, low-res 690–960px (7): kitchen `IMG_3871`, `IMG_3872`; bedrooms `IMG_3873`–`IMG_3876`; foyer console `20220211_171055_IMG_3952`

### 1BHK House Interior (`/1bhk-house-interior/`): 12 images, all 3D renders
- Bedroom, wardrobe, bath vanity (4, 1080px portrait, good): `FB_IMG_1669397475101` (cover), `…482531`, `…487697`, `…490899`
- Kitchen and dining (8, 1080×608, heavily compressed): `FB_IMG_1668356007269` to `…030086`. These have European styling (wood stove, island kitchen). Confirm they are SKE designs.

### Residential gallery, no project (4 renders)
- `20181002_095954_IMG_8260.jpg`: living room (790×600)
- `20190131_190709_5ce9bae3…`: home study / office (1247×843)
- `20191204_195552_IMG_1414.jpg`: bedroom (960×720)
- `20220209_230625_IMG_3870.jpg`: pooja room (960×720). This is the only pooja image.

### Commercial and flooring: nothing usable
All 13 commercial gallery images and all 8 flooring gallery images are missing from the server. The only commercial-looking images left are stock photos. **We have no real commercial or flooring work to show.**

### Brand (8 files)
Logo PNGs only. Best: `media-library/SKE-Interior.png` (black, 1972px) and `media-library/cropped-SKE-Interior.png` (light, for dark backgrounds). Ask for an SVG.

### Stock and theme images (30 files, don't use)
The four home hero slides, `slider1`/`slider4`, `service1–3`, `about-img`, nine stock commercial photos (salon, clinic, lobby, restaurant, classroom, library…), four Unsplash photos, four stock testimonial faces (`profile1–4`) and three theme backgrounds. They are kept for the record and marked `stock: true` in the manifest.

## Low-res images to request again from SKE

Ask for the original camera or render exports (ideally 2400px+ on the long side) of:

- **All 3 real photos**: `FB_IMG_1671554675670`, `FB_IMG_1671554681269`, `FB_IMG_1671554686721` (Facebook copies)
- **1BHK kitchen and dining renders** (8): `FB_IMG_1668356007269`, `…010527`, `…013184`, `…018768`, `…021070`, `…023735`, `…027417`, `…030086`
- **2BHK renders** (7): `20220209_230628_IMG_3871`, `…230633_IMG_3872`, `…230642_IMG_3873`, `…230645_IMG_3874`, `…230649_IMG_3875`, `…230652_IMG_3876`, `20220211_171055_IMG_3952`
- **Residential gallery** (3): `20181002_095954_IMG_8260`, `20191204_195552_IMG_1414`, `20220209_230625_IMG_3870` (pooja)
- **Logo**: SVG of the SKE mark in dark and light versions

And the **147 files missing from the server**, the most important being:

- **Flooring gallery (8)**: `FB_IMG_1681237841047`, `…844091`, `…846781`, `…849275`, `…851977`, `…854473`, `…857057`, `…860080`
- **Commercial gallery (13)**: `commercial.jpg`, `commercial_2.jpg` to `commercial_13.jpg`
- **Residential gallery (about 90)**: the `residencial*.jpg`, `residencial1_*.jpg` and `residencial3_*.jpg` series
- **Home page (5)**: `residencial1_2`, `residencial1_8`, `residencial_20`, `residencial_35`, `residencial_36`. The content file plans to use these for the studio intro, services cards and closing CTA, so those slots need new images.
- **Newest uploads, December 2024 (7)**: `20241015_171112`, `…171231`, `…171247`, `…172747`, `…181830`, `20241019_100607`, `…100640`. Probably recent site photos, which are the most valuable of all.
- **2019 iPhone photos (25 in the media library)**: `20190713_*`, `20190803_*`, `20190901_*`, `20190902_*`, `20190904_*` (mostly HEIC). Likely real site photos.
- **Favicon**: `cropped-fav.png`

The full list with the pages each file was on is under `missing_on_server` in `manifest.json`.

## Design vs reality pairs (render + real photo of the same room)

**None found.** The site has 37 SKE renders but only 3 real photos, and the photos don't match any render. The two SKE-looking living-room renders in the 2BHK set (`IMG_3975`, `IMG_3976`) look nothing like the swing living room in the 2BHK photo. The before/after slider on the home page will need pairs from SKE (this is already item 10 in the content file's questions).

The render sets do include **same-room, different-angle pairs**, which are useful for project galleries:
- 3BHK bedroom: `190713_ddcd44fa…` + `190717_8322be1c…`
- 3BHK bedroom: `190718_61abca03…` + `190719_60a5f79f…`
- 2BHK kitchen: `IMG_3871` + `IMG_3872`
- 1BHK kitchen and dining: the eight `FB_IMG_1668356…` views of one space

## Pages

All 15 URLs loaded (HTTP 200). None failed. Several are leftovers that should be redirected, not rebuilt:

- `/sample-page/`: the WordPress default "Sample Page" is still published
- `/residential/`, `/commercial/`, `/industries/`: stub "service" blog posts with one line of text (the `/industries/` post is titled "Flooring Solution")
- `/get-a-quote/`: exists as a WordPress page (the content file calls it new)
- `/flooring/`: loads, but every gallery image is broken

The three project pages all show the same placeholder client details ("Client name: Vijay Kumar") and budgets. Don't carry those details over without confirming them.

## How this was made

Scripts in `scripts/scrape/` (run in order from the repo root):

1. `01-urls-and-media.py`: sitemaps, REST API (`/wp-json/wp/v2/media`, pages, posts, categories: open, not blocked), homepage links → `scrape/urls.txt`, `scrape/api/*.json`
2. `02-crawl-pages.mjs`: Playwright: every page, slow scroll, slider arrows clicked, image URLs from `img`/`srcset`/`data-*`/inline and computed backgrounds/lightbox links/`og:image`/network → `scrape/api/crawl-results.json`, page text and screenshots in `scrape/pages/`
3. `03-download-images.py`: maps resized (`-1024x768`), `-scaled` and FooGallery cache thumbnails back to the original. Downloads one request at a time with a 500ms delay, from skeinteriors.com only, skipping anything under 150px, then removes byte-identical duplicates
4. `04-thumbs-and-review-grids.py`: thumbnails for the contact sheet (`scrape/thumbs/`)
5. `05-manifest-and-report.py`: `manifest.json` + `contact-sheet.html` from the download log and the hand review in `scrape/api/review.json`
