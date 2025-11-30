// src/pages/api/check-env.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  try {
    // Check environment variables at runtime
    const brevoKey = import.meta.env.brevo_MCP_key;
    const allVars = Object.keys(import.meta.env).filter(k => 
      k.toLowerCase().includes('brevo') || 
      k.toLowerCase().includes('mcp')
    );

    const envInfo = {
      brevo_MCP_key_present: !!brevoKey,
      brevo_MCP_key_length: brevoKey?.length || 0,
      brevo_MCP_key_first_chars: brevoKey?.substring(0, 10) + '...' || 'NOT FOUND',
      all_environment_variables: allVars,
      node_env: import.meta.env.MODE,
      dev: import.meta.env.DEV,
      prod: import.meta.env.PROD
    };

    return new Response(JSON.stringify({
      success: true,
      message: 'Environment variable check completed',
      timestamp: new Date().toISOString(),
      ...envInfo,
      deployment_status: brevoKey ? 'ENVIRONMENT_VARIABLES_WORKING' : 'ENVIRONMENT_VARIABLES_MISSING'
    }, null, 2), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Environment check error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Environment check failed',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
