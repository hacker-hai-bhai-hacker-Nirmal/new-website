// Enhanced Role-Based Authentication Middleware

import { defineMiddleware } from 'astro:middleware';
import { authService, PROTECTED_ROUTES } from './lib/authService.js';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = new URL(context.request.url);
  const request = context.request;
  
  // Check if route requires authentication
  const isProtectedRoute = authService.isProtectedRoute(pathname);
  
  // Allow access to public routes
  if (!isProtectedRoute) {
    return next();
  }
  
  // Extract token from Authorization header or cookies
  let token = null;
  
  // Check Authorization header
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }
  
  // Check cookies as fallback
  if (!token) {
    const cookies = request.headers.get('Cookie') || '';
    const accessTokenMatch = cookies.match(/access_token=([^;]+)/);
    if (accessTokenMatch) {
      token = accessTokenMatch[1];
    }
  }
  
  // If no token for protected route, redirect to login
  if (!token) {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': `/login?redirect=${encodeURIComponent(pathname)}`
      }
    });
  }
  
  // Verify token and get user
  const user = await authService.getUserFromToken(token);
  
  if (!user) {
    // Invalid token - redirect to login
    return new Response(null, {
      status: 302,
      headers: {
        'Location': `/login?redirect=${encodeURIComponent(pathname)}&error=invalid_token`
      }
    });
  }
  
  // Check if user is active
  if (!user.isActive) {
    return new Response('Account deactivated', {
      status: 403,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
  
  // Check role-based permissions
  if (!authService.hasRoutePermission(user, pathname)) {
    return new Response('Insufficient permissions', {
      status: 403,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
  
  // Add user context to request for downstream use
  context.locals.user = user;
  
  return next();
});
