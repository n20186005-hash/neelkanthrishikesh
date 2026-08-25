/// <reference types="astro/client" />
interface Window { loadGA?: () => void; __gaLoaded?: boolean; gtag?: (...args: unknown[]) => void; }
