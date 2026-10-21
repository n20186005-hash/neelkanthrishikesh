# नीलकंठ महादेव यात्री मार्गदर्शिका

Astro + Tailwind CSS + TypeScript single-attraction guide for Cloudflare Workers.

## Requirements
- Node 22.16.0
- pnpm 11.23.0

## Commands
```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm build
pnpm deploy
```

## Site URL
`astro.config.mjs` hardcodes `site = 'https://neelkanthrishikesh.com'` as the default so canonical, absolute OG URLs, hreflang and `sitemap-index.xml` are always emitted. `SITE_URL` can still override it:

```bash
SITE_URL=https://neelkanthrishikesh.com pnpm build
```

## Deployment and content
The Cloudflare Workers Builds project is `neelkanthrishikesh`. The Worker serves Astro SSR routes and static assets. Keep the existing custom-domain configuration; do not add domains based on this README. Build output is ignored and reproduced from source.

The site is a single Hindi guide with privacy, terms, cookie settings, offline fallback and a real 404 page. The sitemap excludes offline/error pages. HTTP apex redirects retain path and query. Each page uses its own canonical and language alternate.

## Features
- Consent-based GA4, with runtime denial, regrant, storage error feedback and a session veto.
- Open-Meteo server-side forecast for the public place pin; validated payload, 30-minute cache, neutral unavailable state and dated output. It is a model forecast rather than an official warning.
- A site-owned service worker with versioned caches; offline pages may show older information.
- Native mobile navigation menu.
- No login, payment, booking, contact form or private location request.

## Photo
`public/images/hero.jpg` is the exact Commons public-domain image described in SOURCES.md. `og-cover.jpg` is a fit on a dark background from that image. Reproduce it with `python scripts/gen-assets.py` (Pillow). PNG icons are reproduced from the pre-existing shape-drawing function; the existing SVG and inline branding are retained.
