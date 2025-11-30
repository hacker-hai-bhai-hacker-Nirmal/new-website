globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as defineMiddleware } from './chunks/index_BanjRzCv.mjs';
import './chunks/astro-designed-error-pages_9HTKAt0F.mjs';
import './chunks/astro/server_B5WI7quS.mjs';
import { s as sequence } from './chunks/sequence_BhfoHPsP.mjs';

// Astro Middleware for Route Protection (Temporarily Disabled)


// Define protected and auth-only routes
const protectedRoutes = ['/dashboard', '/checkout', '/rewards', '/admin', '/kitchen'];
const authOnlyRoutes = ['/login'];

const onRequest$2 = defineMiddleware(async (context, next) => {
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
