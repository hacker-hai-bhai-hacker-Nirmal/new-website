// src/pages/api/debug-env.ts - Updated to trigger new deployment for environment variables
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals, request }: { locals: any; request: Request }) => {
  try {
    // Test only the most likely patterns for Cloudflare Pages
    const patterns = {
      locals: (locals as any)?.env,
      import: import.meta.env,
      request: (request as any)?.cf?.env
    };
    
    // Find which pattern has our variables
    let workingPattern = 'NONE';
    let selectedEnv = patterns.import;
    
    for (const [name, env] of Object.entries(patterns)) {
      if (env?.JWT_SECRET || env?.brevo_MCP_key) {
        workingPattern = name;
        selectedEnv = env;
        break;
      }
    }

    const envVars = {
      brevo_MCP_key: selectedEnv?.brevo_MCP_key ? `Found (length: ${selectedEnv.brevo_MCP_key.length})` : 'NOT FOUND',
      JWT_SECRET: selectedEnv?.JWT_SECRET ? 'SET' : 'NOT_SET',
      APPWRITE_PROJECT_ID: selectedEnv?.APPWRITE_PROJECT_ID ? 'SET' : 'NOT_SET',
      APPWRITE_ENDPOINT: selectedEnv?.APPWRITE_ENDPOINT ? 'SET' : 'NOT_SET',
      APPWRITE_DATABASE_ID: selectedEnv?.APPWRITE_DATABASE_ID ? 'SET' : 'NOT_SET'
    };

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Minimal environment variable test',
        workingPattern,
        envVars,
        recommendation: workingPattern !== 'NONE' ? `Use ${workingPattern} pattern` : 'No pattern found',
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
