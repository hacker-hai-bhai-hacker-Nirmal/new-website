// src/pages/api/debug-env.ts - Updated to trigger new deployment for environment variables
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }: { locals: any }) => {
  try {
    // Debug environment variables - test multiple access patterns for Cloudflare Pages
    console.log('Testing environment access patterns...');
    
    // Pattern 1: locals.env
    const localsEnv = (locals as any)?.env;
    console.log('locals.env keys:', localsEnv ? Object.keys(localsEnv) : 'null');
    
    // Pattern 2: import.meta.env  
    const importEnv = import.meta.env;
    console.log('import.meta.env keys:', Object.keys(importEnv));
    
    // Pattern 3: process.env (if available)
    const processEnv = typeof process !== 'undefined' ? process.env : {};
    console.log('process.env keys:', Object.keys(processEnv));
    
    // Pattern 4: Astro.env (if available)
    const astroEnv = (globalThis as any).Astro?.env || {};
    console.log('Astro.env keys:', Object.keys(astroEnv));
    
    // Test all patterns
    const env = localsEnv || importEnv || processEnv || astroEnv;
    
    const envVars = {
      brevo_MCP_key: env.brevo_MCP_key ? `Found (length: ${env.brevo_MCP_key.length})` : 'NOT FOUND',
      JWT_SECRET: env.JWT_SECRET ? 'SET' : 'NOT_SET',
      APPWRITE_PROJECT_ID: env.APPWRITE_PROJECT_ID ? 'SET' : 'NOT_SET',
      APPWRITE_ENDPOINT: env.APPWRITE_ENDPOINT ? 'SET' : 'NOT_SET',
      APPWRITE_DATABASE_ID: env.APPWRITE_DATABASE_ID ? 'SET' : 'NOT_SET',
      allEnvVars: Object.keys(env).filter(key => key.toLowerCase().includes('brevo') || key.toLowerCase().includes('jwt') || key.toLowerCase().includes('appwrite'))
    };

    // Add access pattern analysis
    const accessAnalysis = {
      localsEnv: {
        available: !!localsEnv,
        keyCount: localsEnv ? Object.keys(localsEnv).length : 0,
        keys: localsEnv ? Object.keys(localsEnv).slice(0, 10) : []
      },
      importEnv: {
        available: !!importEnv,
        keyCount: Object.keys(importEnv).length,
        keys: Object.keys(importEnv).slice(0, 10)
      },
      processEnv: {
        available: !!processEnv,
        keyCount: Object.keys(processEnv).length,
        keys: Object.keys(processEnv).slice(0, 10)
      },
      astroEnv: {
        available: !!astroEnv,
        keyCount: Object.keys(astroEnv).length,
        keys: Object.keys(astroEnv).slice(0, 10)
      },
      selectedPattern: env === localsEnv ? 'locals.env' : 
                     env === importEnv ? 'import.meta.env' : 
                     env === processEnv ? 'process.env' : 'astro.env'
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
        message: 'Environment variable debug information with access pattern analysis',
        envVars,
        accessAnalysis,
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
