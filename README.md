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
The deployment URL is configured in one place through `SITE_URL` when building. If omitted, the project builds without a placeholder domain and sitemap is not enabled.

Example production build:
```bash
SITE_URL=https://your-real-domain.in pnpm build
```

## Notes
- GA4: G-HXM22WWPKP, loaded only after analytics consent.
- No database, login or CMS.
- Google Maps embed is localized to Hindi/India.
- The main historical photo is sourced from Wikimedia Commons public domain; the current source URL is intentionally retained because the execution environment could not fetch binary assets from the public internet during packaging.
