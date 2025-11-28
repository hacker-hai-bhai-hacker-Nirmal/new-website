// src/pages/api/debug-env.ts
import type { APIRoute } from 'astro';
import { OTPService } from '../../../lib/otpService';

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

    // Add comprehensive testing
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
      jwtTest: null as any
    };

    // Test JWT Service
    try {
      const otpService = new OTPService(env);
      const testResult = otpService.generateTestOTP('test@example.com');
      comprehensiveTest.jwtTest = {
        success: true,
        otpGenerated: !!testResult.otp,
        tokenGenerated: !!testResult.otpToken,
        tokenLength: testResult.otpToken ? testResult.otpToken.length : 0
      };
      comprehensiveTest.imports.otpService = {
        available: true,
        canInstantiate: true
      };
    } catch (jwtError) {
      comprehensiveTest.jwtTest = {
        success: false,
        error: (jwtError as Error).message
      };
      comprehensiveTest.imports.otpService = {
        available: false,
        error: (jwtError as Error).message
      };
    }

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
    
    console.log('JWT Test Started');
    
    // Test JWT OTP Service
    const otpServiceInstance = new OTPService(env);
    console.log('OTP Service Created');
    
    const otpResult = await otpServiceInstance.generateOTP({
      email: body.email || 'test@example.com',
      firstName: body.firstName || 'Test',
      lastName: body.lastName || 'User',
      purpose: 'registration'
    });
    
    console.log('OTP Result:', otpResult);
    
    if (otpResult.success) {
      console.log('OTP Generated Successfully');
      
      // Test verification
      const verifyResult = await otpServiceInstance.verifyOTP({
        email: body.email || 'test@example.com',
        otp: otpResult.otp,
        otpToken: otpResult.otpToken
      });
      
      console.log('Verification Result:', verifyResult);
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'JWT OTP Test Successful',
          otp: otpResult.otp,
          otpToken: otpResult.otpToken,
          verification: verifyResult,
          envTest: {
            hasJWT: !!env.JWT_SECRET,
            hasBrevo: !!env.brevo_MCP_key
          }
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: otpResult.error
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
  } catch (error: any) {
    console.error('JWT Test Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        stack: error.stack
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
