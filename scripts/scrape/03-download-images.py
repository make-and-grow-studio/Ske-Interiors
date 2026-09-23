"""
Steps 4 + 5 of the image scrape: resolve every image to its original upload,
download it, sort it into folders by page, and remove duplicates.

Inputs:  scrape/api/media.json, scrape/api/crawl-results.json
Outputs: scrape/images/<page-slug>/...   (image used on one page)
         scrape/images/shared/...        (image used on 2+ pages)
         scrape/images/media-library/... (in the WP media library, not on any page)
         scrape/api/downloads.json       (raw download log for the manifest step)

HEIC files (iPhone photos) are kept as-is and a full-size .jpg copy is written
next to them, because browsers and Astro can't use HEIC.

Run from the repo root:  python3 scripts/scrape/03-download-images.py
"""
import hashlib
import json
import re
import shutil
import subprocess
import time
from collections import defaultdict
from pathlib import Path
from urllib.parse import urlsplit, unquote

from PIL import Image
import pillow_heif

pillow_heif.register_heif_opener()

ROOT = Path(__file__).resolve().parents[2]
SCRAPE = ROOT / "scrape"
IMAGES = SCRAPE / "images"
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"
DELAY = 0.5
MIN_SIDE = 150  # skip icons and tiny UI images
SIZE_RE = re.compile(r"-(\d+)x(\d+)(?=\.\w+$)")
SKIP_RE = re.compile(r"\.svg($|#)|/plugins/.*/(arrows|icons)|/wp-includes/|gravatar", re.I)


def curl(url, dest=None):
    """One polite request. Returns (status, content_type, bytes_or_None)."""
    time.sleep(DELAY)
    args = ["curl", "-sSL", "--max-time", "120", "-A", UA, "-w", "%{http_code} %{content_type}"]
    if dest:
        args += ["-o", str(dest)]
    else:
        args += ["-o", "/dev/null"]
    r = subprocess.run(args + [url], capture_output=True, text=True)
    status, _, ctype = r.stdout.strip().partition(" ")
    return int(status or 0), ctype


def clean(url):
    return url.split("#")[0].split("?")[0]


def is_site(url):
    return urlsplit(url).netloc.endswith("skeinteriors.com")


# ---- Gather every candidate image and the pages it appeared on ----
media = json.loads((SCRAPE / "api/media.json").read_text())
crawl = json.loads((SCRAPE / "api/crawl-results.json").read_text())["results"]

# key = original upload URL (best guess); value = info
items = defaultdict(lambda: {"pages": set(), "seen_urls": set(), "sources": set(), "media": None})


def original_guess(url):
    """Map any resized / cached / scaled URL to the most likely original."""
    url = clean(url)
    # FooGallery cache thumbnails: /uploads/cache/2023/04/<stem>/<n>.jpg -> /uploads/2023/04/<stem>.<ext>
    m = re.match(r"(https://skeinteriors\.com/wp-content/uploads/)cache/(\d{4}/\d{2})/([^/]+)/\d+\.(\w+)$", url)
    if m:
        return f"{m.group(1)}{m.group(2)}/{m.group(3)}.{m.group(4)}"
    return SIZE_RE.sub("", url)


media_by_url = {}
for mi in media:
    src = mi["source_url"]
    media_by_url[src] = mi
    it = items[src]
    it["media"] = mi
    it["sources"].add("media-library")

for page_url, res in crawl.items():
    for img in res["images"]:
        u = clean(img["url"])
        if not is_site(u) or SKIP_RE.search(img["url"]):
            continue
        key = original_guess(u)
        # Line up with a media-library entry that has the same original
        # (e.g. page shows photo-1024x768.jpg, library has photo-scaled.jpg)
        for cand in (key, re.sub(r"(\.\w+)$", r"-scaled\1", key)):
            if cand in media_by_url:
                key = cand
                break
        it = items[key]
        it["pages"].add(res["slug"])
        it["seen_urls"].add(u)
        it["sources"].add(img["source"])


