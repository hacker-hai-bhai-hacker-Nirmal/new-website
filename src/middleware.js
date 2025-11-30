// Astro Middleware for Route Protection (Cloudflare-Only Approach)

import { defineMiddleware } from 'astro:middleware';

// Define protected routes that require authentication
const protectedRoutes = ['/dashboard', '/checkout', '/rewards', '/admin', '/kitchen'];
const authOnlyRoutes = ['/login'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = new URL(context.request.url);
  
  // Check if route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthOnlyRoute = authOnlyRoutes.some(route => pathname.startsWith(route));
  
  // TODO: Implement JWT verification for Cloudflare-only auth
  // For now, allow all access (will implement later)
  
  return next();
});
