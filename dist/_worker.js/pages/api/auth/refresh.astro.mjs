globalThis.process ??= {}; globalThis.process.env ??= {};
import { A as AuthService } from '../../../chunks/authService_1REzO2KN.mjs';
export { renderers } from '../../../renderers.mjs';

async function POST({ request, locals }) {
  try {
    const runtimeEnv = locals?.runtime?.env;
    const auth = new AuthService(runtimeEnv);
    const body = await request.json();
    if (!body.refreshToken) {
      return Response.json({
        success: false,
        error: "Missing required field: refreshToken"
      }, { status: 400 });
    }
    const result = await auth.refreshToken(body.refreshToken);
    if (result.success) {
      return Response.json({
        success: true,
        message: result.message,
        accessToken: result.accessToken,
        expiresIn: result.expiresIn
      });
    } else {
      return Response.json({
        success: false,
        error: result.error
      }, { status: 401 });
    }
  } catch (error) {
    console.error("Token refresh error:", error);
    return Response.json({
      success: false,
      error: "Internal server error"
    }, { status: 500 });
  }
}
async function GET() {
  return Response.json({
    success: true,
    message: "Token refresh endpoint - POST to refresh access tokens",
    requiredFields: ["refreshToken"],
    returns: ["accessToken", "expiresIn"]
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
