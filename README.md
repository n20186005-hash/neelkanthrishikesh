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

## SEO entity binding
All language-neutral attraction facts live in one place:

- `src/data/site.ts` — official name / short name, city, district, state, country, postal code, plus code, lat-lng, Google Maps share + embed URLs, nearby landmarks, official `.gov/.nic` sources, rating snapshot, hero image and `withSiteName()` / `absUrl()` helpers.
- `src/lib/schema.ts` — `TouristAttraction` + `HinduTemple` (with `@id`, `image`, `alternateName`, `hasMap`, `sameAs`, `isAccessibleForFree`), `FAQPage`, `BreadcrumbList` and `WebSite` JSON-LD builders.
- `src/components/SourcesSection.astro` — E-E-A-T sources block with authoritative outbound links.

## PWA
`public/site.webmanifest`, `public/sw.js` (pages network-first, static cache-first, `/offline/` fallback) and `public/icons/icon-192|512|512-maskable.png`. The service worker is registered inline in `src/layouts/Base.astro`.

## Assets
- `public/images/hero.jpg` — local copy of the Wikimedia Commons public-domain photo (`NeelKanth Mahadev Temple.JPG`, Rahuldewangan).
- `public/images/og-cover.jpg` — 1200×630 OG/Twitter cover.
- Regenerate icons/cover with `python scripts/gen-assets.py` (requires Pillow).

## Weather module
`src/components/WeatherSection.astro` + `src/lib/weather.ts`: live conditions + 7-day forecast for the temple's coordinates. Fetched server-side on each request and cached in-memory for 30 min. Because the page is SSR (`output: 'server'`), the weather card is rendered into HTML at request time — no client key and no visible provider name on the page. If the upstream is unreachable it shows a neutral fallback message.

## Notes
- GA4: G-HXM22WWPKP, loaded only after analytics consent.
- No database, login or CMS.
- Google Maps embed is localized to Hindi/India.
- Deployment is manual: `pnpm build` then `pnpm deploy` (`wrangler deploy`). Only `dist/client` (static assets) + `dist/server` (worker) are needed; `dist/`, `node_modules/`, logs and local scripts are git-ignored (see `.gitignore`).
- HTTP→HTTPS is handled by Cloudflare (Always Use HTTPS); `public/_headers` sends HSTS and security headers.
