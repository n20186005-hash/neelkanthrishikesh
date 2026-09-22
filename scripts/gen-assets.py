"""Generate OG cover + PWA icons for neelkanthrishikesh.com (offline, Pillow only)."""
import os

from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
IMAGES = os.path.join(PUBLIC, "images")
ICONS = os.path.join(PUBLIC, "icons")
os.makedirs(IMAGES, exist_ok=True)
os.makedirs(ICONS, exist_ok=True)

DEEP = (22, 35, 29)
LEAF = (49, 91, 70)
SAFFRON = (217, 119, 6)
CREAM = (247, 242, 232)

FONT_DIR = "C:/Windows/Fonts"
BOLD = os.path.join(FONT_DIR, "arialbd.ttf")
REG = os.path.join(FONT_DIR, "arial.ttf")


def font(path, size):
    from PIL import ImageFont

    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()


def text_w(draw, message, fnt):
    box = draw.textbbox((0, 0), message, font=fnt)
    return box[2] - box[0]


def make_og():
    src = Image.open(os.path.join(IMAGES, "hero.jpg")).convert("RGB")
    w, h = 1200, 630
    scale = max(w / src.width, h / src.height)
    resized = src.resize((max(1, int(src.width * scale)), max(1, int(src.height * scale))))
    left = (resized.width - w) // 2
    top = max(0, (resized.height - h) // 3)
    cover = resized.crop((left, top, left + w, top + h))

    shade = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shade)
    sd.rectangle((0, h - 330, w, h), fill=(22, 35, 29, 205))
    cover = Image.alpha_composite(cover.convert("RGBA"), shade).convert("RGB")
    cover = cover.filter(ImageFilter.SMOOTH)

    d = ImageDraw.Draw(cover)
    d.rectangle((0, 0, w, 10), fill=SAFFRON)
    f1 = font(BOLD, 62)
    f2 = font(REG, 34)
    f3 = font(REG, 26)

    lines = ["Shree Neelkanth Mahadev Temple"]
    y = h - 245
    for line in lines:
        # simple wrap by words
        words, cur = line.split(" "), ""
        chunks = []
        for word in words:
            trial = (cur + " " + word).strip()
            if text_w(ImageDraw.Draw(cover), trial, f1) > w - 120 and cur:
                chunks.append(cur)
                cur = word
            else:
                cur = trial
        chunks.append(cur)
        for chunk in chunks:
            x = (w - text_w(ImageDraw.Draw(cover), chunk, f1)) // 2
            d.text((x, y), chunk, font=f1, fill=CREAM)
            y += 74

    sub = "Rishikesh · Pauri Garhwal · Uttarakhand, India"
    d.text(((w - text_w(d, sub, f2)) // 2, y + 6), sub, font=f2, fill=(255, 196, 119))
    dom = "neelkanthrishikesh.com"
    d.text(((w - text_w(d, dom, f3)) // 2, y + 62), dom, font=f3, fill=(200, 214, 205))
    cover.save(os.path.join(IMAGES, "og-cover.jpg"), quality=88, optimize=True)
    print("og-cover.jpg", cover.size)


def draw_icon(size, maskable=False):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    pad = int(size * (0.12 if maskable else 0.0))
    inner = size - pad * 2

    if maskable:
        d.rectangle((0, 0, size, size), fill=DEEP)
    else:
        d.rounded_rectangle((0, 0, size, size), radius=int(size * 0.22), fill=DEEP)

    # saffron sun
    cx, cy = pad + inner * 0.72, pad + inner * 0.28
    r = inner * 0.13
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=SAFFRON)

    # green mountains
    base = pad + inner
    d.polygon(
        [
            (pad - inner * 0.05, base),
            (pad + inner * 0.30, pad + inner * 0.46),
            (pad + inner * 0.52, pad + inner * 0.72),
            (pad + inner * 0.74, pad + inner * 0.38),
            (pad + inner * 1.05, base),
        ],
        fill=LEAF,
    )
    d.polygon(
        [
            (pad + inner * 0.38, base),
            (pad + inner * 0.62, pad + inner * 0.58),
            (pad + inner * 0.92, base),
        ],
        fill=(28, 56, 42),
    )

    # trishul / shiva lingam silhouette
    s = inner
    stroke = max(2, int(s * 0.035))
    x0 = pad + s * 0.5
    top = pad + s * 0.30
    bottom = pad + s * 0.80
    d.line((x0, top, x0, bottom), fill=CREAM, width=stroke)
    d.line((x0 - s * 0.10, top + s * 0.12, x0 + s * 0.10, top + s * 0.12), fill=CREAM, width=stroke)
    d.line(
        (x0 - s * 0.09, top + s * 0.14, x0 - s * 0.09, top + s * 0.34), fill=CREAM, width=stroke
    )
    d.line(
        (x0 + s * 0.09, top + s * 0.14, x0 + s * 0.09, top + s * 0.34), fill=CREAM, width=stroke
    )
    d.ellipse(
        (x0 - s * 0.13, bottom - s * 0.05, x0 + s * 0.13, bottom + s * 0.09), fill=SAFFRON
    )
    return img


if __name__ == "__main__":
    make_og()
    draw_icon(192).save(os.path.join(ICONS, "icon-192.png"))
    draw_icon(512).save(os.path.join(ICONS, "icon-512.png"))
    draw_icon(512, maskable=True).save(os.path.join(ICONS, "icon-512-maskable.png"))
    print("icons written")
