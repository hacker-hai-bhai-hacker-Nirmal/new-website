// Comprehensive Cloudflare Pages Debugging Endpoint
// GET /api/debug-comprehensive
// This will help us identify exactly what's wrong with the deployment

export async function GET({ locals }: { locals: any }): Promise<Response> {
  try {
    // Environment Analysis
    const env = (locals as any)?.env || import.meta.env;
    
    const debugInfo = {
      timestamp: new Date().toISOString(),
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
          },
          APPWRITE_PROJECT_ID: {
            exists: !!env.APPWRITE_PROJECT_ID,
            value: env.APPWRITE_PROJECT_ID || 'NOT_SET',
            type: typeof env.APPWRITE_PROJECT_ID
          },
          APPWRITE_ENDPOINT: {
            exists: !!env.APPWRITE_ENDPOINT,
            value: env.APPWRITE_ENDPOINT || 'NOT_SET',
            type: typeof env.APPWRITE_ENDPOINT
          },
          APPWRITE_DATABASE_ID: {
            exists: !!env.APPWRITE_DATABASE_ID,
            value: env.APPWRITE_DATABASE_ID || 'NOT_SET',
            type: typeof env.APPWRITE_DATABASE_ID
          }
        },
        allEnvVars: Object.keys(env).reduce((acc, key) => {
          acc[key] = {
            exists: true,
            type: typeof env[key],
            hasValue: !!env[key],
            preview: env[key] ? `${env[key].toString().substring(0, 20)}...` : 'empty'
          };
          return acc;
        }, {} as any)
      },
      
      // Runtime Analysis
      runtime: {
        nodeVersion: typeof process !== 'undefined' ? process.version : 'unknown',
        platform: typeof process !== 'undefined' ? process.platform : 'unknown',
        astroAdapter: 'cloudflare',
        requestMethod: 'GET',
        timestamp: Date.now()
      },
      
      // Import Analysis
      imports: {
        crypto: typeof crypto !== 'undefined',
        buffer: typeof Buffer !== 'undefined',
        process: typeof process !== 'undefined'
      }
    };

    // Test JWT Service Import
    try {
      const { OTPService } = await import('../../../lib/otpService.js');
      debugInfo.imports.otpService = {
        available: true,
        canInstantiate: true
      };
      
      // Test JWT functionality
      const otpService = new OTPService(env);
      const testResult = otpService.generateTestOTP('test@example.com');
      debugInfo.jwtTest = {
        success: true,
        otpGenerated: !!testResult.otp,
        tokenGenerated: !!testResult.otpToken,
        tokenLength: testResult.otpToken ? testResult.otpToken.length : 0
      };
    } catch (jwtError) {
      debugInfo.imports.otpService = {
        available: false,
        error: (jwtError as Error).message
      };
    }

    return new Response(
      JSON.stringify(debugInfo, null, 2),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );

  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: 'Debug endpoint failed',
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      }, null, 2),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );
  }
}

export async function POST({ request, locals }: { request: Request; locals: any }): Promise<Response> {
  try {
    // Test POST functionality specifically
    const body = await request.json();
    const env = (locals as any)?.env || import.meta.env;
    
    const postTest = {
      timestamp: new Date().toISOString(),
      requestReceived: true,
      bodyParsed: !!body,
      bodyKeys: body ? Object.keys(body) : [],
      environmentAccessible: !!env,
      
      // Test JWT OTP end-to-end
      jwtTest: null
    };

    // Test JWT OTP end-to-end
    try {
      const { OTPService } = await import('../../../lib/otpService.js');
      const otpService = new OTPService(env);
      
      const otpResult = await otpService.generateOTP({
        email: body.email || 'test@example.com',
        firstName: body.firstName || 'Test',
        lastName: body.lastName || 'User',
        purpose: 'registration'
      });

      if (otpResult.success) {
        const verifyResult = await otpService.verifyOTP({
          email: body.email || 'test@example.com',
          otp: otpResult.otp,
          otpToken: otpResult.otpToken
        });

        postTest.jwtTest = {
          generation: {
            success: true,
            hasOtp: !!otpResult.otp,
            hasToken: !!otpResult.otpToken,
            tokenLength: otpResult.otpToken.length
          },
          verification: {
            success: verifyResult.success,
            message: verifyResult.message
          }
        };
      } else {
        postTest.jwtTest = {
          generation: {
            success: false,
            error: otpResult.error
          }
        };
      }
    } catch (jwtError) {
      postTest.jwtTest = {
        error: (jwtError as Error).message
      };
    }

    return new Response(
      JSON.stringify(postTest, null, 2),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );

  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: 'POST debug endpoint failed',
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      }, null, 2),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        } 
      }
    );
  }
}
