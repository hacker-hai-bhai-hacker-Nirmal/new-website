globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as defineMiddleware, s as sequence } from './chunks/index_BxC8yqQa.mjs';
import './chunks/astro-designed-error-pages_CvTVsLWo.mjs';
import './chunks/astro/server_CKD2j12W.mjs';

// Astro Middleware for Route Protection (Cloudflare-Only Approach)


// Define protected routes that require authentication
const protectedRoutes = ['/dashboard', '/checkout', '/rewards', '/admin', '/kitchen'];
const authOnlyRoutes = ['/login'];

const onRequest$2 = defineMiddleware(async (context, next) => {
  const { pathname } = new URL(context.request.url);
  
  // Check if route requires authentication
  protectedRoutes.some(route => pathname.startsWith(route));
  authOnlyRoutes.some(route => pathname.startsWith(route));
  
  // TODO: Implement JWT verification for Cloudflare-only auth
  // For now, allow all access (will implement later)
  
  return next();
});

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	onRequest$2
	
);

export { onRequest };
