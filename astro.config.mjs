import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const SITE = process.env.SITE_URL?.trim() || undefined;

export default defineConfig({
  site: SITE,
  output: 'server',
  adapter: cloudflare({ platformProxy: { enabled: true } }),
  integrations: SITE ? [sitemap()] : [],
  vite: { plugins: [tailwindcss()] }
});
