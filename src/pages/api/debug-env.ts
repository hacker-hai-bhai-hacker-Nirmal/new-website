// src/pages/api/debug-env.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    // Debug environment variables
    const envVars = {
      brevo_MCP_key: import.meta.env.brevo_MCP_key ? `Found (length: ${import.meta.env.brevo_MCP_key.length})` : 'NOT FOUND',
      BREVO_API_KEY: import.meta.env.BREVO_API_KEY ? `Found (length: ${import.meta.env.BREVO_API_KEY.length})` : 'NOT FOUND',
      allEnvVars: Object.keys(import.meta.env).filter(key => key.toLowerCase().includes('brevo'))
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
