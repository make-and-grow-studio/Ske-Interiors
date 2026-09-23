"""
Step 6a: tidy folders after de-duplication, make thumbnails for the contact
sheet, and build numbered review grids so every image can be looked at.

Outputs: scrape/thumbs/<same path>.jpg   (600px wide JPEG thumbnails)
         scratch review grids in the directory given as the first argument

Run from the repo root:  python3 scripts/scrape/04-thumbs-and-review-grids.py <grid-dir>
"""
import json
import shutil
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps
import pillow_heif

pillow_heif.register_heif_opener()

ROOT = Path(__file__).resolve().parents[2]
SCRAPE = ROOT / "scrape"
THUMBS = SCRAPE / "thumbs"
log_path = SCRAPE / "api/downloads.json"
log = json.loads(log_path.read_text())
ok = [e for e in log if e["status"] == "ok"]


def folder_for(pages):
    if len(pages) > 1:
        return "shared"
    return pages[0] if pages else "media-library"


# A duplicate found on another page can make a kept file "shared": move it.
for e in ok:
    want = SCRAPE / "images" / folder_for(e["pages"])
    cur = ROOT / e["path"]
    if cur.parent != want:
        want.mkdir(parents=True, exist_ok=True)
        shutil.move(cur, want / cur.name)
        e["path"] = str((want / cur.name).relative_to(ROOT))
        if e.get("jpeg_copy"):
            j = ROOT / e["jpeg_copy"]
            shutil.move(j, want / j.name)
            e["jpeg_copy"] = str((want / j.name).relative_to(ROOT))
for d in (SCRAPE / "images").iterdir():
    if d.is_dir() and not any(d.iterdir()):
        d.rmdir()
log_path.write_text(json.dumps(log, indent=2))

# Thumbnails
if THUMBS.exists():
    shutil.rmtree(THUMBS)
for e in ok:
    src = ROOT / e["path"]
    thumb = THUMBS / Path(e["path"]).relative_to("scrape/images").with_suffix(".jpg")
    thumb.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im).convert("RGB")
        im.thumbnail((600, 600))
        im.save(thumb, "JPEG", quality=80)
    e["thumb"] = str(thumb.relative_to(ROOT))
log_path.write_text(json.dumps(log, indent=2))

# Numbered review grids (4 x 3) for looking at every image
if len(sys.argv) > 1:
    out = Path(sys.argv[1])
    out.mkdir(parents=True, exist_ok=True)
    ok.sort(key=lambda e: e["path"])
    cell_w, cell_h, cols, rows = 480, 380, 4, 3
    index = []
    for g in range(0, len(ok), cols * rows):
        sheet = Image.new("RGB", (cell_w * cols, cell_h * rows), "white")
        draw = ImageDraw.Draw(sheet)
        for k, e in enumerate(ok[g:g + cols * rows]):
            num = g + k
            with Image.open(ROOT / e["thumb"]) as im:
                im.thumbnail((cell_w - 10, cell_h - 40))
                x, y = (k % cols) * cell_w + 5, (k // cols) * cell_h + 5
                sheet.paste(im, (x, y))
            label = f"#{num} {Path(e['path']).name[:40]} {e['width']}x{e['height']}"
            draw.text((x, y + cell_h - 32), label, fill="black")
            index.append({"n": num, "path": e["path"]})
        sheet.save(out / f"grid-{g // (cols * rows):02d}.jpg", quality=85)
    (out / "index.json").write_text(json.dumps(index, indent=1))
    print(f"{len(ok)} images, {len(index) // (cols * rows) + 1} grids in {out}")
