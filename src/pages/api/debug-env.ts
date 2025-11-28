// src/pages/api/debug-env.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }: { locals: any }) => {
  try {
    // Debug environment variables - use Astro.env in Cloudflare Pages
    const env = (locals as any)?.env || import.meta.env;
    
    const envVars = {
      brevo_MCP_key: env.brevo_MCP_key ? `Found (length: ${env.brevo_MCP_key.length})` : 'NOT FOUND',
      JWT_SECRET: env.JWT_SECRET ? 'SET' : 'NOT_SET',
      APPWRITE_PROJECT_ID: env.APPWRITE_PROJECT_ID ? 'SET' : 'NOT_SET',
      APPWRITE_ENDPOINT: env.APPWRITE_ENDPOINT ? 'SET' : 'NOT_SET',
      APPWRITE_DATABASE_ID: env.APPWRITE_DATABASE_ID ? 'SET' : 'NOT_SET',
      allEnvVars: Object.keys(env).filter(key => key.toLowerCase().includes('brevo') || key.toLowerCase().includes('jwt') || key.toLowerCase().includes('appwrite'))
    };

    // Add comprehensive testing - simplified to avoid failures
    const comprehensiveTest = {
      environment: {
        hasLocals: !!locals,
        hasEnv: !!locals?.env,
        envKeys: Object.keys(env || {}),
        envVars: {
          JWT_SECRET: {
            exists: !!env.JWT_SECRET,
            length: env.JWT_SECRET ? env.JWT_SECRET.length : 0,
            type: typeof env.JWT_SECRET
          },
          brevo_MCP_key: {
            exists: !!env.brevo_MCP_key,
            length: env.brevo_MCP_key ? env.brevo_MCP_key.length : 0,
            type: typeof env.brevo_MCP_key
          }
        }
      },
      imports: {
        crypto: typeof crypto !== 'undefined',
        buffer: typeof Buffer !== 'undefined',
        process: typeof process !== 'undefined'
      },
      jwtTest: {
        tested: false,
        reason: 'JWT service test disabled to prevent endpoint failure'
      }
    };

    console.log('Comprehensive test created successfully');

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Environment variable debug information',
        envVars,
        comprehensiveTest,
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

export const POST: APIRoute = async ({ request, locals }: { request: Request; locals: any }) => {
  try {
    const body = await request.json();
    const env = (locals as any)?.env || import.meta.env;
    
    console.log('POST Debug Test Started');
    
    // Simple POST test without JWT service to avoid errors
    const postTest = {
      success: true,
      message: 'POST endpoint working',
      requestReceived: !!body,
      bodyKeys: body ? Object.keys(body) : [],
      environmentAccessible: !!env,
      envVars: {
        JWT_SECRET: !!env.JWT_SECRET,
        brevo_MCP_key: !!env.brevo_MCP_key
      },
      timestamp: new Date().toISOString()
    };
    
    console.log('POST Test Result:', postTest);

    return new Response(
      JSON.stringify(postTest),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('POST Debug error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'POST debug failed' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
