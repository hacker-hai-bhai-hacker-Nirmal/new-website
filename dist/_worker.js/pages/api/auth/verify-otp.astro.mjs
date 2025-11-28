globalThis.process ??= {}; globalThis.process.env ??= {};
import { OTPService } from '../../../chunks/otpService_CrrjiutG.mjs';
export { renderers } from '../../../renderers.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
async function POST({ request, locals }) {
  try {
    const body = await request.json();
    const env = locals?.env || Object.assign(__vite_import_meta_env__, { OS: process.env.OS });
    const { email, otp, otpToken } = body;
    if (!email || !otp || !otpToken) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email, OTP, and OTP token are required"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const otpServiceInstance = new OTPService(env);
    const otpVerification = await otpServiceInstance.verifyOTP({
      email,
      otp,
      otpToken
    });
    if (!otpVerification.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: otpVerification.error || "Invalid or expired OTP"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    console.log("OTP verification successful:", {
      email,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    return new Response(
      JSON.stringify({
        success: true,
        email,
        message: "OTP verified successfully!"
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("OTP verification error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "OTP verification failed. Please try again."
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
async function GET() {
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}
async function PUT() {
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}
async function DELETE() {
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  POST,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
