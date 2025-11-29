globalThis.process ??= {}; globalThis.process.env ??= {};
import { A as AuthService } from '../../../chunks/authService_1REzO2KN.mjs';
export { renderers } from '../../../renderers.mjs';

async function POST({ request, locals }) {
  try {
    const runtimeEnv = locals?.runtime?.env;
    const auth = new AuthService(runtimeEnv);
    const body = await request.json();
    if (!body.email || !body.otp || !body.otpToken) {
      return Response.json({
        success: false,
        error: "Missing required fields: email, otp, otpToken"
      }, { status: 400 });
    }
    const result = await auth.verifyOTP(body.email, body.otp, body.otpToken);
    if (result.success) {
      return Response.json({
        success: true,
        message: result.message,
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        expiresIn: result.expiresIn
      });
    } else {
      return Response.json({
        success: false,
        error: result.error
      }, { status: 400 });
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    return Response.json({
      success: false,
      error: "Internal server error"
    }, { status: 500 });
  }
}
async function GET() {
  return Response.json({
    success: true,
    message: "OTP verification endpoint - POST to verify OTP and get JWT tokens",
    requiredFields: ["email", "otp", "otpToken"],
    returns: ["user", "accessToken", "refreshToken", "expiresIn"]
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
