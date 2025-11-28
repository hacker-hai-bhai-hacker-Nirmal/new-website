globalThis.process ??= {}; globalThis.process.env ??= {};
export { renderers } from '../../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
async function GET({ locals }) {
  try {
    const env = locals?.env || Object.assign(__vite_import_meta_env__, { JWT_SECRET: "s60nAlPhGJq2iQnFSn0LqtVor/dr/mLrJ4vLBXdNv8U=", APPWRITE_PROJECT_ID: "6900b1ed001604d8befb", APPWRITE_ENDPOINT: "https://fra.cloud.appwrite.io/v1", APPWRITE_DATABASE_ID: "main-db", OS: process.env.OS });
    const debugInfo = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
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
            value: env.APPWRITE_PROJECT_ID || "NOT_SET",
            type: typeof env.APPWRITE_PROJECT_ID
          },
          APPWRITE_ENDPOINT: {
            exists: !!env.APPWRITE_ENDPOINT,
            value: env.APPWRITE_ENDPOINT || "NOT_SET",
            type: typeof env.APPWRITE_ENDPOINT
          },
          APPWRITE_DATABASE_ID: {
            exists: !!env.APPWRITE_DATABASE_ID,
            value: env.APPWRITE_DATABASE_ID || "NOT_SET",
            type: typeof env.APPWRITE_DATABASE_ID
          }
        },
        allEnvVars: Object.keys(env).reduce((acc, key) => {
          acc[key] = {
            exists: true,
            type: typeof env[key],
            hasValue: !!env[key],
            preview: env[key] ? `${env[key].toString().substring(0, 20)}...` : "empty"
          };
          return acc;
        }, {})
      },
      // Runtime Analysis
      runtime: {
        nodeVersion: typeof process !== "undefined" ? process.version : "unknown",
        platform: typeof process !== "undefined" ? process.platform : "unknown",
        astroAdapter: "cloudflare",
        requestMethod: "GET",
        timestamp: Date.now()
      },
      // Import Analysis
      imports: {
        crypto: typeof crypto !== "undefined",
        buffer: typeof Buffer !== "undefined",
        process: typeof process !== "undefined"
      }
    };
    try {
      const { OTPService } = await import('../../chunks/otpService_CrrjiutG.mjs');
      debugInfo.imports.otpService = {
        available: true,
        canInstantiate: true
      };
      const otpService = new OTPService(env);
      const testResult = otpService.generateTestOTP("test@example.com");
      debugInfo.jwtTest = {
        success: true,
        otpGenerated: !!testResult.otp,
        tokenGenerated: !!testResult.otpToken,
        tokenLength: testResult.otpToken ? testResult.otpToken.length : 0
      };
    } catch (jwtError) {
      debugInfo.imports.otpService = {
        available: false,
        error: jwtError.message
      };
    }
    return new Response(
      JSON.stringify(debugInfo, null, 2),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Debug endpoint failed",
        message: error.message,
        stack: error.stack,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }, null, 2),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }
}
async function POST({ request, locals }) {
  try {
    const body = await request.json();
    const env = locals?.env || Object.assign(__vite_import_meta_env__, { JWT_SECRET: "s60nAlPhGJq2iQnFSn0LqtVor/dr/mLrJ4vLBXdNv8U=", APPWRITE_PROJECT_ID: "6900b1ed001604d8befb", APPWRITE_ENDPOINT: "https://fra.cloud.appwrite.io/v1", APPWRITE_DATABASE_ID: "main-db", OS: process.env.OS });
    const postTest = {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      requestReceived: true,
      bodyParsed: !!body,
      bodyKeys: body ? Object.keys(body) : [],
      environmentAccessible: !!env,
      // Test JWT OTP end-to-end
      jwtTest: null
    };
    try {
      const { OTPService } = await import('../../chunks/otpService_CrrjiutG.mjs');
      const otpService = new OTPService(env);
      const otpResult = await otpService.generateOTP({
        email: body.email || "test@example.com",
        firstName: body.firstName || "Test",
        lastName: body.lastName || "User",
        purpose: "registration"
      });
      if (otpResult.success) {
        const verifyResult = await otpService.verifyOTP({
          email: body.email || "test@example.com",
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
        error: jwtError.message
      };
    }
    return new Response(
      JSON.stringify(postTest, null, 2),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "POST debug endpoint failed",
        message: error.message,
        stack: error.stack,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }, null, 2),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
