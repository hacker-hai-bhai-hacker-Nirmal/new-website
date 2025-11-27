globalThis.process ??= {}; globalThis.process.env ??= {};
import { h as defineMiddleware, s as sequence } from './chunks/astro_C1ciDD7V.mjs';
import './chunks/es-module-lexer_Bic5RHXJ.mjs';

// Astro Middleware for Route Protection


// Define protected and auth-only routes
const protectedRoutes = ['/dashboard', '/checkout', '/rewards', '/admin', '/kitchen'];
const authOnlyRoutes = ['/login'];

const onRequest$1 = defineMiddleware(async (context, next) => {
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

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
