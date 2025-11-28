// src/pages/api/debug-env.ts - Updated to trigger new deployment for environment variables
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals, request }: { locals: any; request: Request }) => {
  try {
    console.log('🔍 Testing ALL Cloudflare Pages environment access patterns...');
    
    // Pattern 1: Direct locals.env (Pages Functions)
    const directLocals = (locals as any)?.env;
    console.log('1. Direct locals.env keys:', directLocals ? Object.keys(directLocals) : 'null');
    
    // Pattern 2: Astro.env (Astro's environment API)
    const astroEnv = (globalThis as any).Astro?.env;
    console.log('2. Astro.env keys:', astroEnv ? Object.keys(astroEnv) : 'null');
    
    // Pattern 3: import.meta.env (Vite standard)
    const importEnv = import.meta.env;
    console.log('3. import.meta.env keys:', Object.keys(importEnv));
    
    // Pattern 4: process.env (Node.js fallback)
    const processEnv = typeof process !== 'undefined' ? process.env : {};
    console.log('4. process.env keys:', Object.keys(processEnv));
    
    // Pattern 5: Cloudflare Pages specific - request.cf.env
    const requestEnv = (request as any)?.cf?.env;
    console.log('5. request.cf.env keys:', requestEnv ? Object.keys(requestEnv) : 'null');
    
    // Pattern 6: globalThis.env (Global access)
    const globalEnv = (globalThis as any)?.env;
    console.log('6. globalThis.env keys:', globalEnv ? Object.keys(globalEnv) : 'null');
    
    // Test each pattern for our specific variables
    const patterns = {
      directLocals: {
        JWT_SECRET: directLocals?.JWT_SECRET,
        brevo_MCP_key: directLocals?.brevo_MCP_key,
        available: !!directLocals
      },
      astroEnv: {
        JWT_SECRET: astroEnv?.JWT_SECRET,
        brevo_MCP_key: astroEnv?.brevo_MCP_key,
        available: !!astroEnv
      },
      importEnv: {
        JWT_SECRET: importEnv?.JWT_SECRET,
        brevo_MCP_key: importEnv?.brevo_MCP_key,
        available: !!importEnv
      },
      processEnv: {
        JWT_SECRET: processEnv?.JWT_SECRET,
        brevo_MCP_key: processEnv?.brevo_MCP_key,
        available: !!processEnv
      },
      requestEnv: {
        JWT_SECRET: requestEnv?.JWT_SECRET,
        brevo_MCP_key: requestEnv?.brevo_MCP_key,
        available: !!requestEnv
      },
      globalEnv: {
        JWT_SECRET: globalEnv?.JWT_SECRET,
        brevo_MCP_key: globalEnv?.brevo_MCP_key,
        available: !!globalEnv
      }
    };
    
    // Find which pattern actually has our variables
    const workingPattern = Object.entries(patterns).find(([name, pattern]) => 
      pattern.JWT_SECRET && pattern.brevo_MCP_key
    );
    
    const selectedEnv = workingPattern ? 
      (workingPattern[0] === 'directLocals' ? directLocals :
       workingPattern[0] === 'astroEnv' ? astroEnv :
       workingPattern[0] === 'importEnv' ? importEnv :
       workingPattern[0] === 'processEnv' ? processEnv :
       workingPattern[0] === 'requestEnv' ? requestEnv : globalEnv) :
      importEnv; // fallback

    const envVars = {
      brevo_MCP_key: selectedEnv?.brevo_MCP_key ? `Found (length: ${selectedEnv.brevo_MCP_key.length})` : 'NOT FOUND',
      JWT_SECRET: selectedEnv?.JWT_SECRET ? 'SET' : 'NOT_SET',
      APPWRITE_PROJECT_ID: selectedEnv?.APPWRITE_PROJECT_ID ? 'SET' : 'NOT_SET',
      APPWRITE_ENDPOINT: selectedEnv?.APPWRITE_ENDPOINT ? 'SET' : 'NOT_SET',
      APPWRITE_DATABASE_ID: selectedEnv?.APPWRITE_DATABASE_ID ? 'SET' : 'NOT_SET',
      allEnvVars: Object.keys(selectedEnv || {}).filter(key => key.toLowerCase().includes('brevo') || key.toLowerCase().includes('jwt') || key.toLowerCase().includes('appwrite'))
    };

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Comprehensive Pages environment variable analysis',
        workingPattern: workingPattern ? workingPattern[0] : 'NONE',
        patterns,
        envVars,
        recommendation: workingPattern ? `Use ${workingPattern[0]} pattern` : 'No pattern found - check Pages configuration',
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
