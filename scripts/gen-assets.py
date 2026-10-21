"""Reproduce the social cover from the verified public-domain historical photo (Pillow)."""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
DEEP=(22,35,29)
LEAF=(49,91,70)
SAFFRON=(217,119,6)
CREAM=(247,242,232)

def make_og():
    images = Path(__file__).resolve().parent.parent / 'public' / 'images'
    image = Image.open(images / 'hero.jpg').convert('RGB')
    canvas = Image.new('RGB', (1200, 630), '#16231d')
    fitted = ImageOps.contain(image, (560, 590), Image.Resampling.LANCZOS)
    canvas.paste(fitted, ((1200-fitted.width)//2, (630-fitted.height)//2))
    canvas.save(images / 'og-cover.jpg', quality=92, optimize=True)

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


if __name__ == '__main__':
    make_og()
    icons = Path(__file__).resolve().parent.parent / 'public' / 'icons'
    for name, size, mask in [('icon-192.png',192,False),('icon-512.png',512,False),('icon-512-maskable.png',512,True),('favicon-16.png',16,False),('favicon-32.png',32,False),('apple-touch-icon.png',180,False)]:
        draw_icon(size, mask).save(icons / name)
