// src/pages/api/debug-env.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  try {
    // Debug environment variables - use Astro.env in Cloudflare Pages
    const env = locals?.env || import.meta.env;
    
    const envVars = {
      brevo_MCP_key: env.brevo_MCP_key ? `Found (length: ${env.brevo_MCP_key.length})` : 'NOT FOUND',
      JWT_SECRET: env.JWT_SECRET ? 'SET' : 'NOT_SET',
      APPWRITE_PROJECT_ID: env.APPWRITE_PROJECT_ID ? 'SET' : 'NOT_SET',
      APPWRITE_ENDPOINT: env.APPWRITE_ENDPOINT ? 'SET' : 'NOT_SET',
      APPWRITE_DATABASE_ID: env.APPWRITE_DATABASE_ID ? 'SET' : 'NOT_SET',
      allEnvVars: Object.keys(env).filter(key => key.toLowerCase().includes('brevo') || key.toLowerCase().includes('jwt') || key.toLowerCase().includes('appwrite'))
    };

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Environment variable debug information',
        envVars,
        timestamp: new Date().toISOString()
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Debug env error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Debug failed' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