def candidates(key, it):
    """Ordered list of URLs to try: true original first, then largest sizes."""
    out = []
    mi = it["media"]
    if mi:
        orig = mi["media_details"].get("original_image")
        if orig:  # WordPress "-scaled" copies keep the real original's name here
            out.append(mi["source_url"].rsplit("/", 1)[0] + "/" + orig)
    out.append(key.replace("-scaled.", "."))
    out.append(key)
    sizes = []
    if mi:
        for s in (mi["media_details"].get("sizes") or {}).values():
            sizes.append((s.get("width", 0) * s.get("height", 0), s["source_url"]))
    for u in it["seen_urls"]:
        m = SIZE_RE.search(u)
        area = int(m.group(1)) * int(m.group(2)) if m else 0
        sizes.append((area, u))
    for _, u in sorted(sizes, reverse=True):
        out.append(u)
    # FooGallery originals are sometimes .jpeg / .png rather than .jpg
    stem = re.sub(r"\.\w+$", "", key)
    out += [stem + ext for ext in (".jpeg", ".png", ".JPG", ".webp")]
    seen, uniq = set(), []
    for u in out:
        if u not in seen:
            seen.add(u)
            uniq.append(u)
    return uniq


def folder_for(pages):
    if len(pages) > 1:
        return "shared"
    if len(pages) == 1:
        return next(iter(pages))
    return "media-library"


# ---- Download ----
if IMAGES.exists():
    shutil.rmtree(IMAGES)
IMAGES.mkdir(parents=True)
tmp = SCRAPE / ".tmp-download"
tmp.mkdir(exist_ok=True)

log = []
print(f"{len(items)} candidate images")
for n, (key, it) in enumerate(sorted(items.items()), 1):
    got = None
    tried = []
    for url in candidates(key, it):
        dest = tmp / "file"
        status, ctype = curl(url, dest)
        tried.append((url, status))
        if status == 200 and ctype.startswith("image/") and dest.stat().st_size > 0:
            got = url
            break
    entry = {
        "key": key,
        "pages": sorted(it["pages"]),
        "seen_urls": sorted(it["seen_urls"]),
        "found_via": sorted(it["sources"]),
        "media_id": it["media"]["id"] if it["media"] else None,
        "tried": tried,
    }
    if not got:
        entry["status"] = "failed"
        print(f"[{n}] FAIL {key}")
        log.append(entry)
        continue
    try:
        with Image.open(dest) as im:
            w, h, fmt = im.width, im.height, im.format
    except Exception as e:  # not an image we can read
        entry.update(status="unreadable", url=got, error=str(e))
        log.append(entry)
        print(f"[{n}] UNREADABLE {got}")
        continue
    if max(w, h) < MIN_SIDE:
        entry.update(status="skipped-small", url=got, width=w, height=h)
        log.append(entry)
        print(f"[{n}] small {w}x{h} {got}")
        continue
    filename = unquote(got.rsplit("/", 1)[1])
    folder = IMAGES / folder_for(it["pages"])
    folder.mkdir(parents=True, exist_ok=True)
    target = folder / filename
    i = 2
    while target.exists():  # same filename from a different upload month
        target = folder / f"{Path(filename).stem}__{i}{Path(filename).suffix}"
        i += 1
    shutil.move(dest, target)
    entry.update(
        status="ok", url=got, path=str(target.relative_to(ROOT)), width=w, height=h,
        format=fmt, bytes=target.stat().st_size,
        sha256=hashlib.sha256(target.read_bytes()).hexdigest(),
        is_original=(got == candidates(key, it)[0] or not SIZE_RE.search(got)),
    )
    # HEIC -> full-size JPEG copy for the browser / Astro
    if fmt == "HEIF":
        jpg = target.with_suffix(".jpg")
        with Image.open(target) as im:
            im.convert("RGB").save(jpg, "JPEG", quality=92)
        entry["jpeg_copy"] = str(jpg.relative_to(ROOT))
    log.append(entry)
    print(f"[{n}] ok {w}x{h} {entry['path']}")

shutil.rmtree(tmp, ignore_errors=True)

# ---- Remove exact duplicates by file hash (keep the largest / first) ----
ok = [e for e in log if e["status"] == "ok"]
by_hash = defaultdict(list)
for e in ok:
    by_hash[e["sha256"]].append(e)
for group in by_hash.values():
    if len(group) < 2:
        continue
    group.sort(key=lambda e: (-(e["width"] * e["height"]), len(e["path"])))
    keep = group[0]
    for d in group[1:]:
        keep.setdefault("duplicate_urls", []).append(d["url"])
        keep["pages"] = sorted(set(keep["pages"]) | set(d["pages"]))
        (ROOT / d["path"]).unlink(missing_ok=True)
        if d.get("jpeg_copy"):
            (ROOT / d["jpeg_copy"]).unlink(missing_ok=True)
        d["status"] = "duplicate"
        d["duplicate_of"] = keep["path"]

(SCRAPE / "api/downloads.json").write_text(json.dumps(log, indent=2))
from collections import Counter
print(Counter(e["status"] for e in log))
