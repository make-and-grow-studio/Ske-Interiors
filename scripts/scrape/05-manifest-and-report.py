"""
Step 6b: build the deliverables from the download log + the hand review.

Inputs:  scrape/api/downloads.json  (from 03 + 04)
         scrape/api/review.json     (hand review of every image)
         scrape/api/crawl-results.json
Outputs: scrape/manifest.json
         scrape/contact-sheet.html

Run from the repo root:  python3 scripts/scrape/05-manifest-and-report.py
"""
import html
import json
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCRAPE = ROOT / "scrape"
log = json.loads((SCRAPE / "api/downloads.json").read_text())
review = json.loads((SCRAPE / "api/review.json").read_text())
crawl = json.loads((SCRAPE / "api/crawl-results.json").read_text())
page_order = [r["slug"] for r in crawl["results"].values()]

ok = [e for e in log if e["status"] == "ok"]
missing = [e for e in log if e["status"] == "failed"]
dupes = [e for e in log if e["status"] == "duplicate"]


def orientation(w, h):
    if abs(w - h) / max(w, h) < 0.08:
        return "square"
    return "landscape" if w > h else "portrait"


# ---- manifest.json ----
images = []
for e in sorted(ok, key=lambda e: e["path"]):
    name = Path(e["path"]).name
    r = review.get(name)
    if r is None:
        raise SystemExit(f"No hand review for {name}: add it to scrape/api/review.json")
    images.append({
        "filename": name,
        "path": e["path"],
        "thumb": e["thumb"],
        "original_url": e["url"],
        "other_urls": sorted(set(e["seen_urls"]) - {e["url"]}) + e.get("duplicate_urls", []),
        "pages": e["pages"],
        "in_media_library": e["media_id"] is not None,
        "width": e["width"],
        "height": e["height"],
        "file_size_bytes": e["bytes"],
        "format": e["format"].lower().replace("jpeg", "jpg"),
        "orientation": orientation(e["width"], e["height"]),
        "subject": r["subject"],
        "project": r["project"],
        "render_or_photo": {"render": "3D render", "photo": "real photo", "graphic": "graphic"}[r["type"]],
        "stock": r["project"] == "stock",
        "quality": r["quality"],
        "notes": r["notes"],
        "sha256": e["sha256"],
    })

manifest = {
    "generated_by": "scripts/scrape/05-manifest-and-report.py",
    "source": "https://skeinteriors.com",
    "totals": {
        "image_urls_found": len(log),
        "downloaded": len(ok),
        "missing_on_server": len(missing),
        "exact_duplicates_removed": len(dupes),
    },
    "images": images,
    "missing_on_server": [
        {"url": e["key"], "pages": e["pages"], "in_media_library": e["media_id"] is not None}
        for e in sorted(missing, key=lambda e: e["key"])
    ],
    "duplicates_removed": [{"url": e["url"], "kept": e["duplicate_of"]} for e in dupes],
}
(SCRAPE / "manifest.json").write_text(json.dumps(manifest, indent=2))

# ---- contact-sheet.html ----
by_page = defaultdict(list)
for im in images:
    for p in im["pages"] or ["media library only"]:
        by_page[p].append(im)
missing_by_page = defaultdict(int)
for e in missing:
    for p in e["pages"] or ["media library only"]:
        missing_by_page[p] += 1

QUALITY_ORDER = {"hero-ready": 0, "good": 1, "low-res": 2, "unusable": 3}
sections = [p for p in page_order if p in by_page or p in missing_by_page] + ["media library only"]


def card(im):
    kb = im["file_size_bytes"] / 1024
    size = f'{kb / 1024:.1f} MB' if kb > 1024 else f"{kb:.0f} KB"
    flags = []
    if im["stock"]:
        flags.append('<span class="flag">stock</span>')
    if "watermark" in im["notes"].lower():
        flags.append('<span class="flag">watermark</span>')
    return f"""
    <figure class="card q-{im['quality']}">
      <a href="{html.escape(im["path"].removeprefix("scrape/"))}" target="_blank" rel="noopener">
        <img src="{html.escape(im["thumb"].removeprefix("scrape/"))}" alt="{html.escape(im['subject'])}, {html.escape(im['project'])}" loading="lazy" width="{min(600, im['width'])}" height="{round(min(600, im['width']) * im['height'] / im['width'])}">
      </a>
      <figcaption>
        <span class="name">{html.escape(im['filename'])}</span>
        <span class="meta">{html.escape(im['subject'])} · {im['render_or_photo']} · {im['width']}×{im['height']} · {size}</span>
        <span class="meta">{html.escape(im['project'])}</span>
        <span class="badges"><span class="q">{im['quality']}</span>{''.join(flags)}</span>
      </figcaption>
    </figure>"""


