// Astro Middleware for Route Protection (Temporarily Disabled)

import { defineMiddleware } from 'astro:middleware';

// Define protected and auth-only routes
const protectedRoutes = ['/dashboard', '/checkout', '/rewards', '/admin', '/kitchen'];
const authOnlyRoutes = ['/login'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = new URL(context.request.url);
  
  // Check if route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthOnlyRoute = authOnlyRoutes.some(route => pathname.startsWith(route));
  
  // For now, we'll handle client-side authentication
  // In a production environment, you might want to verify tokens server-side
  
  // Allow access to public routes
  if (!isProtectedRoute && !isAuthOnlyRoute) {
    return next();
  }
  
  // For protected routes, let the client-side auth handle it
  // This allows us to show proper error messages and handle redirects gracefully
  return next();
});
