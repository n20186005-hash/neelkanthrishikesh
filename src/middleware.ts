import { defineMiddleware } from 'astro:middleware';
export const onRequest = defineMiddleware(async ({ url }, next) => {
  // Preserve the exact path and query when consolidating the established HTTP entrance.
  if (url.hostname === 'neelkanthrishikesh.com' && url.protocol === 'http:') {
    const target = new URL(url); target.protocol = 'https:';
    return Response.redirect(target, 301);
  }
  const response = await next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  if (response.status === 404 || url.pathname === '/offline/' || url.pathname === '/404/') response.headers.set('X-Robots-Tag', 'noindex, follow');
  if (response.headers.get('content-type')?.includes('text/html')) response.headers.set('Cache-Control', 'no-cache');
  return response;
});
