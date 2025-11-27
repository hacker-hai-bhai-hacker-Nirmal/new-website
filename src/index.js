/**
 * Litterateur Cafe - Workers Service
 * Serves static site and handles authentication
 */

import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler';

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = true;

export default {
  async fetch(event, env, ctx) {
    try {
      return await handleEvent(event, env, ctx);
    } catch (e) {
      if (DEBUG) {
        return new Response(e.message || e.toString(), {
          status: 500,
        });
      }
      return new Response('Internal Error', { status: 500 });
    }
  }
};

async function handleEvent(event, env, ctx) {
  const url = new URL(event.request.url);
  const { pathname, searchParams } = url;

  // Comprehensive logging
  console.log(`🚀 Request: ${event.request.method} ${pathname}`);

  // Handle API routes
  if (pathname.startsWith('/api/')) {
    console.log(`🔧 API Route: ${pathname}`);
    return handleApiRequest(event.request, pathname, searchParams);
  }

  // Serve static assets - simplified approach
  try {
    console.log(`📦 Serving static asset: ${pathname}`);
    
    // If it's a directory, serve index.html
    if (pathname.endsWith('/')) {
      console.log(`📄 Serving index.html for directory: ${pathname}`);
      return await getAssetFromKV(event, {
        mapRequestToAsset: req => new Request(`${new URL(req.url).origin}index.html`, req),
      });
    }

    // Otherwise, try to serve the requested asset
    console.log(`📄 Serving direct asset: ${pathname}`);
    return await getAssetFromKV(event, {
      mapRequestToAsset: req => mapRequestToAsset(req),
    });
  } catch (e) {
    console.log(`❌ Asset not found: ${pathname} - ${e.message}`);
    
    // If asset not found, try to serve as SPA route
    try {
      console.log(`🔄 Trying SPA fallback for: ${pathname}`);
      return await getAssetFromKV(event, {
        mapRequestToAsset: req => new Request(`${new URL(req.url).origin}index.html`, req),
      });
    } catch (e) {
      console.log(`❌ SPA fallback failed: ${pathname} - ${e.message}`);
      // If still not found, return 404
      return new Response(`Not Found: ${pathname}`, { status: 404 });
    }
  }
}

// Helper to add cache headers and fix Content-Type for JavaScript
async function serveAsset(event, options) {
  const res = await getAssetFromKV(event, options);
  const ct = res.headers.get('content-type') || '';
  const headers = new Headers(res.headers);
  
  // Get pathname from event.request.url for safety
  let pathname = '';
  try {
    const url = new URL(event.request.url);
    pathname = url.pathname;
  } catch (e) {
    console.log('Error getting pathname:', e.message);
    pathname = '';
  }

  // Fix Content-Type for JavaScript files
  if (pathname.endsWith('.js') || pathname.endsWith('.mjs')) {
    headers.set('Content-Type', 'application/javascript; charset=utf-8');
    console.log(`Fixed Content-Type for JavaScript: ${pathname}`);
  }

  if (ct.includes('text/html')) {
    headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');
  } else {
    // short cache for static assets to reflect changes quickly
    headers.set('Cache-Control', 'public, max-age=300, immutable');
  }

  // Add debugging headers
  headers.set('X-Debug-Pathname', pathname);
  headers.set('X-Debug-Content-Type', headers.get('Content-Type'));

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers,
  });
}

/**
 * Handle API requests for authentication and other backend functions
 */
async function handleApiRequest(request, pathname, searchParams) {
  const url = new URL(request.url);
  
  // CORS headers for API requests
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    switch (pathname) {
      case '/api/auth/status':
        return handleAuthStatus(request, corsHeaders);
      case '/api/auth/logout':
        return handleLogout(request, corsHeaders);
      default:
        return new Response('API endpoint not found', { 
          status: 404, 
          headers: corsHeaders 
        });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  }
}

/**
 * Check authentication status
 */
async function handleAuthStatus(request, corsHeaders) {
  // This would integrate with Appwrite session validation
  // For now, return basic status
  const response = {
    authenticated: false,
    user: null,
    message: 'Authentication status endpoint'
  };

  return new Response(JSON.stringify(response), {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Handle logout
 */
async function handleLogout(request, corsHeaders) {
  // This would handle Appwrite session cleanup
  const response = {
    success: true,
    message: 'Logged out successfully'
  };

  return new Response(JSON.stringify(response), {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Environment variables for Appwrite
 */
const ENV = {
  APPWRITE_PROJECT_ID: '6900b1ed001604d8befb',
  APPWRITE_ENDPOINT: 'https://fra.cloud.appwrite.io/v1',
  APPWRITE_DATABASE_ID: 'litterateur_db',
};
