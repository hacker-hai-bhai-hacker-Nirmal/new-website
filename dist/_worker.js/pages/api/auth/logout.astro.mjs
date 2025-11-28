globalThis.process ??= {}; globalThis.process.env ??= {};
import { s as sessionManager } from '../../../chunks/sessionManager_C6n_ySBK.mjs';
import { a as authMiddleware } from '../../../chunks/rbac_CyEecZmT.mjs';
export { renderers } from '../../../renderers.mjs';

async function POST({ request, locals }) {
  try {
    const context = { request, locals };
    const authResult = await authMiddleware(context, async () => new Response(JSON.stringify({ success: true })));
    if (authResult.status !== 200) {
      return authResult;
    }
    const user = locals.user;
    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "User not authenticated"
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "0.0.0.0";
    const userAgent = request.headers.get("user-agent") || "Unknown";
    await sessionManager.revokeSession(
      user.sessionId,
      user.userId,
      ipAddress,
      userAgent
    );
    const response = {
      success: true,
      message: "Logged out successfully"
    };
    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": "accessToken=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0"
          // Clear cookie
        }
      }
    );
  } catch (error) {
    console.error("Error during logout:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Logout failed"
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
