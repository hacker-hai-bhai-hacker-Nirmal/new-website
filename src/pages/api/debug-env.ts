// src/pages/api/debug-env.ts - Updated to trigger new deployment for environment variables
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }: { locals: any }) => {
  try {
    // Simple debug - use fallback to test JWT system
    const env = (locals as any)?.env || import.meta.env;
    
    // Test with fallback values to verify JWT system works
    const testEnv = {
      JWT_SECRET: env.JWT_SECRET || 's60nAlPhGJq2iQnFSn0LqtVor/dr/mLrJ4vLBXdNv8U=',
      brevo_MCP_key: env.brevo_MCP_key || 'fallback_key_for_testing'
    };
    
    const envVars = {
      brevo_MCP_key: env.brevo_MCP_key ? `Found (length: ${env.brevo_MCP_key.length})` : 'NOT FOUND',
      JWT_SECRET: env.JWT_SECRET ? 'SET' : 'NOT_SET (using fallback)',
      APPWRITE_PROJECT_ID: env.APPWRITE_PROJECT_ID ? 'SET' : 'NOT_SET',
      APPWRITE_ENDPOINT: env.APPWRITE_ENDPOINT ? 'SET' : 'NOT_SET',
      APPWRITE_DATABASE_ID: env.APPWRITE_DATABASE_ID ? 'SET' : 'NOT_SET',
      allEnvVars: Object.keys(env).filter(key => key.toLowerCase().includes('brevo') || key.toLowerCase().includes('jwt') || key.toLowerCase().includes('appwrite'))
    };

    // Test JWT system with fallback
    const jwtTest = {
      usingFallback: !env.JWT_SECRET,
      fallbackWorking: false,
      message: ''
    };

    try {
      // Test JWT with fallback environment
      const { OTPService } = await import('../../../lib/otpService');
      const otpService = new OTPService(testEnv);
      const testResult = otpService.generateTestOTP('test@example.com');
      
      jwtTest.fallbackWorking = true;
      jwtTest.message = 'JWT system works with fallback values';
    } catch (error) {
      jwtTest.message = 'JWT system failed even with fallback';
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Environment variable debug with fallback test',
        envVars,
        jwtTest,
        recommendation: !env.JWT_SECRET ? 'Change environment variables to PUBLIC in Cloudflare Pages' : 'Variables accessible',
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