body = []
for p in sections:
    ims = sorted(by_page.get(p, []), key=lambda i: (QUALITY_ORDER[i["quality"]], i["filename"]))
    miss = missing_by_page.get(p, 0)
    title = "Home" if p == "home" else p.replace("-", " ").capitalize()
    url = "" if p == "media library only" else f'<a href="https://skeinteriors.com/{"" if p == "home" else p + "/"}">/{"" if p == "home" else p + "/"}</a>'
    note = f'<p class="missing">{miss} more image{"s" if miss != 1 else ""} referenced here no longer exist on the server.</p>' if miss else ""
    body.append(f"""
  <section id="{html.escape(p)}">
    <h2>{html.escape(title)} <small>{len(ims)} image{'s' if len(ims) != 1 else ''} {url}</small></h2>
    {note}
    <div class="grid">{''.join(card(i) for i in ims)}</div>
  </section>""")

counts = defaultdict(int)
for im in images:
    counts[im["quality"]] += 1
nav = " · ".join(f'<a href="#{html.escape(p)}">{html.escape(p)}</a>' for p in sections)

page = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>SKE image review</title>
<style>
  :root {{
    --teak: #5B3E2A; --plaster: #ECE6DC; --stone: #BDB3A4; --charcoal: #1F1D1A; --brass: #A5854F; --white: #FFFFFF;
    --bg: var(--plaster); --fg: var(--charcoal); --card: var(--white); --muted: #6b6259;
  }}
  @media (prefers-color-scheme: dark) {{
    :root {{ --bg: var(--charcoal); --fg: var(--plaster); --card: #2a2724; --muted: var(--stone); }}
  }}
  * {{ box-sizing: border-box; }}
  body {{ margin: 0; background: var(--bg); color: var(--fg); font: 15px/1.5 system-ui, sans-serif; }}
  header, section {{ max-width: 1440px; margin: 0 auto; padding: 24px; }}
  h1 {{ font: 400 2.2rem/1.1 Georgia, serif; margin: 0 0 8px; letter-spacing: -0.01em; }}
  h2 {{ font: 400 1.5rem/1.2 Georgia, serif; margin: 0 0 12px; border-top: 1px solid var(--stone); padding-top: 24px; }}
  h2 small {{ font: 14px system-ui, sans-serif; color: var(--muted); margin-left: 8px; }}
  a {{ color: var(--brass); }}
  .summary {{ max-width: 75ch; }}
  nav {{ font-size: 14px; margin-top: 12px; }}
  .missing {{ color: var(--teak); background: rgba(165,133,79,.15); padding: 8px 12px; border-radius: 4px; display: inline-block; }}
  @media (prefers-color-scheme: dark) {{ .missing {{ color: var(--plaster); }} }}
  .grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }}
  .card {{ margin: 0; background: var(--card); border-radius: 4px; overflow: hidden; border-top: 4px solid var(--stone); }}
  .card img {{ display: block; width: 100%; height: 180px; object-fit: cover; background: var(--stone); }}
  .card figcaption {{ padding: 8px 10px 10px; display: grid; gap: 2px; font-size: 13px; }}
  .name {{ font-weight: 600; word-break: break-all; }}
  .meta {{ color: var(--muted); }}
  .badges {{ display: flex; gap: 6px; margin-top: 4px; flex-wrap: wrap; }}
  .q, .flag {{ font-size: 12px; padding: 1px 8px; border-radius: 99px; border: 1px solid var(--stone); }}
  .flag {{ background: var(--teak); color: var(--white); border-color: var(--teak); }}
  .q-hero-ready {{ border-top-color: #3f7a3a; }} .q-good {{ border-top-color: var(--brass); }}
  .q-low-res {{ border-top-color: var(--stone); }} .q-unusable {{ border-top-color: #9b3b2b; opacity: .75; }}
  .legend span {{ display: inline-block; width: 12px; height: 12px; margin: 0 4px 0 12px; vertical-align: -1px; }}
</style>
</head>
<body>
<header>
  <h1>SKE Interiors: image review</h1>
  <p class="summary">{len(images)} images downloaded from skeinteriors.com ({counts['good']} good, {counts['low-res']} low-res, {counts['unusable']} unusable). {len(missing)} more files are listed in WordPress but no longer exist on the server. Click a thumbnail to open the full-size file. Details: <a href="image-report.md">image-report.md</a>, <a href="manifest.json">manifest.json</a>.</p>
  <p class="legend">Top border:<span style="background:var(--brass)"></span>good<span style="background:var(--stone)"></span>low-res<span style="background:#9b3b2b"></span>unusable</p>
  <nav>{nav}</nav>
</header>
{''.join(body)}
</body>
</html>
"""
(SCRAPE / "contact-sheet.html").write_text(page)
print(f"manifest: {len(images)} images, {len(missing)} missing, {len(dupes)} duplicates")
print(dict(counts))
